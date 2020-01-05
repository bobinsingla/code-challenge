import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule, MatToolbarModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {HomeService} from './home.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeService: HomeService;
  const mockActivatedRoute = {
    params: of({
      'locationId': '0',
      'branchId': '0'
    })
  };

  const catalogData = {
    data: {
      locations: [{
        dealers_id: 'EDIL',
        opco: 'EDIL',
        name: 'ILLINOIS',
        branches: [{
          branch_id: 'BUR',
          name: 'Burr Ridge',
          categories: [{
            name: 'Scissor Lifts',
            image: 'scissor_lifts.png',
            subcategories: [{
              name: 'Slab',
              image: 'scissor_lift_slab.png'
            }]
          }]
        }]
      }]
    },
    status: 'success'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        HttpClientModule
      ],
      declarations: [HomeComponent],
      providers: [
        HomeService,
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ]
    })
      .compileComponents(); // compile template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    homeService = TestBed.get(HomeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('be able to fetch catalog data', (() => {
    spyOn(homeService, 'getCatalogData').and.returnValue(of(catalogData));
    component.ngOnInit();
    expect(component.catalogResponse).toEqual(catalogData.data);
    expect(component.categories).toEqual([{
      name: 'Scissor Lifts',
      image: 'scissor_lifts.png',
      subcategories: [{
        name: 'Slab',
        image: 'scissor_lift_slab.png'
      }]
    }]);
  }));

});
