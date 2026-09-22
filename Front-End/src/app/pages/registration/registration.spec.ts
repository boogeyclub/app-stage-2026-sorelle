import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslationService } from '../../core/i18n/translation.service';
import { RegistrationComponent } from './registration';

describe('RegistrationComponent', () => {
  it('requires matching passwords before registration is valid', async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const i18n = TestBed.inject(TranslationService);
    i18n.setLanguage('en');

    const fixture = TestBed.createComponent(RegistrationComponent);
    const component = fixture.componentInstance as unknown as {
      registrationForm: {
        patchValue(value: Record<string, string | boolean>): void;
        hasError(error: string): boolean;
        valid: boolean;
      };
    };

    component.registrationForm.patchValue({
      role: 'VENDEUR',
      prenom: 'Amina',
      nom: 'Ngono',
      email: 'amina@example.com',
      login: 'amina-cocoa',
      password: 'secure-passphrase',
      confirmPassword: 'different-passphrase',
      acceptTerms: true
    });

    expect(component.registrationForm.hasError('passwordMismatch')).toBe(true);
    expect(component.registrationForm.valid).toBe(false);

    component.registrationForm.patchValue({ confirmPassword: 'secure-passphrase' });

    expect(component.registrationForm.valid).toBe(true);
  });
});
