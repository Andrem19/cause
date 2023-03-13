import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Map } from 'src/app/models/map';
import { MapServiceService } from 'src/app/services/map-service.service';

@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.page.html',
  styleUrls: ['./map-detail.page.scss'],
})
export class MapDetailPage implements OnInit {
  id!: String;
  map!: any;
  private routeSub!: Subscription;
  constructor(private route: ActivatedRoute, private mapService: MapServiceService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params['id']) //log the value of id
      this.id = params['id']
    });
    this.mapService.getCurrentMap(this.id).subscribe((mapDocs) => {
      console.warn(mapDocs)
      this.map = mapDocs;
    });
    this.mapService.fetchMap();
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
