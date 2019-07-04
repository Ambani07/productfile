import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {  MatButtonModule, 
          MatToolbarModule,
          MatSidenavModule,
          MatIconModule,
          MatListModule,
          MatMenuModule,
        } from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
// import { DataTableComponent } from './data-table/data-table.component';
import { AdminModule } from './admin/admin.module';


const routes: Routes = [
  {path: '', redirectTo: '/admin', pathMatch: 'full'},
]
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    // DataTableComponent,
    // AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AdminModule,
    MatMenuModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
