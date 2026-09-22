import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslationService } from '../../core/i18n/translation.service';
import { LoginComponent } from './login';

describe('LoginComponent', () => {
  it('requires a valid identity and password before the form is valid', async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const i18n = TestBed.inject(TranslationService);
    i18n.setLanguage('en');

    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance as unknown as { loginForm: { patchValue(value: { identity: string; password: string }): void; valid: boolean } };

    expect(component.loginForm.valid).toBe(false);

    component.loginForm.patchValue({
      identity: 'cocoa-buyer',
      password: 'secure-passphrase'
    });

    expect(component.loginForm.valid).toBe(true);
  });
});
