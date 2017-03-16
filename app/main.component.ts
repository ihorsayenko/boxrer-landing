import { NgModule, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { CommonService } from './common.service'
import { PackageModel } from './package.model'

@Component({
    moduleId: module.id,
    selector: 'landing',
    templateUrl: '../content.html'
})

export class MainComponent implements OnInit {
    daysCount: number = 0;
    minSlide: number = 7;
    maxSlide: number = 360;
    maxPackageCount = 20;

    monthPay: number = 0;
    periodPay: number = 0;
    boxSize: number = 0;

    dateFrom: Date = new Date();

    boxImgSrcFull: string;

    Name: string;
    surname: string;
    mobileNumber: string;
    email: string;
    comments: string;

    activeTermBtb: ElementRef;

    http: Http;
    imgs: any;

    boxes: PackageModel[];
    boxesEtalon: PackageModel[];
    locksAndShelves: PackageModel[];
    locksAndShelvesEtalon: PackageModel[];
    packages: PackageModel[];
    packagesEtalon: PackageModel[];
    others: PackageModel[];
    othersEtalon: PackageModel[];

    common: CommonService;

    @ViewChildren('sizeBtns') boxSizeBtns: ElementRef;
    @ViewChildren('termsBtns') termsBtns: ElementRef;

    constructor(http: Http, common: CommonService) {
        this.http = http;
        this.common = common;
        common.getBoxImgs().then(items => this.initVariables(items));
    }

    ngOnInit(): void {
        //this.storage.getData().then(item => this.Items = item.QuestionItems as any);
        this.common.getPackageBoxes().then(i => { this.boxes = i; this.boxesEtalon = (JSON.parse(JSON.stringify(i))) as PackageModel[]; });
        this.common.getPackageLocksAndShelves().then(i => { this.locksAndShelves = i; this.locksAndShelvesEtalon = i; });
        this.common.getPackagePackages().then(i => { this.packages = i; this.packagesEtalon = i; });
        this.common.getPackageOthers().then(i => { this.others = i; this.othersEtalon = i; });
    }

    initVariables(items: any) {
        this.imgs = items;
        this.boxImgSrcFull = this.imgs[0].imgsrc;
    }

    onBtnSizeClick(elem: ElementRef): void {
        let id = elem.id;
        let btns = this.boxSizeBtns._results[0].nativeElement.children;
        for (let element of btns) {
            if (element.classList.contains('active_btn') && element.id !== id) {
                element.classList.remove('active_btn')
            } else {
                if (element.id === id) {
                    element.classList.add('active_btn');
                    this.boxSize = id.split('m')[0];
                }
            }
        }

        this.boxImgSrcFull = this.imgs.find(x => x.btnId === id).imgsrc;
        this.calculatePrice();
    }

    onBtnTermClick(elem: ElementRef): void {
        debugger;
        let id = elem.id;
        let btns = this.termsBtns._results[0].nativeElement.children;
        for (let element of btns) {
            if (element.classList.contains('active_btn') && element.id !== id) {
                element.classList.remove('active_btn')
            } else {
                if (element.id === id) {
                    element.classList.add('active_btn');
                    this.activeTermBtb = element;
                }
            }
        }
        switch (id) {
            case '1w':
                this.daysCount = 7;
                break;
            case '1m':
                this.daysCount = 30;
                break;
            case '3m':
                this.daysCount = 90;
                break;
            case '6m':
                this.daysCount = 180;
                break;
            case '1y':
                this.daysCount = 360;
                break;
        }

        this.calculatePrice();
    }

    onSlideEnd(): void {
        if (this.activeTermBtb) {
            this.activeTermBtb.classList.remove('active_btn');
            this.calculatePrice();
        }
    }

    onCountPlus(item: Object): void { item.count++; }

    onCountMinus(item: Object): void { item.count--; }

    bookPackages():void{
        if(this.boxes.find(i => i.count > 0)){
            debugger;
            this.boxes = this.boxesEtalon;
        }
    }

    calculatePrice(): void {
        if (this.boxSize > 1 && this.daysCount >= 7) {
            let price;
            if (this.daysCount <= 30) {
                price = 12;
            } else if (this.daysCount <= 90) {
                price = 10.5;
            } else if (this.daysCount <= 180) {
                price = 9.5;
            } else if (this.daysCount <= 360) {
                price = 8.5;
            }

            this.periodPay = Math.round(price * this.boxSize * this.daysCount);
            this.monthPay = Math.round(30 * this.periodPay / this.daysCount);
        } else if (this.boxSize == 1 && this.daysCount >= 7) {
            this.periodPay = Math.round(12 * this.boxSize * this.daysCount);
            this.monthPay = Math.round(30 * this.periodPay / this.daysCount);
        }
    }

    sendMail(): boolean {
        let url = "https://api.elasticemail.com/v2/email/send";
        let api = "27bf6e11-fe44-45ed-b8c4-e291737221fc";
        let to = "qwertyihor11@gmail.com";
        let from = "boxer.co.ua@gmail.com";
        let subject = "Бронювання боксу (" + Date.now + ")";
        let bodyHtml = "from angular <br/>";
        let isTransactional = false;

        url = url.concat("?apikey=" + api);
        url = url.concat("&subject=" + subject);
        url = url.concat("&from=" + from);
        url = url.concat("&to=" + to);
        url = url.concat("&bodyHtml=" + bodyHtml);
        url = url.concat("&isTransactional=" + isTransactional);

        this.http.post(url, null, null).subscribe(i => { console.log(i) })
        return true;
    }
}
