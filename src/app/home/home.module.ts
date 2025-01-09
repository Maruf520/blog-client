import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeComponent,
    HeaderComponent,
    RouterModule,
    HomeRoutingModule,
  ],
  providers: [],
})
export class HomeModule {}
