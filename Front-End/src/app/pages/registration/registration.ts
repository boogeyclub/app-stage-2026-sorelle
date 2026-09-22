import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ApiErrorResponse, AuthApiService, RegistrableUserRole } from '../../core/auth/auth-api.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { LanguageSwitcherComponent } from '../../shared/language-switcher/language-switcher';

const passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, RouterLink, LanguageSwitcherComponent],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class RegistrationComponent {
  protected readonly i18n = inject(TranslationService);
  private readonly authApi = inject(AuthApiService);
  private readonly notifications = inject(NotificationService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly title = inject(Title);

  protected readonly passwordVisible = signal(false);
  protected readonly submitted = signal(false);
  protected readonly isSubmitting = signal(false);
  protected readonly registrationState = signal<'idle' | 'success' | 'error'>('idle');
  protected readonly registrationEmail = signal('');
  protected readonly registrationErrorKey = signal<string | null>(null);
  protected readonly registrationForm = this.formBuilder.nonNullable.group(
    {
      role: ['VENDEUR', [Validators.required]],
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    },
    { validators: passwordsMatch }
  );

  constructor() {
    effect(() => this.title.setTitle(this.i18n.t('meta.registrationTitle')));
  }

  protected submit(): void {
    if (this.isSubmitting() || this.registrationState() === 'success') {
      return;
    }

    this.submitted.set(true);
    this.registrationState.set('idle');
    this.registrationErrorKey.set(null);

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      this.notifications.warning({ key: 'notifications.forms.invalid' });
      return;
    }

    const formValue = this.registrationForm.getRawValue();
    this.isSubmitting.set(true);

    this.authApi.register({
      role: formValue.role as RegistrableUserRole,
      prenom: formValue.prenom.trim(),
      nom: formValue.nom.trim(),
      email: formValue.email.trim(),
      login: formValue.login.trim(),
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
      acceptTerms: formValue.acceptTerms,
      language: this.i18n.language()
    }).pipe(
      this.notifications.trackApiCall({
        start: { key: 'notifications.registration.starting' },
        success: { key: 'notifications.registration.success' },
        error: (error) => ({ key: this.errorTranslationKey(error) })
      }),
      finalize(() => this.isSubmitting.set(false))
    ).subscribe({
      next: (response) => {
        this.registrationEmail.set(response.email);
        this.registrationState.set('success');
        this.passwordVisible.set(false);
        this.registrationForm.reset();
        this.registrationForm.disable();
      },
      error: (error: unknown) => {
        this.registrationErrorKey.set(this.errorTranslationKey(error));
        this.registrationState.set('error');
      }
    });
  }

  protected hasError(
    controlName: 'role' | 'prenom' | 'nom' | 'email' | 'login' | 'password' | 'confirmPassword' | 'acceptTerms',
    error: string
  ): boolean {
    const control = this.registrationForm.controls[controlName];
    return control.hasError(error) && (control.touched || this.submitted());
  }

  protected hasPasswordMismatch(): boolean {
    const confirmation = this.registrationForm.controls.confirmPassword;
    return this.registrationForm.hasError('passwordMismatch') && (confirmation.touched || this.submitted());
  }

  private errorTranslationKey(error: unknown): string {
    const code = error instanceof HttpErrorResponse && this.isApiError(error.error)
      ? error.error.code
      : undefined;

    switch (code) {
      case 'REGISTRATION_IDENTITY_ALREADY_EXISTS':
        return 'auth.registration.errors.identityExists';
      case 'REGISTRATION_MAIL_DELIVERY_UNAVAILABLE':
        return 'auth.registration.errors.deliveryUnavailable';
      default:
        return 'auth.registration.errors.requestFailed';
    }
  }

  private isApiError(value: unknown): value is ApiErrorResponse {
    return typeof value === 'object'
      && value !== null
      && 'code' in value
      && typeof value.code === 'string';
  }
}
