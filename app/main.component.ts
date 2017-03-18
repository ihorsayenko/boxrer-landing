import { NgModule, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

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
    boxSizeStr: string;
    boxSizeStrM: string;

    dateFrom: Date = new Date();
    dateFromStr: string;
    dateToStr: string;

    boxImgSrcFull: string;

    name: string;
    surname: string;
    mobileNumber: string;
    email: string;
    comments: string;

    activeTermBtb: ElementRef;

    http: Http;
    imgs: any;
    common: CommonService;

    boxes: PackageModel[];
    boxesEtalon: PackageModel[];
    locksAndShelves: PackageModel[];
    locksAndShelvesEtalon: PackageModel[];
    packages: PackageModel[];
    packagesEtalon: PackageModel[];
    others: PackageModel[];
    othersEtalon: PackageModel[];

    showPackageMaterialsOnBooking: boolean = false;
    showBoxes: boolean = false;
    showLocksAndShelves: boolean = false;
    showPackages: boolean = false;
    showOthers: boolean = false;

    countBoxes: number;
    countLocksAndShelves: number;
    countPackages: number;
    countOthers: number;

    packagesPrice: number;
    finalPrice: number = 0;


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
        this.common.getPackageLocksAndShelves().then(i => { this.locksAndShelves = i; this.locksAndShelvesEtalon = (JSON.parse(JSON.stringify(i))) as PackageModel[];});
        this.common.getPackagePackages().then(i => { this.packages = i; this.packagesEtalon = (JSON.parse(JSON.stringify(i))) as PackageModel[]; });
        this.common.getPackageOthers().then(i => { this.others = i; this.othersEtalon = (JSON.parse(JSON.stringify(i))) as PackageModel[]; });
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
                    this.boxSizeStr = this.boxSize === 1 ? this.boxSize + "м<sup>3</sup>" : this.boxSize + "м<sup>2</sup>";
                    this.boxSizeStrM = this.boxSize == 1 ? "3" : "2";
                }
            }
        }

        this.boxImgSrcFull = this.imgs.find(x => x.btnId === id).imgsrc;
        this.calculatePrice();
    }

    onBtnTermClick(elem: ElementRef): void {
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

    resetPackageFlags(): void {
        this.countBoxes = 0;
        this.countLocksAndShelves = 0;
        this.countPackages = 0;
        this.countOthers = 0;
        this.packagesPrice = 0;

        this.showBoxes = false;
        this.showLocksAndShelves = false;
        this.showOthers = false;
        this.showPackages = false;
    }

    openBookingModal(): void {
        this.resetPackageFlags()

        if (this.boxes.find(i => i.count > 0)) {
            let array = this.boxes.filter(i => i.count > 0);

            array.forEach(i => {
                this.countBoxes += i.count;
                this.packagesPrice += (i.count * i.price);
            });

            this.showBoxes = true;
        }
        if (this.locksAndShelves.find(i => i.count > 0)) {

            let array = this.locksAndShelves.filter(i => i.count > 0);

            array.forEach(i => {
                this.countLocksAndShelves += i.count;
                this.packagesPrice += (i.count * i.price);
            });

            this.showLocksAndShelves = true;
        }
        if (this.packages.find(i => i.count > 0)) {
            let array = this.packages.filter(i => i.count > 0);

            array.forEach(i => {
                this.countPackages += i.count;
                this.packagesPrice += (i.count * i.price);
            });

            this.showPackages = true;
        }
        if (this.others.find(i => i.count > 0)) {
            let array = this.others.filter(i => i.count > 0);

            array.forEach(i => {
                this.countOthers += i.count;
                this.packagesPrice += (i.count * i.price);
            });

            this.showOthers = true;
        }

        this.showPackageMaterialsOnBooking = this.showBoxes ||
            this.showLocksAndShelves ||
            this.showOthers ||
            this.showPackages;
        this.finalPrice = this.periodPay + this.packagesPrice;
    }

    onCountPlus(item: Object): void { item.count++; }

    onCountMinus(item: Object): void { item.count--; }

    bookPackages(): void {

    }

    closePackageModal(): void {
        if (this.boxes.find(i => i.count > 0)) {
            this.boxes = this.boxesEtalon;
        }
        if (this.locksAndShelves.find(i => i.count > 0)) {
            this.locksAndShelves = this.locksAndShelvesEtalon;
        }
        if (this.packages.find(i => i.count > 0)) {
            this.packages = this.packagesEtalon;
        }
        if (this.others.find(i => i.count > 0)) {
            this.others = this.othersEtalon;
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

        let date = new Date(this.dateFrom);
        let newDate = date.setDate(date.getDate() + this.daysCount);
        let dateTo = new Date(newDate);
        let fromMonth = this.dateFrom.getMonth() + Number(1);
        let toMonth = dateTo.getMonth() + Number(1);

        this.dateFromStr = this.dateFrom.getDate() + "/" +
            fromMonth + "/" + this.dateFrom.getFullYear();
        this.dateToStr = dateTo.getDate() + "/" +
            toMonth + "/" + dateTo.getFullYear();
    }

    collectBodyForEmail(): string {
        let emailBody = "";
        let date = new Date(this.dateFrom);
        let newDate = date.setDate(date.getDate() + this.daysCount);
        let dateTo = new Date(newDate);
        let fromMonth = this.dateFrom.getMonth() + Number(1);
        let toMonth = dateTo.getMonth() + Number(1);

        emailBody = emailBody.concat("Ім'я:  <b>" + this.name + "</b>");
        emailBody = emailBody.concat("<br>Прізвище:  <b>" + this.surname + "</b>");
        emailBody = emailBody.concat("<br>Телефон:  <b>" + this.mobileNumber + "</b>");
        emailBody = emailBody.concat("<br>Email:  <b>" + this.email + "</b>");
        emailBody = emailBody.concat("<br>Коментар:  <b>" + this.comments + "</b>");
        emailBody = emailBody.concat("<h3>Замовлення:</h3>");
        emailBody = emailBody.concat("&nbsp;&nbsp;- Термін зберігання: <b>" + this.daysCount + "</b>");
        emailBody = emailBody.concat("<br>&nbsp;&nbsp;- Починаючи з <b>[" +
            this.dateFromStr + "]</b>  до <b>[" + this.dateToStr + "]</b>");
        emailBody = emailBody.concat("<br>&nbsp;&nbsp;- Розмір боксу: <b>" + this.boxSizeStr + "</b>");
        if (this.showPackageMaterialsOnBooking) {
            emailBody = emailBody.concat("<h3>Пакувальні матеріали:</h3>");
            this.boxes.filter(i => i.count > 0).forEach(i => {
                emailBody = emailBody.concat("<br>&nbsp;&nbsp;- " +
                    i.description.join(" ") + ": " +
                    i.count + " шт | " +
                    i.price + " грн/шт | <b>" +
                    i.count * i.price + " грн</b>");
            });
            this.locksAndShelves.filter(i => i.count > 0).forEach(i => {
                emailBody = emailBody.concat("<br>&nbsp;&nbsp;- " +
                    i.description.join(" ") + ": " +
                    i.count + " шт | " +
                    i.price + " грн/шт | <b>" +
                    i.count * i.price + " грн</b>");
            });
            this.packages.filter(i => i.count > 0).forEach(i => {
                emailBody = emailBody.concat("<br>&nbsp;&nbsp;- " +
                    i.description.join(" ") + ": " +
                    i.count + " шт | " +
                    i.price + " грн/шт | <b>" +
                    i.count * i.price + " грн</b>");
            });
            this.others.filter(i => i.count > 0).forEach(i => {
                emailBody = emailBody.concat("<br>&nbsp;&nbsp;- " +
                    i.description.join(" ") + ": " +
                    i.count + " шт | " +
                    i.price + " грн/шт | <b>" +
                    i.count * i.price + " грн</b>");
            });
        }
        emailBody = emailBody.concat("<h3>Ціна за пакувальні матеріали: <i>" + this.packagesPrice + " грн</i></h3>");
        emailBody = emailBody.concat("<h3>Ціна за місяць: <i>" + this.monthPay + " грн</i></h3>");
        emailBody = emailBody.concat("<h3>Ціна за весь період (без матеріалів): <i>" + this.periodPay + " грн</i></h3>");
        emailBody = emailBody.concat("<h3>Ціна за весь період (з матеріалами): <i>" + this.finalPrice + " грн</i></h3>");
        return emailBody;
    }

    sendMail(event: Event): boolean {
        let url = "https://api.elasticemail.com/v2/email/send";
        let api = "27bf6e11-fe44-45ed-b8c4-e291737221fc";
        let to = "qwertyihor11@gmail.com";
        let from = "boxer.co.ua@gmail.com";
        let subject = "Бронювання боксу (" + Date.now + ")";
        let bodyHtml = this.collectBodyForEmail();
        let isTransactional = true;

        let headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = new URLSearchParams();

        body.append('apikey', api);
        body.append('subject', subject);
        body.append('from', from);
        body.append('to', to);
        body.append('bodyHTML', bodyHtml);
        body.append('isTransactional', 'false');

        this.http.post(url, body, headers).subscribe(i => { console.log(i) })
        return true;
    }
}
