import { NgModule } from '@angular/core';
import { Component } from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'landing',
    templateUrl: '../content.html'
})

export class MainComponent {
    humidity: Number = 50;
    temperature: Number = 25;
    val: Number = 0;
    minSlide: Number = 0;
    maxSlide: Number = 365;

    monthPay: number = 1000;
    periodPay: number = 800;

    dateFrom: Date;
    dateTo: Date;

}