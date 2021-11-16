import {Component, OnInit} from '@angular/core';
import {Factor, Sensor, ValueType} from "../../../models/sensor";
import {HttpClient} from "@angular/common/http";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  alert:boolean=false
  sensors: Array<Sensor>;

  constructor(private http: HttpClient, private service: NotificationsService) {
    this.sensors = Sensor.generateSensors();
  }

 onSuccess(message) {
    this.service.success("Success", message, {
      position: ['bottom', 'left'],
      timeOut: 4000,
      animate: 'fade',
      showProgressBar: true
    });
 }

  ngOnInit(): void {
    this.onCreatePost("test");
    this.getPosts();
  }

  onCreatePost(postData: string){
    //This method sends a Http request
    console.log(postData)
    this.http.post(
      "http://www.sneltec.com/hva/hva.php" ,
      postData)
      .subscribe(responseData =>
      console.log(responseData))
  };

  decrementValue(sensor: Sensor): void {
    if (!isNaN(<number>sensor.value) && !isNaN(parseFloat(<string>sensor.value))){
      sensor.value = parseFloat(<string>sensor.value);
      if (sensor.value >= sensor.numberRange[0] + 1 && sensor.value <= sensor.numberRange[1]) sensor.value--;
    }
  }

  incrementValue(sensor: Sensor): void {
    if (!isNaN(<number>sensor.value) && !isNaN(parseFloat(<string>sensor.value))){
      sensor.value = parseFloat(<string>sensor.value);
      if (sensor.value >= sensor.numberRange[0] && sensor.value <= sensor.numberRange[1] - 1) sensor.value++;
    }
    this.alert=true
    // this.sensors.reset({})
  }



  private getPosts() {
    this.http.get("http://www.sneltec.com/hva/hva.php?gh_id=4").subscribe(posts => {
      console.log(posts);
    })
  }

}
