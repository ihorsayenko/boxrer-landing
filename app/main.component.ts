import { NgModule, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'landing',
    templateUrl: '../content.html'
})

export class MainComponent implements OnInit {
    daysCount: Number = 0;
    minSlide: Number = 0;
    maxSlide: Number = 365;

    monthPay: number = 0;
    periodPay: number = 0;
    boxSize: Number = 0;

    dateFrom: Date;

    boxImgSrcFull: string;

    Name: String;
    surname: String;
    mobileNumber: String;
    email: String;
    comments: String;

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

    ngOnInit() {
        this.boxImgSrcFull = this.imgs[0].imgsrc;
    }

    calculatePrice(): void{
        if(this.boxSize && this.daysCount){

        }
    }
}
