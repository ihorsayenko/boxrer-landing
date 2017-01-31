import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2SliderComponent } from 'ng2-slider-component/ng2-slider.component';
import { SlideAbleDirective } from 'ng2-slideable-directive/slideable.directive';
import { Ng2StyledDirective } from 'ng2-styled-directive/ng2-styled.directive';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule],
    declarations: [AppComponent,
        SlideAbleDirective, 
        Ng2StyledDirective,
        Ng2SliderComponent],
    bootstrap: [AppComponent],
    exports: [
        Ng2SliderComponent,
        Ng2StyledDirective]

})
export class AppModule {

}