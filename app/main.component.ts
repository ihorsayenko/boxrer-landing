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
    }

    collectBodyForEmail(): string {
        let emailBody = "";
        emailBody = emailBody.concat("Ім'я - " + this.name);
        emailBody = emailBody.concat("<br>Прізвище - " + this.surname);
        emailBody = emailBody.concat("<br>Телефон - " + this.mobileNumber);
        emailBody = emailBody.concat("<br>Email - " + this.email);
        emailBody = emailBody.concat("<br>Коментар - " + this.comments);
        emailBody = emailBody.concat("<br><br>Замовлення:");
        emailBody = emailBody.concat("<br> - термін зберігання - ");
        emailBody = emailBody.concat("<br> - починаючи з [" + this.dateFrom + "]  до [" + this.dateFrom + this.daysCount + "]");
        emailBody = emailBody.concat("<br> - розмір боксу - ");
        emailBody = emailBody.concat("<br><br>Пакувальні матеріали:");
        if (this.showPackageMaterialsOnBooking) {
            this.boxes.filter(i => i.count > 0).forEach(i => {
                emailBody = emailBody.concat("<br>" +
                    i.description.join(" ") + " - " +
                    i.count + " шт //" +
                    i.price + " грн//шт // " +
                    i.count * i.price + " грн");
            });
            this.locksAndShelves.filter(i => i.count > 0).forEach(i => {
                emailBody = emailBody.concat("<br>&nbsp;&nbsp;" +
                    i.description.join(" ") + " - " +
                    i.count + " шт / " +
                    i.price + " грн/шт / " +
                    i.count * i.price + " грн");
            });
            this.packages.filter(i => i.count > 0).forEach(i => {
                emailBody = emailBody.concat("<br>&nbsp;&nbsp;" +
                    i.description.join(" ") + " - " +
                    i.count + " шт / " +
                    i.price + " грн/шт / " +
                    i.count * i.price + " грн");
            });
            this.others.filter(i => i.count > 0).forEach(i => {
                emailBody = emailBody.concat("<br>&nbsp;&nbsp;" +
                    i.description.join(" ") + " - " +
                    i.count + " шт / " +
                    i.price + " грн/шт / " +
                    i.count * i.price + " грн");
            });
        }
        emailBody = emailBody.concat("<br><br>Ціна за пакувальеі матеріали: " + this.packagesPrice + " грн");
        emailBody = emailBody.concat("<br>Ціна за місяць: " + this.monthPay + " грн <br><br><br>");
        emailBody = emailBody.concat("<br>Ціна загальна: " + this.finalPrice + " грн");

        return emailBody;
    }

    sendMail(): boolean {
        let url = "https://api.elasticemail.com/v2/email/send";
        let api = "27bf6e11-fe44-45ed-b8c4-e291737221fc";
        let to = "qwertyihor11@gmail.com";
        let from = "boxer.co.ua@gmail.com";
        let subject = "Бронювання боксу (" + Date.now + ")";
        //let bodyHtml = "from angular <br/>";
        let bodyHtml = this.collectBodyForEmail();
        let isTransactional = false;
        debugger;
        url = url.concat("?apikey=" + api);
        url = url.concat("&subject=" + subject);
        url = url.concat("&from=" + from);
        url = url.concat("&to=" + to);
        //url = url.concat("&bodyHTML=" + bodyHtml.toString());
        url = url.concat("&isTransactional=" + isTransactional);

        let data = {
            "bodyHTML" : bodyHtml
        };

        this.http.post(url, data, null).subscribe(i => { console.log(i) })
        return true;
    }
}
