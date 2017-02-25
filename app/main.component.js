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
var MainComponent = (function () {
    function MainComponent() {
        this.val = 0;
        this.minSlide = 0;
        this.maxSlide = 365;
        this.monthPay = 1000;
        this.periodPay = 800;
        this.imgs = [{ 'btnId': '1m_btn', 'imgsrc': '../img/Boxes/1m.png' },
            { 'btnId': '2_5m_btn', 'imgsrc': '../img/Boxes/2,5m.png' },
            { 'btnId': '3m_btn', 'imgsrc': '../img/Boxes/3m.png' },
            { 'btnId': '4m_btn', 'imgsrc': '../img/Boxes/4m.png' },
            { 'btnId': '5m_btn', 'imgsrc': '../img/Boxes/5m.png' },
            { 'btnId': '6m_btn', 'imgsrc': '../img/Boxes/6m.png' },
            { 'btnId': '7m_btn', 'imgsrc': '../img/Boxes/7m.png' },
            { 'btnId': '12m_btn', 'imgsrc': '../img/Boxes/12m.png' }];
    }
    MainComponent.prototype.onBtnSizeClick = function (elem) {
        var id = elem.id;
        var btns = this.boxSizeBtns._results[0].nativeElement.children;
        for (var _i = 0, btns_1 = btns; _i < btns_1.length; _i++) {
            var element = btns_1[_i];
            if (element.classList.contains('active_btn')) {
                element.classList.remove('active_btn');
            }
        }
        debugger;
        btns.find(function (e) { return e.id === id; }).classList.add('active_btn');
        this.boxImgSrcFull = this.imgs.find(function (x) { return x.btnId === id; }).imgsrc;
        this.isBtnActive = !this.isBtnActive;
    };
    MainComponent.prototype.ngOnInit = function () {
        this.boxImgSrcFull = this.imgs[0].imgsrc;
    };
    MainComponent.prototype.changeMonthPrice = function () { };
    MainComponent.prototype.changePeriodPrice = function () { };
    __decorate([
        core_1.ViewChildren('sizeBtns'), 
        __metadata('design:type', core_1.ElementRef)
    ], MainComponent.prototype, "boxSizeBtns", void 0);
    MainComponent = __decorate([
        core_2.Component({
            moduleId: module.id,
            selector: 'landing',
            templateUrl: '../content.html'
        }), 
        __metadata('design:paramtypes', [])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map