import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country-interface';
@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
    `img {
      width: 150px
    }`
  ]
})
export class CountryPageComponent implements OnInit{

  public country?: Country;
  public translations: string[] = []

  constructor (
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.countriesService.searchByAlphaCode(id) )
        )
        .subscribe( country => {
          if (!country) return this.router.navigateByUrl('')
          this.translations = Object.keys(country.translations)
          return this.country = country
        })
  }


}
