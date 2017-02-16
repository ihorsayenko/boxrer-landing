import { Component, OnInit } from '@angular/core';
import { CommonModal } from './common.model';
import { CommonService } from './common.service';

@Component({
    moduleId: module.id,
    selector: 'qiestion-answer',
    templateUrl: '../question-answer.html'
})

export class QuestionAnswerComponnent implements OnInit {

    Items: any[];
    isOpen: Boolean = false;
    openItemId: Number;
    constructor(private storage: CommonService) {
    }

    ngOnInit(): void {
        this.storage.getData().then(item => this.Items = item.QuestionItems as any);
    }

    toggle(id: Number): void{
        this.openItemId = id;
        this.isOpen = !this.isOpen;
    }
}