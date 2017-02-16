import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { CommonService } from './common.service';

import { CommonModal } from './common.model'

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: '../landing.html',
    providers: [CommonService]
})

export class AppComponent implements OnInit {
    constructor(private storage: CommonService) { }

    humidity: Number;
    temperature: Number;


    ngOnInit(): void {
        this.storage.getData().then(item => this.initVariables(item));
    }

    initVariables(item: CommonModal) {
        this.humidity = item.Humidity;
        this.temperature = item.Temprature;
    }
}
