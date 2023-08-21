import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  weatherData:any;

  constructor(protected http: HttpClient) {}

ngOnInit (){
  // console.log('hi')
this.weather()
}

weather(){
this.http.get("https://api.weatherapi.com/v1/current.json?key=9a4715b2fdc64f718f9105319231508&q=17,78&aqi=yes")
.subscribe((data: any) => {
  console.log(JSON.stringify(data))
  this.weatherData=data
},
  (  error: any) => {
    console.log(error);
  });
}
}
