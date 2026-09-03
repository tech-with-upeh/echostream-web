const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

if (!BACKEND_URL) {
  console.warn("NEXT_PUBLIC_BACKEND_URL is not configured.");
}

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

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
