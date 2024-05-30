import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InputTextareaModule } from 'primeng/inputtextarea';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    InputTextareaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
