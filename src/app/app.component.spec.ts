import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HomeService} from './home/home.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';

describe('App component should', () => {

  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
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
      declarations: [AppComponent],
      providers: [HomeService]
    })
      .compileComponents(); // compile template and css
  }));

  beforeEach((() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    homeService = TestBed.get(HomeService);
  }));

  it('be defined', () => expect(appComponent).toBeDefined());

  it('be able to fetch catalog data', (() => {
    spyOn(homeService, 'getCatalogData').and.returnValue(of(catalogData));
    appComponent.ngOnInit();
    expect(appComponent.catalogResponse).toEqual(catalogData.data);
  }));

});
