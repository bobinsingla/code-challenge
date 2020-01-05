import {TestBed} from '@angular/core/testing';

import {HomeService} from './home.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('HomeService', () => {
  let httpTestingController: HttpTestingController;
  let homeService: HomeService;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        HomeService,
      ]
    });
    homeService = TestBed.get(HomeService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: HomeService = TestBed.get(HomeService);
    expect(service).toBeTruthy();
  });
  it('be able to make get call for CatalogData successfully', (() => {
    homeService.getCatalogData().subscribe(data => {
      expect(data.data).toEqual({
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
      });
    });
    const req = httpTestingController.expectOne('assets/catalog.json');
    req.flush(catalogData);
  }));
});
