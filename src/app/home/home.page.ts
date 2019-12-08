import { Component, OnInit } from '@angular/core';
 
import { CrudService } from './../crud.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
// import undefined = require('firebase/empty-import');
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;
  bloodgroup: any;
  conveyence: string;
  donor_latitude:any;
  donor_longitude:any;
  mobile:number;
   data: any;
   doctorName: string;
  pmdc: any;
  cell: string;
  endto:any;
  gender:any;
  //  locations = [];
   public attendance: any[]
   public locations: any[]
  constructor(private crudService: CrudService,private geolocation: Geolocation,private socialSharing: SocialSharing) { 
    this.geolocation.getCurrentPosition().then((resp) => {
    this.donor_latitude =  resp.coords.latitude
    this.donor_longitude =  resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });}
    sendlocation(number){

    }
  ngOnInit() {
    this.socialSharing.shareViaWhatsApp('Hy', 'Its a Message', '').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
    // this.geolocation.getCurrentPosition().then((resp) => {
    //  this.donor_latitude =  resp.coords.latitude
    //  this.donor_longitude =  resp.coords.longitude
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
     
    this.crudService.read_Students().subscribe(data => {
      console.log(data);
      this.students = data.map(e => {
        //this.locations.push(e.payload.doc.data()['Latitude'],e.payload.doc.data()['Longitude'])
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          // Age: e.payload.doc.data()['Age'],
          // Address: e.payload.doc.data()['Address'],
          PMDC: e.payload.doc.data()['PMDC'],
          Cell:e.payload.doc.data()['Cell'],
          // Mobile:e.payload.doc.data()['Mobile'],
          Latitude:e.payload.doc.data()['Latitude'],
          Longitude:e.payload.doc.data()['Longitude']
          
        };
        
      })
    //console.log(this.locations);
      console.log(this.students.length);
      for(var i=0;i<this.students.length;i++)
      {
        if(this.students[i].Latitude == undefined){
          console.log("No value here")
            }
            else{
                  this.locations = this.students;
                  this.attendance = this.students
                .map(student => ({
                  Latitude: student.Latitude,
                  Longitude: student.Longitude,
                  name:student.Name,
                  pmdc:student.PMDC,
                  cell:student.Cell,
                  // conveyence:student.Conveyence,
                  // address:student.Address,
                  
                }));
              console.log('attendance', this.attendance);
              this.data = this.applyHaversine(this.attendance);
              this.data.sort((locationA, locationB) => {
                return locationA.distance - locationB.distance;
            });

            //resolve(this.data);
            }
        
        
        //
      }
       
 

    });
    
  
  }
  applyHaversine(locations){

    let usersLocation = {
        lat: this.donor_latitude, 
        lng: this.donor_longitude
    };

    locations.map((location) => {

        let placeLocation = {
            lat: location.Latitude,
            lng: location.Longitude
        };

        location.distance = this.getDistanceBetweenPoints(
            usersLocation,
            placeLocation,
            'miles'
        ).toFixed(2);
    });

    return locations;
}

getDistanceBetweenPoints(start, end, units){

    let earthRadius = {
        miles: 3958.8,
        km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

}

toRad(x){
    return x * Math.PI / 180;
}
 
  CreateRecord() {
    let record = {};
    record['Name'] = this.studentName;
    record['Age'] = this.studentAge;
    record['Address'] = this.studentAddress;
    record['BloodGroup'] = this.bloodgroup;
    record['Conveyence'] = this.conveyence;
    record['Latitude'] = this.donor_latitude;
    record['Longitude'] = this.donor_longitude;
    record['Mobile'] = this.mobile;
    this.crudService.create_NewStudent(record).then(resp => {
      this.studentName = "";
      this.studentAge = undefined;
      this.studentAddress = "";
      this.bloodgroup = "";
      this.conveyence = "";
      this.donor_latitude = "";
      this.donor_longitude = "";
      this.mobile = undefined;
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
 
  RemoveRecord(rowID) {
    this.crudService.delete_Student(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;

  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Age'] = recordRow.EditAge;
    record['Address'] = recordRow.EditAddress;
    this.crudService.update_Student(recordRow.id, record);
    recordRow.isEdit = false;
  }
 
 
}