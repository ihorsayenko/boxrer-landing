import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import {InputTextModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        InputTextModule,
        SliderModule
        ],
    declarations: [
        AppComponent
        ],
    bootstrap: [AppComponent],
    exports: []

})
export class AppModule {

}