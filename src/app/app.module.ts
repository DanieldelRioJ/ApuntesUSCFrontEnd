import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PrincipalComponent } from './principal/principal.component';
import { UltimosApuntesComponent } from './principal/ultimos-apuntes/ultimos-apuntes.component';
import {MatSelectModule} from '@angular/material/select';
import {AsignaturaService} from './modelo/asignatura.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {RamaService} from './modelo/rama.service';
import {ApunteService} from './modelo/apunte.service';
import { CantidadApuntesComponent } from './principal/cantidad-apuntes/cantidad-apuntes.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import { VentanaAsignaturasComponent } from './ventana-asignaturas/ventana-asignaturas.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import { VentanaApuntesComponent } from './ventana-apuntes/ventana-apuntes.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { SizePipe } from './pipes/size.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { SubirApuntesComponent } from './subir-apuntes/subir-apuntes.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatInputModule, MAT_DATE_LOCALE } from '@angular/material';
import { PieComponent } from './pie/pie.component';
import { CookiesComponent } from './politicas/cookies/cookies.component';
import { PrivacidadComponent } from './politicas/privacidad/privacidad.component';
import { ContactoComponent } from './pie/contacto/contacto.component';
import { FaqComponent } from './pie/faq/faq.component';
import { NosotrosComponent } from './pie/nosotros/nosotros.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

//import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes=[
  {path:'', pathMatch:'full', redirectTo:'home'},
  {path:'home', component:PrincipalComponent},
  {path:'privacidad', component:PrivacidadComponent},
  {path:'cookies', component:CookiesComponent},
  {path:'faq', component:FaqComponent},
  {path:'we', component:NosotrosComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'degree/:id/subjects', component:VentanaAsignaturasComponent},
  {path:'subject/:id/classNotes', component:VentanaApuntesComponent},
  {path:'404', component:NotFoundComponent},
  {path:'**',redirectTo:'404'}
];

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    PrincipalComponent,
    UltimosApuntesComponent,
    CantidadApuntesComponent,
    VentanaAsignaturasComponent,
    VentanaApuntesComponent,
    NotFoundComponent,
    SizePipe,
    SubirApuntesComponent,
    PieComponent,
    CookiesComponent,
    PrivacidadComponent,
    ContactoComponent,
    FaqComponent,
    NosotrosComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSelectModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    MatTreeModule,
    MatExpansionModule,
    RouterModule.forRoot(routes),
    MatTabsModule,
    MatInputModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule,
    MaterialFileInputModule,
    FormsModule, ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [AsignaturaService, RamaService, ApunteService,MatDatepickerModule,{provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
      //{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    /*{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
