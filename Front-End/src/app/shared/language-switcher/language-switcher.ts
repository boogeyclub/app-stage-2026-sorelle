import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';

@Component({
  selector: 'app-language-switcher',
  template: `
    <div
      class="inline-flex rounded-full border border-stone-200 bg-stone-100/80 p-1"
      role="group"
      [attr.aria-label]="i18n.t('common.languageSelector')"
    >
      @for (language of i18n.languages; track language.code) {
        <button
          class="rounded-full px-2.5 py-1 text-[0.68rem] font-extrabold tracking-[0.08em] transition sm:px-3"
          type="button"
          [class.bg-white]="i18n.language() === language.code"
          [class.text-[#18352b]]="i18n.language() === language.code"
          [class.shadow-sm]="i18n.language() === language.code"
          [class.text-stone-500]="i18n.language() !== language.code"
          [attr.aria-pressed]="i18n.language() === language.code"
          [attr.aria-label]="i18n.t('common.switchToLanguage', { language: language.label })"
          (click)="i18n.setLanguage(language.code)"
        >
          {{ language.shortLabel }}
        </button>
      }
    </div>
  `
})
export class LanguageSwitcherComponent {
  protected readonly i18n = inject(TranslationService);
}
