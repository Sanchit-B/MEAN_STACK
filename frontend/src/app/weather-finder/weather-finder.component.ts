import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


interface CityWeather {
  name: string;
  weather: string;
  status: string[];
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: CityWeather[];
}

@Component({
  selector: 'weather-finder',
  templateUrl: './weather-finder.component.html',
  styleUrls: ['./weather-finder.component.css']
})
export class WeatherFinderComponent implements OnInit {

  city;
  cityDetails;
  noresponse = false;
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
  }

  fetchData() {
    let url = `https://jsonmock.hackerrank.com/api/weather?name=${this.city}`
    this.httpClient.get(url).subscribe((res:any) => {
      console.log(res.data[0]);
      if(res.data.length) {
        this.noresponse = false;
        this.cityDetails = res.data[0];
      } else {
        this.cityDetails = "";
        this.noresponse = true;
      }
    });
  }

}
