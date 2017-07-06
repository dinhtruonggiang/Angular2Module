import { requestOptionsProvider } from './strategies/default-request-options';
import { CustomPreloading, customPreloadingProvider } from './strategies/custom-preloading';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';

import { DecimalNumbericDirective } from './directives/decimal-numberic.directive';
import { OnlyNumberDirective } from './directives/only-number.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DecimalNumbericDirective,
    OnlyNumberDirective
  ],
  providers: [HttpService, AuthService],
  exports: [
    DecimalNumbericDirective,
    OnlyNumberDirective
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        HttpService,
        AuthService,
        customPreloadingProvider,
        requestOptionsProvider
      ]
    };
  }
};

