import { NgModule } from '@angular/core';
import { Component } from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: '../landing.html'
})

export class AppComponent {
    humidity: Number = 50;
    temperature: Number = 25;
}
