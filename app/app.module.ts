import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts.component';
import { MainComponent } from './main.component';
import { PackageGalleryComponent } from './package-gallery.component';

import { InputTextModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        InputTextModule,
        SliderModule,
        CalendarModule,
        RouterModule.forRoot([
            {
                path: 'boxer',
                component: MainComponent
            },
            {
                path: 'contacts',
                component: ContactsComponent
            },
            {
                path: 'gallery',
                component: PackageGalleryComponent

            },
            {
                path: '',
                redirectTo: '/boxer',
                pathMatch: 'full'
            }])
    ],
    declarations: [
        AppComponent,
        ContactsComponent,
        MainComponent,
        PackageGalleryComponent
    ],
    bootstrap: [AppComponent],
    exports: []

})
export class AppModule {

}