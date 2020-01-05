import {Component, OnInit} from '@angular/core';
import {Branch, CatalogData, CatalogResponse, LocationData} from './home/home';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from './home/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  catalogResponse: CatalogData;
  selectedLocationIndex: number;

  constructor(private homeService: HomeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.getCatalogData();
  }

  getCatalogData() {
    this.homeService.getCatalogData().subscribe((data: CatalogResponse) => {
      this.catalogResponse = data.data;
      console.log(data.data);
    });
  }

  showCategoriesFromLocation(locationData: LocationData, locationIndex: number) {
    this.router.navigate(['/location', locationIndex]);
  }

  showCategoriesFromBranch(branchData: Branch, locationIndex: number, branchIndex: number) {
    this.router.navigate([`/location/${locationIndex}/branch/${branchIndex}`]);
  }

  goToHome() {
    this.router.navigate(['']);
  }
}
