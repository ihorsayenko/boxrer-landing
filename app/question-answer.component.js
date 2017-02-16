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
var common_service_1 = require('./common.service');
var QuestionAnswerComponnent = (function () {
    function QuestionAnswerComponnent(storage) {
        this.storage = storage;
    }
    QuestionAnswerComponnent.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.getData().then(function (item) { return _this.Items = item.QuestionItems; });
    };
    QuestionAnswerComponnent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'qiestion-answer',
            templateUrl: '../question-answer.html'
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService])
    ], QuestionAnswerComponnent);
    return QuestionAnswerComponnent;
}());
exports.QuestionAnswerComponnent = QuestionAnswerComponnent;
//# sourceMappingURL=question-answer.component.js.map