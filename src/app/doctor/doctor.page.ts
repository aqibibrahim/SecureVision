import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CrudService } from './../crud.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  students: any;
  doctorName: string;
  pmdc: any;
  cell: string;
  donor_latitude:any;
  donor_longitude:any;
  endto:any;
  gender:any;
  constructor(private crudService: CrudService,private geolocation: Geolocation,private router: Router) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.donor_latitude =  resp.coords.latitude
      this.donor_longitude =  resp.coords.longitude
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }
  CreateRecord() {
    let record = {};
    record['Name'] = this.doctorName;
    record['PMDC'] = this.pmdc;
    record['Cell'] = this.cell;
    record['Latitude'] = this.donor_latitude;
    record['Longitude'] = this.donor_longitude;
    record['Endto'] = this.endto;
    record['Gender'] = this.gender;
    this.crudService.create_NewDoctor(record).then(resp => {
      this.doctorName = "";
      this.pmdc = "";
      this.cell = "";
      this.endto = "";
      this.donor_latitude = "";
      this.donor_longitude = "";
      this.gender = "";
      console.log(resp);
      this.router.navigateByUrl('/home');
    })
      .catch(error => {
        console.log(error);
      });


  }
}
