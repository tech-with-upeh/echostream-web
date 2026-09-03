const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

if (!BACKEND_URL) {
  console.warn("NEXT_PUBLIC_BACKEND_URL is not configured.");
}

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type CurrentUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: boolean;
  plan: string;
  subscription_status: string;
  trial_ends_at: string | null;
  subscription_ends_at: string | null;
};

export type SubscriptionManagement = {
  type: "one_time" | "recurring";
  plan: string;
  interval: string;
  payment_method: string;
  payment_channel: string | null;
  subscription_ends_at: string | null;
  can_cancel: boolean;
  can_renew: boolean;
  management_link: string | null;
  subscription_status?: string;
  link?: string | null;
  subscription_code?: string;
};

export type SubscriptionCheckoutResponse = {
  authorization_url: string | null;
  access_code: string | null;
  reference: string;
  plan: string;
  interval: string;
};

export type PaymentHistoryItem = {
  id: number;
  reference: string;
  plan: string;
  interval: string | null;
  amount: number | null;
  currency: string;
  status: string;
  channel: string | null;
  payment_method: string | null;
  event: string;
  paid_at: string | null;
  created_at: string;
};

export type PaymentHistoryResponse = {
  items: PaymentHistoryItem[];
  total: number;
  page: number;
  per_page: number;
};

const SESSION_USER_KEY = "echostream_session_user";
const SESSION_SUBSCRIPTION_KEY = "echostream_session_subscription";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!BACKEND_URL) {
    throw new Error("EchoStream backend URL is not configured.");
  }

  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Unable to connect to EchoStream. Please try again.");
  }

  const contentType = response.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const message =
      typeof data?.detail === "string"
        ? data.detail
        : "Something went wrong. Please try again.";

    throw new ApiError(message, response.status);
  }

  return data as T;
}

function authenticatedFetch<T>(path: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem("echostream_access_token");

  if (!accessToken) {
    throw new ApiError("Authentication required.", 401);
  }

  return apiFetch<T>(path, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });
}

function readSession<T>(key: string): T | null {
  try {
    const value = sessionStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function writeSession<T>(key: string, value: T) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Session storage is only an optimization; API data remains authoritative.
  }
}

export function getSessionUser() {
  return readSession<CurrentUser>(SESSION_USER_KEY);
}

export function getSessionSubscription() {
  return readSession<SubscriptionManagement>(SESSION_SUBSCRIPTION_KEY);
}

export function cacheCurrentUser(user: CurrentUser) {
  writeSession(SESSION_USER_KEY, user);
}

export function cacheSubscriptionManagement(subscription: SubscriptionManagement) {
  writeSession(SESSION_SUBSCRIPTION_KEY, subscription);
}

export function clearSessionData() {
  try {
    sessionStorage.removeItem(SESSION_USER_KEY);
    sessionStorage.removeItem(SESSION_SUBSCRIPTION_KEY);
  } catch {
    // Ignore storage errors.
  }
}

export function getCurrentUser() {
  return authenticatedFetch<CurrentUser>("/users/me");
}

export function getSubscriptionManagement() {
  return authenticatedFetch<SubscriptionManagement>("/payments/manage");
}

export function getPaymentHistory(page = 1, perPage = 20) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  return authenticatedFetch<PaymentHistoryResponse>(`/payments/history?${params.toString()}`);
}

export function subscribeToPlan(plan: string, interval = "month") {
  return authenticatedFetch<SubscriptionCheckoutResponse>(
    `/payments/subscribe?plan=${encodeURIComponent(plan)}&interval=${encodeURIComponent(interval)}`,
    { method: "POST" },
  );
}

export function login(email: string, password: string) {
  return apiFetch<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function googleLogin(idToken: string) {
  return apiFetch<LoginResponse>("/auth/google", {
    method: "POST",
    body: JSON.stringify({ id_token: idToken }),
  });
}

export function logout(accessToken: string) {
  return apiFetch<unknown>("/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
