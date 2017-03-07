"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var http_1 = require('@angular/http');
require('../node_modules/mailgun-js/lib/mailgun.js');
require('../node_modules/mailgun-js/lib/attachment.js');
require('../node_modules/mailgun-js/lib/build.js');
require('../node_modules/mailgun-js/lib/request.js');
require('../node_modules/mailgun-js/lib/schema.js');
var MainComponent = (function () {
    function MainComponent(http) {
        this.daysCount = 0;
        this.minSlide = 7;
        this.maxSlide = 360;
        this.monthPay = 0;
        this.periodPay = 0;
        this.boxSize = 0;
        this.dateFrom = new Date();
        this.imgs = [{ 'btnId': '1m_btn', 'imgsrc': '../img/Boxes/1m.png' },
            { 'btnId': '2.5m_btn', 'imgsrc': '../img/Boxes/2,5m.png' },
            { 'btnId': '3m_btn', 'imgsrc': '../img/Boxes/3m.png' },
            { 'btnId': '4m_btn', 'imgsrc': '../img/Boxes/4m.png' },
            { 'btnId': '5m_btn', 'imgsrc': '../img/Boxes/5m.png' },
            { 'btnId': '6m_btn', 'imgsrc': '../img/Boxes/6m.png' },
            { 'btnId': '7m_btn', 'imgsrc': '../img/Boxes/7m.png' },
            { 'btnId': '12m_btn', 'imgsrc': '../img/Boxes/12m.png' }];
        this.http = http;
    }
    MainComponent.prototype.onBtnSizeClick = function (elem) {
        var id = elem.id;
        var btns = this.boxSizeBtns._results[0].nativeElement.children;
        for (var _i = 0, btns_1 = btns; _i < btns_1.length; _i++) {
            var element = btns_1[_i];
            if (element.classList.contains('active_btn') && element.id !== id) {
                element.classList.remove('active_btn');
            }
            else {
                if (element.id === id) {
                    element.classList.add('active_btn');
                    this.boxSize = id.split('m')[0];
                }
            }
        }
        this.boxImgSrcFull = this.imgs.find(function (x) { return x.btnId === id; }).imgsrc;
        this.calculatePrice();
    };
    MainComponent.prototype.onBtnTermClick = function (elem) {
        var id = elem.id;
        var btns = this.termsBtns._results[0].nativeElement.children;
        for (var _i = 0, btns_2 = btns; _i < btns_2.length; _i++) {
            var element = btns_2[_i];
            if (element.classList.contains('active_btn') && element.id !== id) {
                element.classList.remove('active_btn');
            }
            else {
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
    };
    MainComponent.prototype.onSlideEnd = function () {
        if (this.activeTermBtb) {
            this.activeTermBtb.classList.remove('active_btn');
            this.calculatePrice();
        }
    };
    MainComponent.prototype.ngOnInit = function () {
        this.boxImgSrcFull = this.imgs[0].imgsrc;
    };
    MainComponent.prototype.calculatePrice = function () {
        if (this.boxSize > 1 && this.daysCount >= 7) {
            var price = void 0;
            if (this.daysCount <= 30) {
                price = 12;
            }
            else if (this.daysCount <= 90) {
                price = 10.5;
            }
            else if (this.daysCount <= 180) {
                price = 9.5;
            }
            else if (this.daysCount <= 360) {
                price = 8.5;
            }
            this.periodPay = Math.round(price * this.boxSize * this.daysCount);
            this.monthPay = Math.round(30 * this.periodPay / this.daysCount);
        }
        else if (this.boxSize == 1 && this.daysCount >= 7) {
            this.periodPay = Math.round(12 * this.boxSize * this.daysCount);
            this.monthPay = Math.round(30 * this.periodPay / this.daysCount);
        }
    };
    MainComponent.prototype.sendMail = function () {
        debugger;
        var username = 'postmaster@sandboxe0f06647b24846eb876f59315f3dc6a2.mailgun.org';
        var password = 'd8054c0d6641495730824892a93018dc';
        var apiKey = 'key-5056082441537401ce1f171a73494777';
        var domain = 'sandboxe0f06647b24846eb876f59315f3dc6a2.mailgun.org';
        var mailgun = require('mailgun-js')({ apiKey: apiKey, domain: domain });
        var data = {
            from: 'Excited User <me@samples.mailgun.org>',
            to: 'qwertyihor11@mail.ru',
            subject: 'Hello',
            text: 'Testing some Mailgun awesomness!'
        };
        var headers = new http_1.Headers({
            'Authorization': 'Basic' + btoa('api' + ':' + apiKey)
        });
        mailgun.messages().send(data, function (error, body) {
            console.log(body);
        });
        // let options = new RequestOptions({ headers: headers });
        // let url = "https://api.mailgun.net/v3/" + domain;
        // let parameters = {
        //     "domain": domain,
        //     "parameters": {
        //         "from": "Mailgun Sandbox <postmaster@sandbox224f28ae45a8499d84184fd4c48e62ee.mailgun.org>",
        //         "to": "Jordi <qwertyihor11@gmail.com>",
        //         "subject": "Hello Jordi",
        //         "text": "Congratulations Jordi, you just sent an email with Mailgun!  You are truly awesome!  You can see a record of this email in your logs: https://mailgun.com/cp/log .  You can send up to 300 emails/day from this sandbox server.  Next, you should add your own domain so you can send 10,000 emails/month for free."
        //     }
        // };
        // let result = this.http
        //     .post(url, parameters, options)
        //     .subscribe(resp => { console.log(resp) });
        return true;
    };
    __decorate([
        core_1.ViewChildren('sizeBtns'), 
        __metadata('design:type', core_1.ElementRef)
    ], MainComponent.prototype, "boxSizeBtns", void 0);
    __decorate([
        core_1.ViewChildren('termsBtns'), 
        __metadata('design:type', core_1.ElementRef)
    ], MainComponent.prototype, "termsBtns", void 0);
    MainComponent = __decorate([
        core_2.Component({
            moduleId: module.id,
            selector: 'landing',
            templateUrl: '../content.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map