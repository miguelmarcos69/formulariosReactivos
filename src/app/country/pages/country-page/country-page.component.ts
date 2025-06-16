import { Country } from './../../interface/country.interface';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  fb = inject(FormBuilder);

  countryService = inject(CountryService);
  regions = signal(this.countryService.regions);
  countryByRegions = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  /*  onFormChanged = effect((onCleanup) => {
    console.log('Efecto ejecutado');

    const regionSubscription = this.onRegionChange();
    const countrySubscription = this.onCountryChange();
    onCleanup(() => {
      regionSubscription?.unsubscribe();
      countrySubscription?.unsubscribe();
    });
  });
 */

  ngOnInit() {


    this.myForm.get('region')!.setValue(this.regions()[0])

    this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap((resp) => console.log(resp)),
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countryByRegions.set([]);
        }),
        switchMap((region) =>
          this.countryService.getCountriesByRegion(region ?? '')
        ),
        tap((countries) => this.countryByRegions.set(countries)),
        tap((countries) => this.myForm
      .get('country')!.setValue(countries[0].cca3))
      )
      .subscribe();

    this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap(() => this.myForm.get('border')?.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((country) =>
          this.countryService.getCountyByAlphaCode(country ?? '')
        ),
        switchMap((country) =>
          this.countryService.getCountryNamesByCodeArray(country.borders ?? '')
        ),
        tap((borders) => this.borders.set(borders))
      )
      .subscribe((countryBorderes) => {
        console.log(countryBorderes);
      });
  }
  /*   onRegionChange() {
    return this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap((resp) => console.log(resp)),
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countryByRegions.set([]);
        }),
        switchMap((region) =>
          this.countryService.getCountriesByRegion(region ?? '')
        ),
        tap((countries) => this.countryByRegions.set(countries))
      )
      .subscribe();
  } */

  /* onCountryChange() {
    return this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap(() => this.myForm.get('border')?.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((country) =>
          this.countryService.getCountyByAlphaCode(country ?? '')
        ),
        switchMap((country) =>
          this.countryService.getCountryNamesByCodeArray(country.borders ?? '')
        ),
        tap((borders) => this.borders.set(borders))
      )
      .subscribe((countryBorderes) => {
        console.log(countryBorderes);
      });
  } */
}
