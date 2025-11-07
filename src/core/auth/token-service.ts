// src/lib/auth/token-service.ts
class TokenService {
  private static readonly TOKEN_KEY = "auth_token";

  static setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static hasToken(): boolean {
    return this.getToken() !== null;
  }
}

export { TokenService };
