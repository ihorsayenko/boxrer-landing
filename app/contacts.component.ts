import { Component, OnInit, OnChanges } from '@angular/core';
declare var google: any;


@Component({
    moduleId: module.id,
    selector: 'contacts',
    templateUrl: '../contacts.html'
})

export class ContactsComponent implements OnInit {

    ngOnInit(): void {
        this.initGoogleMap();
    }

    initGoogleMap(): void {
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;

        let boxerCoordinates = { lat: 49.813583, lng: 24.056690 }

        var map = new google.maps.Map(document.getElementById('map'), {
            scaleControl: true,
            zoom: 17,
            center: boxerCoordinates
        });

        var infowindow = new google.maps.InfoWindow;
        infowindow.setContent('Boxer')

        directionsDisplay.setMap(map);

        var marker = new google.maps.Marker({
            map: map,
            icon: '../img/logo_boxer.png',
            position: boxerCoordinates
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });

    }

}