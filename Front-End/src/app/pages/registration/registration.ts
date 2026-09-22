import { Component, effect, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/i18n/translation.service';
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
  private readonly formBuilder = inject(FormBuilder);
  private readonly title = inject(Title);

  protected readonly passwordVisible = signal(false);
  protected readonly submitted = signal(false);
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
    this.submitted.set(true);

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
    }
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
}
