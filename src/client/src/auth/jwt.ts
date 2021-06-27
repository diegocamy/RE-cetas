let accessToken = "";

interface AccessTokenPayload {
  ok: boolean;
  jwt?: string;
}

export function setAccessToken(token: string): void {
  accessToken = token;
}

export function getAccessToken(): string {
  return accessToken;
}

export async function fetchNewAccessToken() {
  try {
    const response = await fetch("http://localhost:4000/refresh_token", {
      credentials: "include",
      method: "POST",
    });

    const data: AccessTokenPayload = await response.json();

    setAccessToken(data.jwt!);
  } catch (error) {
    console.log(error);
  }
}
