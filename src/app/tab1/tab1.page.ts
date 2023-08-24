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
  weatherData={"location":{"name":"Yedira","region":"Andhra Pradesh","country":"India","lat":17,"lon":78,"tz_id":"Asia/Kolkata","localtime_epoch":1692865628,"localtime":"2023-08-24 13:57"},"current":{"last_updated_epoch":1692864900,"last_updated":"2023-08-24 13:45","temp_c":31,"temp_f":87.8,"is_day":1,"condition":{"text":"Partly cloudy","icon":"//cdn.weatherapi.com/weather/64x64/day/116.png","code":1003},"wind_mph":11.9,"wind_kph":19.1,"wind_degree":280,"wind_dir":"W","pressure_mb":1009,"pressure_in":29.8,"precip_mm":0.1,"precip_in":0,"humidity":55,"cloud":50,"feelslike_c":33.1,"feelslike_f":91.7,"vis_km":6,"vis_miles":3,"uv":7,"gust_mph":14.3,"gust_kph":23,"air_quality":{"co":207,"no2":1.9,"o3":26.8,"so2":0.6,"pm2_5":1.2,"pm10":2,"us-epa-index":1,"gb-defra-index":1}}}

  constructor(protected http: HttpClient) {}

ngOnInit (){
  // console.log('hi')
this.weather()
}

weather(){
this.http.get("https://api.weatherapi.com/v1/current.json?key=9a4715b2fdc64f718f9105319231508&q=17.47,78.57&aqi=yes")
.subscribe((data: any) => {
  console.log(JSON.stringify(data))
  this.weatherData=data
},
  (  error: any) => {
    console.log(error);
  });
}
}
