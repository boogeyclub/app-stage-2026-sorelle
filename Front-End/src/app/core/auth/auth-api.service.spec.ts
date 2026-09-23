import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthApiService, RegistrationPayload } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(AuthApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('posts the registration form to the backend registration route', () => {
    const payload: RegistrationPayload = {
      role: 'VENDEUR',
      prenom: 'Amina',
      nom: 'Ngono',
      email: 'amina@example.com',
      login: 'amina-cocoa',
      password: 'secure-passphrase',
      confirmPassword: 'secure-passphrase',
      acceptTerms: true,
      language: 'fr'
    };

    service.register(payload).subscribe((response) => {
      expect(response.email).toBe(payload.email);
    });

    const request = httpTesting.expectOne('/CacaoMarket/api/auth/registration');
    expect(request.request.method).toBe('POST');
    expect(request.request.withCredentials).toBe(true);
    expect(request.request.body).toEqual(payload);
    request.flush({ email: payload.email, expiresAt: '2026-09-22T18:00:00Z' });
  });

  it('sends an email confirmation token to the backend confirmation route', () => {
    service.confirmRegistration('single-use-token').subscribe((response) => {
      expect(response.status).toBe('CONFIRMED');
    });

    const request = httpTesting.expectOne((candidate) =>
      candidate.url === '/CacaoMarket/api/auth/registration/confirm'
      && candidate.params.get('token') === 'single-use-token'
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.withCredentials).toBe(true);
    request.flush({ status: 'CONFIRMED', message: 'Confirmed.' });
  });

  it('posts login credentials to the backend login route', () => {
    service.login({ identity: 'amina-cocoa', password: 'secure-passphrase', rememberMe: true }).subscribe((user) => {
      expect(user.role).toBe('VENDEUR');
    });

    const request = httpTesting.expectOne('/CacaoMarket/api/auth/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.withCredentials).toBe(true);
    request.flush({
      id: 1,
      email: 'amina@example.com',
      login: 'amina-cocoa',
      prenom: 'Amina',
      nom: 'Ngono',
      role: 'VENDEUR'
    });
  });

  it('uses the application-relative API path when logging out', () => {
    service.logout().subscribe();

    const request = httpTesting.expectOne('/CacaoMarket/api/auth/logout');
    expect(request.request.method).toBe('POST');
    expect(request.request.withCredentials).toBe(true);
    request.flush(null);
  });
});
