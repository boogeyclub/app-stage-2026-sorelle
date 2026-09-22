import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export type RegistrableUserRole = 'VENDEUR' | 'CLIENT';
export type InterfaceLanguage = 'en' | 'fr';

export interface RegistrationPayload {
  role: RegistrableUserRole;
  prenom: string;
  nom: string;
  email: string;
  login: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  language: InterfaceLanguage;
}

export interface RegistrationAcceptedResponse {
  email: string;
  expiresAt: string;
}

export interface LoginPayload {
  identity: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthenticatedUser {
  id: number;
  email: string;
  login: string;
  prenom: string;
  nom: string;
  role: RegistrableUserRole;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);

  // Keep API URLs relative to the application's /CacaoMarket/ base href.
  // The development proxy strips that base path before forwarding to Spring.
  private readonly apiRoot = 'api';

  register(payload: RegistrationPayload): Observable<RegistrationAcceptedResponse> {
    return this.http.post<RegistrationAcceptedResponse>(`${this.apiRoot}/auth/registration`, payload, { withCredentials: true });
  }

  login(payload: LoginPayload): Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(`${this.apiRoot}/auth/login`, payload, { withCredentials: true });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiRoot}/auth/logout`, {}, { withCredentials: true });
  }
}
