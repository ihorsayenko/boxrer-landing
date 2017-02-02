import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: '../landing.html'
})

export class AppComponent {
    val: Number = 15;
    minSlide: Number = 0;
    maxSlide: Number = 20;
}
