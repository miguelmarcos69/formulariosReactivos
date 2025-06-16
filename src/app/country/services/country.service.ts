import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interface/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  http = inject(HttpClient);

  private baseUrl = 'https://restcountries.com/v3.1';
  private _regions = ['Africa', 'Americas', 'Asia', 'Europa', 'Oceania'];
  // funcion para que si se mofifica la region, solo se hace en la respuesta de regions(), no el array _regions
  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);
    console.log({ region });
    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }

  getCountyByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountryNamesByCodeArray(countryCode: string[]): Observable<Country[]> {
    if (!countryCode || countryCode.length == 0) return of([]);

    const countryRequest: Observable<Country>[] = [];

    countryCode.forEach((code) => {
      const request = this.getCountyByAlphaCode(code);
      countryRequest.push(request);
    });

    return combineLatest(countryRequest);
  }
}
