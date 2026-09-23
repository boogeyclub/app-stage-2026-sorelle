import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type RegistrableUserRole = 'VENDEUR' | 'CLIENT';
export type AuthenticatedUserRole = RegistrableUserRole | 'ADMINISTRATEUR';
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

export interface ConfirmationResponse {
  status: 'CONFIRMED' | 'ALREADY_CONFIRMED';
  message: string;
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
  role: AuthenticatedUserRole;
}

export interface BrowserSession {
  id: number;
  browserLabel: string;
  rememberMe: boolean;
  createdAt: string;
  lastSeenAt: string;
  expiresAt: string;
  current: boolean;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);

  // Browser requests go directly to the configured Spring API; the backend
  // must allow this frontend origin through CORS.
  private readonly apiRoot = environment.apiBaseUrl;

  register(payload: RegistrationPayload): Observable<RegistrationAcceptedResponse> {
    return this.http.post<RegistrationAcceptedResponse>(`${this.apiRoot}/auth/registration`, payload, { withCredentials: true });
  }

  confirmRegistration(token: string): Observable<ConfirmationResponse> {
    return this.http.get<ConfirmationResponse>(`${this.apiRoot}/auth/registration/confirm`, {
      params: { token },
      withCredentials: true
    });
  }

  login(payload: LoginPayload): Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(`${this.apiRoot}/auth/login`, payload, { withCredentials: true });
  }

  currentSession(): Observable<AuthenticatedUser> {
    return this.http.get<AuthenticatedUser>(`${this.apiRoot}/auth/session`, { withCredentials: true });
  }

  browserSessions(): Observable<readonly BrowserSession[]> {
    return this.http.get<readonly BrowserSession[]>(`${this.apiRoot}/auth/sessions`, { withCredentials: true });
  }

  disconnectBrowserSession(sessionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiRoot}/auth/sessions/${sessionId}`, { withCredentials: true });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiRoot}/auth/logout`, {}, { withCredentials: true });
  }
}
