import { Component, OnInit } from '@angular/core';

import { SchoolService } from '../services/index';
import { Search } from '../models/search.model';

@Component({
  selector: 'app-search-school',
  templateUrl: './search-school.component.html',
  styleUrls: ['./search-school.component.css']
})
export class SearchSchoolComponent implements OnInit {

  state: string;
  cities: Array<Object>;
  search: Search;
  schools: Array<Object>;

  constructor(
    private schoolService: SchoolService,
  ) { }

  ngOnInit() {
    this.state = '';
    this.cities = new Array<Object>();
    this.schools = new Array<Object>();
    this.search = new Search();
  }


  searchSchool(): void {
    this.search.state = this.state;
    this.search.situation = '1';

    this.schoolService.searchSchool(this.search)
      .subscribe(
          result => {
            this.schools = this.filterSchools(result);
          },
          error => {
            alert(error);
            console.error(error);
      });
  }

  filterSchools(result: Array<Object>): Array<Object> {
    const res = [];

    result.forEach(subitem => {
      res.push(subitem);
    });

    console.log('Resultado da busca: ', res[1]);
    return res[1];
  }

  searchCity(): void {
    this.schoolService.searchCity(this.state)
      .subscribe(
          result => {
            this.cities = this.cityPush(result);
            console.log(this.cities);
          },
          error => {
            alert(error);
            console.error(error);
      });
  }

  cityPush(result: Array<Object>): Array<Object> {
    console.log(result);

    const cities = [];

    result.forEach(subitem => {
      const untreated = JSON.stringify(subitem);
      const city = this.cityFilter(untreated);
      cities.push(city);
    });

    return cities;
  }

  cityFilter(untreated: string): Object {
    const city = {
      name: <string> null,
      code: <string> null
    };
    city.name = untreated;
    console.log(city.name);
    const quote = /\"/g;
    const colon = /:/;
    const letters = /[\d:-]+/g;
    const numbers = /:[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;

    // console.log('antes: '+ this.city.name);

    const removeQuote = city.name.replace(quote, '');
    city.name = removeQuote.replace(letters, '');
    city.code = removeQuote.replace(numbers, '');

    // console.log('codigo: '+ this.city.code);
    // console.log('nome: '+ this.city.name);
    console.log(city);
    return city;
  }

  // collapsed = true;
  // toggleCollapsed(): void {
  //   this.collapsed = !this.collapsed;
  // }
}
