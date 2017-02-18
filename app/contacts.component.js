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
var ContactsComponent = (function () {
    function ContactsComponent() {
    }
    ContactsComponent.prototype.ngOnInit = function () {
        this.initGoogleMap();
    };
    ContactsComponent.prototype.initGoogleMap = function () {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var boxerCoordinates = { lat: 49.813583, lng: 24.056690 };
        var map = new google.maps.Map(document.getElementById('map'), {
            scaleControl: true,
            zoom: 17,
            center: boxerCoordinates
        });
        var infowindow = new google.maps.InfoWindow;
        infowindow.setContent('Boxer');
        directionsDisplay.setMap(map);
        var marker = new google.maps.Marker({
            map: map,
            icon: '../img/logo_boxer.png',
            position: boxerCoordinates
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    };
    ContactsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'contacts',
            templateUrl: '../contacts.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ContactsComponent);
    return ContactsComponent;
}());
exports.ContactsComponent = ContactsComponent;
//# sourceMappingURL=contacts.component.js.map