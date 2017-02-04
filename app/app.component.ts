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
    val: Number = 15;
    minSlide: Number = 0;
    maxSlide: Number = 20;

    monthPay: number = 1000;
    periodPay: number = 800;

    dateFrom: Date;
    dateTo: Date;

}
