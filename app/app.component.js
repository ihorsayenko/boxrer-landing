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
var http_1 = require('@angular/http');
var common_service_1 = require('./common.service');
var AppComponent = (function () {
    function AppComponent(storage, http) {
        this.storage = storage;
        this.http = http;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.getData().then(function (item) { return _this.initVariables(item); });
    };
    AppComponent.prototype.initVariables = function (item) {
        this.humidity = item.Humidity;
        this.temperature = item.Temprature;
    };
    AppComponent.prototype.navigateToSection = function (e, id) {
        e.preventDefault();
        window.scrollTo(0, document.getElementById(id).offsetTop);
    };
    AppComponent.prototype.contactUs = function (event) {
        debugger;
        var url = "https://api.elasticemail.com/v2/email/send";
        var api = "27bf6e11-fe44-45ed-b8c4-e291737221fc";
        var to = "qwertyihor11@gmail.com";
        var from = "boxer.co.ua@gmail.com";
        var subject = "Бронювання боксу (" + Date.now + ")";
        var emailBody = "";
        var isTransactional = true;
        emailBody = emailBody.concat("Ім'я:  <b>" + this.name + "</b>");
        emailBody = emailBody.concat("<br>Прізвище:  <b>" + this.surname + "</b>");
        emailBody = emailBody.concat("<br>Телефон:  <b>" + this.mobileNumber + "</b>");
        emailBody = emailBody.concat("<br>Email:  <b>" + this.email + "</b>");
        emailBody = emailBody.concat("<br>Коментар:  <b>" + this.comments + "</b>");
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = new http_1.URLSearchParams();
        body.append('apiKey', api);
        body.append('subject', subject);
        body.append('from', from);
        body.append('to', to);
        body.append('bodyHTML', emailBody);
        body.append('isTransactional', 'false');
        this.http.post(url, body, headers).subscribe(function (i) { console.log(i); });
        return true;
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: '../landing.html',
            providers: [common_service_1.CommonService]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService, http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map