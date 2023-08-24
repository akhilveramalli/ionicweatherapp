import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EChartsOption } from 'echarts';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  // forecastData: any;
  forecastData={"location":{"name":"Yedira","region":"Andhra Pradesh","country":"India","lat":17,"lon":78,"tz_id":"Asia/Kolkata","localtime_epoch":1692865628,"localtime":"2023-08-24 13:57"},"current":{"last_updated_epoch":1692864900,"last_updated":"2023-08-24 13:45","temp_c":31,"temp_f":87.8,"is_day":1,"condition":{"text":"Partly cloudy","icon":"//cdn.weatherapi.com/weather/64x64/day/116.png","code":1003},"wind_mph":11.9,"wind_kph":19.1,"wind_degree":280,"wind_dir":"W","pressure_mb":1009,"pressure_in":29.8,"precip_mm":0.1,"precip_in":0,"humidity":55,"cloud":50,"feelslike_c":33.1,"feelslike_f":91.7,"vis_km":6,"vis_miles":3,"uv":7,"gust_mph":14.3,"gust_kph":23,"air_quality":{"co":207,"no2":1.9,"o3":26.8,"so2":0.6,"pm2_5":1.2,"pm10":2,"us-epa-index":1,"gb-defra-index":1}},"forecast": {"forecastday":[]}}

  option: EChartsOption = {}

  constructor(protected http: HttpClient) {}


  ngOnInit(): void {
    this.http.get("http://api.weatherapi.com/v1/forecast.json?key=9a4715b2fdc64f718f9105319231508&q=17.47,78.57&days=7&aqi=no&alerts=no")
.subscribe((data: any) => {
  console.log(JSON.stringify(data))
  this.forecastData=data
  this.renderChart();
},
  (  error: any) => {
    console.log(error);
  });
  }

  ionViewWilEnter(){
    this.http.get("http://api.weatherapi.com/v1/forecast.json?key=9a4715b2fdc64f718f9105319231508&q=17.47,78.57&days=7&aqi=no&alerts=no")
.subscribe((data: any) => {
  console.log(JSON.stringify(data))
  this.forecastData=data
  this.renderChart();
},
  (  error: any) => {
    console.log(error);
  });
  }

  renderChart() {
    // const chart = echarts.init(document.getElementById('weatherChart'));
    const forecastDays = this.forecastData.forecast.forecastday;
    const xAxisData: string[] = [];
  const temperatureData: number[] = [];
  const windspeedData: number[] = [];
  // Iterate through each forecastday and accumulate data
  forecastDays.forEach((day: any) => {
    const dayXAxisData = day.hour.map((hour: any) => hour.time);
    const dayTemperatureData = day.hour.map((hour: any) => hour.temp_c);
    const dayWindSpeedData = day.hour.map((hour: any) => hour.wind_kph);

    // Concatenate the arrays for all days
    xAxisData.push(...dayXAxisData);
    temperatureData.push(...dayTemperatureData);
    windspeedData.push(...dayWindSpeedData)
  });

    // const xAxisData = this.forecastData.forecast.forecastday[0].hour.map((hour: { time: any; }) => hour.time);
    // const temperatureData = this.forecastData.forecast.forecastday[0].hour.map((hour: { temp_c: any; }) => hour.temp_c);
    // const windspeedData = this.forecastData.forecast.forecastday[0].hour.map((hour: { wind_kph: any; }) => hour.wind_kph);
    // wind_kph;
    this.option = {
      // title: {
      //   text: 'Hourly Temperature Forecast'
      // },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis',
        position: 'right',
        axisPointer: {
          type: 'shadow'
        }
      },
      toolbox: {  
        show: true,
        // orient: 'vertical',
        // left: 'right',
        // top: 'center',
        // feature: {
        //   mark: { show: true },
        //   dataView: { show: true, readOnly: false },
        //   magicType: { show: true, type: ['line', 'bar', 'stack'] },
        //   restore: { show: true },
        //   saveAsImage: { show: true }
        // }
      },
      legend:{data:["Temperature", "Wind Speed"]},
      series: [
        {
          name: "Temperature",
          data: temperatureData,
          type: 'line',
          smooth: true
        },
        {
          name: "Wind Speed",
          data: windspeedData,
          type: 'line',
          smooth: true
        }
      ]
    };

    // chart.setOption(this.option);
  }

}
