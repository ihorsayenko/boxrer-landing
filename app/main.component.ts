import { NgModule, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'landing',
    templateUrl: '../content.html'
})

export class MainComponent implements OnInit {
    daysCount: number = 0;
    minSlide: number = 7;
    maxSlide: number = 360;

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
    imgs = [{ 'btnId': '1m_btn', 'imgsrc': '../img/Boxes/1m.png' },
    { 'btnId': '2.5m_btn', 'imgsrc': '../img/Boxes/2,5m.png' },
    { 'btnId': '3m_btn', 'imgsrc': '../img/Boxes/3m.png' },
    { 'btnId': '4m_btn', 'imgsrc': '../img/Boxes/4m.png' },
    { 'btnId': '5m_btn', 'imgsrc': '../img/Boxes/5m.png' },
    { 'btnId': '6m_btn', 'imgsrc': '../img/Boxes/6m.png' },
    { 'btnId': '7m_btn', 'imgsrc': '../img/Boxes/7m.png' },
    { 'btnId': '12m_btn', 'imgsrc': '../img/Boxes/12m.png' }]

    @ViewChildren('sizeBtns') boxSizeBtns: ElementRef;
    @ViewChildren('termsBtns') termsBtns: ElementRef;

    constructor(http: Http) {
        this.http = http;
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

    ngOnInit() {
        this.boxImgSrcFull = this.imgs[0].imgsrc;
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
        debugger;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = "https://api:key-5056082441537401ce1f171a73494777@api.mailgun.net/v3/boxer.com.ua";
        let parameters = {
                          "parameters": {
                            "from": "Mailgun Sandbox <postmaster@sandbox224f28ae45a8499d84184fd4c48e62ee.mailgun.org>",
                            "to": "Jordi <qwertyihor11@gmail.com>",
                            "subject": "Hello Jordi",
                            "text": "Congratulations Jordi, you just sent an email with Mailgun!  You are truly awesome!  You can see a record of this email in your logs: https://mailgun.com/cp/log .  You can send up to 300 emails/day from this sandbox server.  Next, you should add your own domain so you can send 10,000 emails/month for free."
                          }
                        };
        let result = this.http
            .post(url, parameters, options);
        return true;

    }
}
