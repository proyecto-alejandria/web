import { HttpClient } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { AuthService } from 'auth/auth.service';
import { lastValueFrom, switchMap, tap } from 'rxjs';
import { FATAL_LOAD_ERROR } from 'shared/errors';
import { environment } from '../environments/environment';

export interface AppSettings {

  // Is the site open to the public?
  public: boolean;

  // Is the register endpoint available?
  register: boolean;

};

const DEFAULT_SETTINGS: AppSettings = {
  public: true,
  register: true,
};

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private _settings: AppSettings = DEFAULT_SETTINGS;

  get settings(): AppSettings {
    return this._settings;
  }

  private renderer: Renderer2;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(document.body, null);
  }

  bootstrap(): Promise<void> {
    const obs = this.http
      .get<AppSettings>(environment.apiUrl + '/bootstrap/')
      .pipe(
        tap(settings => this._settings = settings),
        switchMap(() => this.auth.load()),
      );

    return lastValueFrom(obs)
      .then(() => {
        this.renderer.removeClass(document.body, 'app-loading');
      })
      .catch(() => {
        this.renderer.addClass(document.body, 'text-warn');
        this.renderer.appendChild(document.body, this.renderer.createText(FATAL_LOAD_ERROR));

        return Promise.reject();
      });
  }

}
