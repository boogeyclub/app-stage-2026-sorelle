import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/i18n/translation.service';
import { LanguageSwitcherComponent } from '../../shared/language-switcher/language-switcher';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, LanguageSwitcherComponent],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  protected readonly i18n = inject(TranslationService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly title = inject(Title);

  protected readonly passwordVisible = signal(false);
  protected readonly submitted = signal(false);
  protected readonly loginForm = this.formBuilder.nonNullable.group({
    identity: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  });

  constructor() {
    effect(() => this.title.setTitle(this.i18n.t('meta.loginTitle')));
  }

  protected submit(): void {
    this.submitted.set(true);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
  }

  protected hasError(controlName: 'identity' | 'password', error: string): boolean {
    const control = this.loginForm.controls[controlName];
    return control.hasError(error) && (control.touched || this.submitted());
  }
}
