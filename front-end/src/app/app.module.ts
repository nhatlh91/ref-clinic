import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../environments/environment";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {LayoutComponent} from './layouts/layout/layout.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {SidebarModule} from "./layouts/sidebar/sidebar.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {provideNativeDateAdapter} from "@angular/material/core";
import {registerLocaleData} from "@angular/common";
import localeViVn from '@angular/common/locales/vi';
import {HttpClientModule} from "@angular/common/http";
import {CustomPaginatorComponent} from './layouts/custom-paginator/custom-paginator.component';
import {MatPaginatorIntl} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatProgressBar} from "@angular/material/progress-bar";
import {PopupSpinnerComponent} from './layouts/popup-spinner/popup-spinner.component';

registerLocaleData(localeViVn);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CustomPaginatorComponent,
    PopupSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    SidebarModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSlideToggle,
    HttpClientModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    {provide: LOCALE_ID, useValue: 'vi-VN'},
    {provide: MatPaginatorIntl, useClass: CustomPaginatorComponent},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
