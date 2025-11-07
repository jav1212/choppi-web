import { TokenService } from "../auth/token-service";

export interface RES<T> {
  data: T;
  success: boolean;
  message?: string;
}

type HttpHeaders = Record<string, string>;
type QueryParams = Record<string, string>;

abstract class API {
  protected readonly baseURL: string;

  constructor() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is required");
    this.baseURL = apiUrl;
  }

  private createHeaders(): HttpHeaders {
    const token = TokenService.getToken();
    const headers: HttpHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleRequest<T>(
    endpoint: string,
    options: RequestInit,
    params?: QueryParams
  ): Promise<RES<T>> {
    const url = new URL(`${this.baseURL}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      ...options,
      headers: this.createHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as T;

    return {
      data,
      success: true,
    };
  }

  protected async get<T>(
    endpoint: string,
    params?: QueryParams
  ): Promise<RES<T>> {
    return this.handleRequest<T>(endpoint, { method: "GET" }, params);
  }

  protected async post<T>(
    endpoint: string,
    body: unknown
  ): Promise<RES<T>> {
    return this.handleRequest<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  protected async put<T>(
    endpoint: string,
    body: unknown
  ): Promise<RES<T>> {
    return this.handleRequest<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  protected async delete<T>(endpoint: string): Promise<RES<T>> {
    return this.handleRequest<T>(endpoint, { method: "DELETE" });
  }
}

export { API };
