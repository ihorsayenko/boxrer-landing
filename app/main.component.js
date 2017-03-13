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
var common_service_1 = require('./common.service');
var MainComponent = (function () {
    function MainComponent(http, common) {
        var _this = this;
        this.daysCount = 0;
        this.minSlide = 7;
        this.maxSlide = 360;
        this.monthPay = 0;
        this.periodPay = 0;
        this.boxSize = 0;
        this.dateFrom = new Date();
        this.http = http;
        this.boxes = common.getPackageBoxes();
        this.lokcsAndShelves = common.getPackageLocksAndShelves();
        this.packages = common.getPackagePackages();
        this.others = common.getPackageOthers();
        common.getBoxImgs().then(function (items) { return _this.initVariables(items); });
    }
    MainComponent.prototype.initVariables = function (items) {
        this.imgs = items;
        this.boxImgSrcFull = this.imgs[0].imgsrc;
    };
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
        var url = "https://api.elasticemail.com/v2/email/send";
        var api = "27bf6e11-fe44-45ed-b8c4-e291737221fc";
        var to = "qwertyihor11@gmail.com";
        var from = "boxer.co.ua@gmail.com";
        var subject = "Бронювання боксу (" + Date.now + ")";
        var bodyHtml = "from angular <br/>";
        var isTransactional = false;
        url = url.concat("?apikey=" + api);
        url = url.concat("&subject=" + subject);
        url = url.concat("&from=" + from);
        url = url.concat("&to=" + to);
        url = url.concat("&bodyHtml=" + bodyHtml);
        url = url.concat("&isTransactional=" + isTransactional);
        this.http.post(url, null, null).subscribe(function (i) { console.log(i); });
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
        __metadata('design:paramtypes', [http_1.Http, common_service_1.CommonService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map