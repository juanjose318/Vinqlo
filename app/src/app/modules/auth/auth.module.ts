import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailConfirmationComponent } from 'src/app/email-confirmation/email-confirmation.component';
import { FeedModule } from '../feed/feed.module';
import { MaterialModule } from '../materials/material.module';
import { AuthRoutingModule } from './auth.routing-module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FeedModule,
    AuthRoutingModule
  ],
  exports: [],
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmailConfirmationComponent
  ],
  providers: [],
})
export class AuthModule { }
