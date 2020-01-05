import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {Branch, CatalogData, CatalogResponse, Category, LocationData, SubCategory} from './home';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  catalogResponse: CatalogData;
  categories: Category[];
  subCategories: SubCategory[];
  selectedCategory: string;
  showWelcomeScreen: boolean;
  locationId: number;
  branchId: number;

  constructor(private homeService: HomeService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: ParamMap) => {
      this.branchId = params['branchId'];
      this.locationId = params['locationId'];
      this.getCatalogData();
    });
  }

  getCatalogData() {
    this.homeService.getCatalogData().subscribe((data: CatalogResponse) => {
      this.catalogResponse = data.data;
      this.showCategories();
    });
  }

  showCategories() {
    if (this.branchId >= 0 && this.locationId >= 0) {
      this.showWelcomeScreen = false;
      this.showBranchCategories(this.locationId, this.branchId);
    } else if (!this.branchId && this.branchId !== 0 && this.locationId >= 0) {
      this.showWelcomeScreen = false;
      this.showLocationCategories(this.locationId);
    } else {
      this.showWelcomeScreen = true;
    }
  }

  showLocationCategories(locationId: number) {
    this.subCategories = [];
    this.categories = [];
    let duplicateCategoryIndex;
    this.catalogResponse.locations[locationId].branches.forEach((branch: Branch) => {
      branch.categories.forEach((category) => {
        console.log(this.categories, category);
        duplicateCategoryIndex = this.categories.findIndex(i => i.name === category.name);
        if (duplicateCategoryIndex === -1) {
          this.categories.push(category);
        }
      });
    });
    console.log(this.categories);
  }

  showBranchCategories(locationId: number, branchId: number) {
    this.subCategories = [];
    this.categories = this.catalogResponse.locations[locationId].branches[branchId].categories;
  }

  showSubCategories(category: Category) {
    this.categories = [];
    this.selectedCategory = category.name;
    this.subCategories = category.subcategories;
  }

  goToPreviousScreen() {
    this.showCategories();
  }
}
