import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { AdminTableManagementComponent } from './admin-table-management';

describe('AdminTableManagementComponent', () => {
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTableManagementComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ table: 'sessions_utilisateur' }) } }
        }
      ]
    }).compileComponents();
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('renders only the safe session audit projection and a revocation action', () => {
    TestBed.inject(TranslationService).setLanguage('en');
    const fixture = TestBed.createComponent(AdminTableManagementComponent);
    fixture.detectChanges();

    const request = httpTesting.expectOne('http://localhost:8080/api/admin/tables/sessions_utilisateur');
    request.flush({
      table: 'sessions_utilisateur',
      records: [{
        id: 44,
        utilisateurLogin: 'amina-cocoa',
        utilisateurEmail: 'amina@example.com',
        browserLabel: 'Google Chrome on Windows',
        rememberMe: true,
        lastSeenAt: '2026-09-29T10:00:00Z',
        expiresAt: '2026-09-29T10:30:00Z',
        invalidatedAt: null,
        sessionHash: 'must-not-render'
      }]
    });
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    expect(nativeElement.textContent).toContain('Google Chrome on Windows');
    expect(nativeElement.textContent).toContain('Revoke session');
    expect(nativeElement.textContent).not.toContain('must-not-render');
    expect(nativeElement.querySelector('input')).toBeNull();
    expect(TestBed.inject(Title).getTitle()).toBe('CacaoMarketCM | Browser sessions');
  });
});
