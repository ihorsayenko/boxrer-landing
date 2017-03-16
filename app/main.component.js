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
        this.maxPackageCount = 20;
        this.monthPay = 0;
        this.periodPay = 0;
        this.boxSize = 0;
        this.dateFrom = new Date();
        this.showPackageMaterialsOnBooking = false;
        this.showBoxes = false;
        this.showLocksAndShelves = false;
        this.showPackages = false;
        this.showOthers = false;
        this.finalPrice = 0;
        this.http = http;
        this.common = common;
        common.getBoxImgs().then(function (items) { return _this.initVariables(items); });
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.storage.getData().then(item => this.Items = item.QuestionItems as any);
        this.common.getPackageBoxes().then(function (i) { _this.boxes = i; _this.boxesEtalon = (JSON.parse(JSON.stringify(i))); });
        this.common.getPackageLocksAndShelves().then(function (i) { _this.locksAndShelves = i; _this.locksAndShelvesEtalon = i; });
        this.common.getPackagePackages().then(function (i) { _this.packages = i; _this.packagesEtalon = i; });
        this.common.getPackageOthers().then(function (i) { _this.others = i; _this.othersEtalon = i; });
    };
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
    MainComponent.prototype.resetPackageFlags = function () {
        this.countBoxes = 0;
        this.countLocksAndShelves = 0;
        this.countPackages = 0;
        this.countOthers = 0;
        this.packagesPrice = 0;
        this.showBoxes = false;
        this.showLocksAndShelves = false;
        this.showOthers = false;
        this.showPackages = false;
    };
    MainComponent.prototype.openBookingModal = function () {
        var _this = this;
        this.resetPackageFlags();
        if (this.boxes.find(function (i) { return i.count > 0; })) {
            var array = this.boxes.filter(function (i) { return i.count > 0; });
            array.forEach(function (i) {
                _this.countBoxes += i.count;
                _this.packagesPrice += (i.count * i.price);
            });
            this.showBoxes = true;
        }
        if (this.locksAndShelves.find(function (i) { return i.count > 0; })) {
            var array = this.locksAndShelves.filter(function (i) { return i.count > 0; });
            array.forEach(function (i) {
                _this.countLocksAndShelves += i.count;
                _this.packagesPrice += (i.count * i.price);
            });
            this.showLocksAndShelves = true;
        }
        if (this.packages.find(function (i) { return i.count > 0; })) {
            var array = this.packages.filter(function (i) { return i.count > 0; });
            array.forEach(function (i) {
                _this.countPackages += i.count;
                _this.packagesPrice += (i.count * i.price);
            });
            this.showPackages = true;
        }
        if (this.others.find(function (i) { return i.count > 0; })) {
            var array = this.others.filter(function (i) { return i.count > 0; });
            array.forEach(function (i) {
                _this.countOthers += i.count;
                _this.packagesPrice += (i.count * i.price);
            });
            this.showOthers = true;
        }
        this.showPackageMaterialsOnBooking = this.showBoxes ||
            this.showLocksAndShelves ||
            this.showOthers ||
            this.showPackages;
        this.finalPrice = this.periodPay + this.packagesPrice;
    };
    MainComponent.prototype.onCountPlus = function (item) { item.count++; };
    MainComponent.prototype.onCountMinus = function (item) { item.count--; };
    MainComponent.prototype.bookPackages = function () {
    };
    MainComponent.prototype.closePackageModal = function () {
        if (this.boxes.find(function (i) { return i.count > 0; })) {
            this.boxes = this.boxesEtalon;
        }
        if (this.locksAndShelves.find(function (i) { return i.count > 0; })) {
            this.locksAndShelves = this.locksAndShelvesEtalon;
        }
        if (this.packages.find(function (i) { return i.count > 0; })) {
            this.packages = this.packagesEtalon;
        }
        if (this.others.find(function (i) { return i.count > 0; })) {
            this.others = this.othersEtalon;
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
    MainComponent.prototype.collectBodyForEmail = function () {
        var emailBody = "";
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
            this.boxes.filter(function (i) { return i.count > 0; }).forEach(function (i) {
                emailBody = emailBody.concat("<br>" +
                    i.description.join(" ") + " - " +
                    i.count + " шт //" +
                    i.price + " грн//шт // " +
                    i.count * i.price + " грн");
            });
            this.locksAndShelves.filter(function (i) { return i.count > 0; }).forEach(function (i) {
                emailBody = emailBody.concat("<br>&nbsp;&nbsp;" +
                    i.description.join(" ") + " - " +
                    i.count + " шт / " +
                    i.price + " грн/шт / " +
                    i.count * i.price + " грн");
            });
            this.packages.filter(function (i) { return i.count > 0; }).forEach(function (i) {
                emailBody = emailBody.concat("<br>&nbsp;&nbsp;" +
                    i.description.join(" ") + " - " +
                    i.count + " шт / " +
                    i.price + " грн/шт / " +
                    i.count * i.price + " грн");
            });
            this.others.filter(function (i) { return i.count > 0; }).forEach(function (i) {
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
    };
    MainComponent.prototype.sendMail = function () {
        var url = "https://api.elasticemail.com/v2/email/send";
        var api = "27bf6e11-fe44-45ed-b8c4-e291737221fc";
        var to = "qwertyihor11@gmail.com";
        var from = "boxer.co.ua@gmail.com";
        var subject = "Бронювання боксу (" + Date.now + ")";
        //let bodyHtml = "from angular <br/>";
        var bodyHtml = this.collectBodyForEmail();
        var isTransactional = false;
        debugger;
        url = url.concat("?apikey=" + api);
        url = url.concat("&subject=" + subject);
        url = url.concat("&from=" + from);
        url = url.concat("&to=" + to);
        //url = url.concat("&bodyHTML=" + bodyHtml.toString());
        url = url.concat("&isTransactional=" + isTransactional);
        var data = {
            "bodyHTML": bodyHtml
        };
        this.http.post(url, data, null).subscribe(function (i) { console.log(i); });
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