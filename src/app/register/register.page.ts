import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CrudService } from './../crud.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
  AdMobFreeRewardVideoConfig
} from '@ionic-native/admob-free/ngx';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;
  bloodgroup: any;
  conveyence: string;
  donor_latitude:any;
  donor_longitude:any;
  mobile:number;
  interstitialConfig: AdMobFreeInterstitialConfig = {
    // add your config here
    // for the sake of this example we will just use the test config
    isTesting: true,
    autoShow: false,
    id: "ca-app-pub-2386203112468615/7401267087"
  };
  constructor(private crudService: CrudService,private geolocation: Geolocation,private router: Router,private admobFree: AdMobFree,
    public platform: Platform) {

      // platform.ready().then(() => {

      //   // Load ad configuration
      //   this.admobFree.interstitial.config(this.interstitialConfig);
      //   //Prepare Ad to Show
      //   this.admobFree.interstitial.prepare()
      //     .then(() => {
      //       // alert(1);
      //     }).catch(e => alert(e));
  
  
      //   // Load ad configuration
        
  
      // });
  
      // //Handle interstitial's close event to Prepare Ad again
      // this.admobFree.on('admob.interstitial.events.CLOSE').subscribe(() => {
      //   this.admobFree.interstitial.prepare()
      //     .then(() => {
      //       alert("Interstitial CLOSE");
      //     }).catch(e => alert(e));
      // });
      // //Handle Reward's close event to Prepare Ad again
     
     }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.donor_latitude =  resp.coords.latitude
      this.donor_longitude =  resp.coords.longitude
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      // this.BannerAd();
      // this.InterstitialAd();
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
      this.router.navigateByUrl('/home');
    })
      .catch(error => {
        console.log(error);
      });


  }
  BannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: true, // Remove in production
      autoShow: true,
      id: "ca-app-pub-2386203112468615/3270450382"
    };
    this.admobFree.banner.config(bannerConfig);
 
    this.admobFree.banner.prepare().then(() => {
      // success
    }).catch(e => alert(e));
  }
 
  InterstitialAd() {
    //Check if Ad is loaded
    this.admobFree.interstitial.isReady().then(() => {
      //Will show prepared Ad
      this.admobFree.interstitial.show().then(() => {
      })
        .catch(e => alert("show " + e));
    })
      .catch(e => alert("isReady " + e));
  }
 
}
