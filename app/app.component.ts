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
    data: CommonModal;
    constructor(private storage: CommonService) {
    }

    humidity: Number;
    temperature: Number;


    ngOnInit(): void {
        this.storage.getData().then(item => this.initVariables(item));
        debugger;
    }

    initVariables(item: CommonModal) {
        this.data = item;
        this.humidity = this.data.Humidity;
        this.temperature = this.data.Temprature;
    }
}
