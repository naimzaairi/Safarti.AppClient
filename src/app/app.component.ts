import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './services/authentication.service';
import { Language } from './enums/language.enum';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // language: string | null = null;
  // userId?: number;
  // isAuthenticated: boolean = false;

  constructor(private translate: TranslateService, private authService: AuthenticationService) {
    this.translate.setDefaultLang(Language.French);
    this.translate.use(Language.French)
    this.authService.initAuth();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.setDefaultLang(event.lang);
      this.translate.use(event.lang);
    });
  }
}
