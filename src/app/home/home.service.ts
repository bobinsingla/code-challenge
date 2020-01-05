import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CatalogResponse} from './home';

@Injectable()
export class HomeService {

  private catalogUrl;

  constructor(private http: HttpClient) {
    this.catalogUrl = 'assets/catalog.json';
  }

  getCatalogData(): Observable<CatalogResponse> {
    return this.http.get<CatalogResponse>(this.catalogUrl);
  }
}
