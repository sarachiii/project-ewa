import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SensorsService {

  constructor(protected http: HttpClient) { }

  postSensorData(postData: any ){
    //This method sends a Http request
    console.log(postData)
    return this.http.post(
      `http://www.sneltec.com/hva/hva.php?gh_id=${postData.ghId}&user_id=${postData.userId}&air_temp_c=${postData.airTemperature}&air_humidity=${postData.airHumidity}&soil_temp_c=${postData.soilTemperature}&soil_humidity=${postData.soilHumidity}&soil_mix_id=${postData.soilMixID}&water_ph=${postData.waterpH}&water_mix_id=${postData.waterMixID}&daily_exposure=${postData.exposure}`,
      postData)

  }

  //This method returns a Http request
   getSensorData(ghId: number | string) {
     return this.http.get(`http://www.sneltec.com/hva/hva.php?gh_id=${ghId}`)

  }

}
