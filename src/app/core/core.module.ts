import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// DO import modules that should be instantiated once in your app.
// DO place services in the module, but do not provide them
// DO NOT declare components, pipes, directives.
// DO NOT import the CoreModule into any modules other than the AppModule.

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module');
    }
  }
}
