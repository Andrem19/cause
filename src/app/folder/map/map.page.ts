import { Component, OnInit } from '@angular/core';
import { MapServiceService } from 'src/app/services/map-service.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  maps: any;
  constructor(private mapService: MapServiceService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.mapService.getCurrentTables().subscribe((mapDocs) => {
      console.warn(mapDocs)
      this.maps = mapDocs;
    });
    this.mapService.fetchMaps();
  }
}
