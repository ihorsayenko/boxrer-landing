import { Component, OnInit } from '@angular/core';
import { CommonModal } from './common.model'

@Component({
    moduleId: module.id,
    selector: 'qiestion-answer',
    template: ``
})

export class QuestionAnswerComponnent implements OnInit{
     
     constructor(private storage: CommonService) {
    }
    
    
    ngOnInit(): void {
        this.storage.getData().then(item => this.initVariables(item));
        debugger;
    }

    initVariables(item: CommonModal){

    }
}