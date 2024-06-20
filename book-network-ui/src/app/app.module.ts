import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {  HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { CodeInputModule } from 'angular-code-input';
import { httpTokenInterceptor } from './services/interceptor/http-token.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { KeycloakService } from './services/keycloak/keycloak.service';

export function KcFactory(Kcservice:KeycloakService){
  return ()=> Kcservice.init();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CodeInputModule,
    BrowserAnimationsModule,
    MatIconModule
    
    
    
    
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps:[KeycloakService],
      useFactory:KcFactory,
      multi:true

    },
    
    HttpClient,
   provideHttpClient(withInterceptors([httpTokenInterceptor]),withFetch()),
   provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
