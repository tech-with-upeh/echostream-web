const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

if (!BACKEND_URL) {
  console.warn("NEXT_PUBLIC_BACKEND_URL is not configured.");
}

export type LoginResponse = { access_token: string; refresh_token: string; token_type: string; };
export type CurrentUser = { id: number; first_name: string; last_name: string; email: string; is_verified: boolean; plan: string; subscription_status: string; trial_ends_at: string | null; subscription_ends_at: string | null; };
export type PaymentMethodDetails = { method: string | null; brand: string | null; last4: string | null; bank: string | null; card_type: string | null; };
export type SubscriptionManagement = { type: "one_time" | "recurring"; plan: string; interval: string; payment_method: string; payment_channel: string | null; payment_method_details: PaymentMethodDetails; subscription_ends_at: string | null; can_cancel: boolean; can_renew: boolean; management_link: string | null; subscription_status?: string; link?: string | null; subscription_code?: string; };
export type SubscriptionCheckoutResponse = { authorization_url: string | null; access_code: string | null; reference: string; plan: string; interval: string; };
export type PaymentHistoryItem = { id: number; payment_id: string; receipt_number: string; provider: string; provider_reference: string; billing_type: string; method: string | null; reference: string; plan: string; interval: string | null; amount: number | null; currency: string; status: string; channel: string | null; payment_method: string | null; event: string; paid_at: string | null; created_at: string; };
export type PaymentHistoryResponse = { items: PaymentHistoryItem[]; total: number; page: number; per_page: number; };
export type PaymentReceiptResponse = { customer: { name: string; email: string; }; payment: { payment_id: string; receipt_number: string; provider: string; provider_reference: string; plan: string; interval: string | null; billing_type: string; method: string | null; amount: number | null; currency: string; status: string; paid_at: string | null; }; subscription: { starts_at: string | null; ends_at: string | null; }; issued_at: string; };

const SESSION_USER_KEY = "echostream_session_user";
const SESSION_SUBSCRIPTION_KEY = "echostream_session_subscription";
const ACCESS_TOKEN_KEY = "echostream_access_token";
const REFRESH_TOKEN_KEY = "echostream_refresh_token";
const TOKEN_TYPE_KEY = "echostream_token_type";

export class ApiError extends Error { status: number; constructor(message: string, status: number) { super(message); this.name = "ApiError"; this.status = status; } }

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!BACKEND_URL) throw new Error("EchoStream backend URL is not configured.");
  let response: Response;
  try { response = await fetch(`${BACKEND_URL}${path}`, { ...options, headers: { "Content-Type": "application/json", ...options.headers } }); }
  catch { throw new Error("Unable to connect to EchoStream. Please try again."); }
  const contentType = response.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json") ? await response.json() : null;
  if (!response.ok) { const message = typeof data?.detail === "string" ? data.detail : "Something went wrong. Please try again."; throw new ApiError(message, response.status); }
  return data as T;
}

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) throw new ApiError("Authentication required.", 401);

  if (!refreshPromise) {
    refreshPromise = apiFetch<LoginResponse>("/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    })
      .then((tokens) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
        localStorage.setItem(TOKEN_TYPE_KEY, tokens.token_type);
        return tokens.access_token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

function clearAuthentication() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_TYPE_KEY);
    clearSessionData();
  } catch {}
}

async function authenticatedFetch<T>(path: string, options: RequestInit = {}) {
  let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!accessToken) throw new ApiError("Authentication required.", 401);

  const request = () => apiFetch<T>(path, {
    ...options,
    headers: { Authorization: `Bearer ${accessToken}`, ...options.headers },
  });

  try {
    return await request();
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) throw error;

    try {
      accessToken = await refreshAccessToken();
      return await request();
    } catch (refreshError) {
      clearAuthentication();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      if (refreshError instanceof ApiError) throw refreshError;
      throw new ApiError("Your session has expired. Please log in again.", 401);
    }
  }
}
function readSession<T>(key: string) { try { const value = sessionStorage.getItem(key); return value ? JSON.parse(value) as T : null; } catch { return null; } }
function writeSession<T>(key: string, value: T) { try { sessionStorage.setItem(key, JSON.stringify(value)); } catch {} }
export function getSessionUser() { return readSession<CurrentUser>(SESSION_USER_KEY); }
export function getSessionSubscription() { return readSession<SubscriptionManagement>(SESSION_SUBSCRIPTION_KEY); }
export function cacheCurrentUser(user: CurrentUser) { writeSession(SESSION_USER_KEY, user); }
export function cacheSubscriptionManagement(subscription: SubscriptionManagement) { writeSession(SESSION_SUBSCRIPTION_KEY, subscription); }
export function clearSessionData() { try { sessionStorage.removeItem(SESSION_USER_KEY); sessionStorage.removeItem(SESSION_SUBSCRIPTION_KEY); } catch {} }
export function getCurrentUser() { return authenticatedFetch<CurrentUser>("/users/me"); }
export function getSubscriptionManagement() { return authenticatedFetch<SubscriptionManagement>("/payments/manage"); }
export function getPaymentHistory(page = 1, perPage = 20, sort = "newest") { const params = new URLSearchParams({ page: String(page), per_page: String(perPage), sort }); return authenticatedFetch<PaymentHistoryResponse>(`/payments/history?${params.toString()}`); }
export function getPaymentReceipt(paymentId: string) { return authenticatedFetch<PaymentReceiptResponse>(`/payments/history/${encodeURIComponent(paymentId)}/receipt`); }
export function subscribeToPlan(plan: string, interval = "month") { return authenticatedFetch<SubscriptionCheckoutResponse>(`/payments/subscribe?plan=${encodeURIComponent(plan)}&interval=${encodeURIComponent(interval)}`, { method: "POST" }); }
export function login(email: string, password: string) { return apiFetch<LoginResponse>("/login", { method: "POST", body: JSON.stringify({ email, password }) }); }
export function googleLogin(idToken: string) { return apiFetch<LoginResponse>("/auth/google", { method: "POST", body: JSON.stringify({ id_token: idToken }) }); }
export function logout(accessToken: string) { return apiFetch<unknown>("/logout", { method: "POST", headers: { Authorization: `Bearer ${accessToken}` } }); }
