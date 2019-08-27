import {Component, Input, OnInit} from '@angular/core';
import {Holiday} from '../holiday.model';
import {HolidayService} from '../holiday.service';
import {DataStorageService} from '../../shared/data-storage.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent implements OnInit {

  listOfHolidays: Holiday[]=[];
  imageBlobUrl: any;
  isImageLoading: boolean;

  constructor(private holidayService: HolidayService, private route: ActivatedRoute, private dataStorageService: DataStorageService,private router: Router,) {
    this.listOfHolidays= this.holidayService.convertDataFromAPI(this.route.snapshot.data['holidaysList']);
  }

  ngOnInit() {

console.log("ONINIT");
    this.holidayService.listOfHolidaysChanged
      .subscribe(
        (listOfHolidays: Holiday[])=>{
          this.listOfHolidays=listOfHolidays;
        }
      );

//     this.holidayService.requestDataFromMultipleSources(this.listOfHolidays).subscribe(responseList => {
//       // this.responseData1 = responseList[0];
//       // this.responseData2 = responseList[1];
//       // this.responseData3 = responseList[1];
//
//       let list = [];
//       for( let value of responseList) {
// // console.log(value instanceof Blob);
//         this.createImageFromBlob(value);
//         if (this.imageBlobUrl === undefined) {
//           setTimeout(() => {
//             list.push(this.imageBlobUrl)
//           }, 500);
//         }
//       }
//
//       console.log("+++++++++++++++++");
//       console.log(list);
//
//     });
    // this.holidayService.getListOfHolidays()
    //   .subscribe(data => {
    //   this.listOfHolidays=this.holidayService.convertDataFromAPI(data);
    // });

  }

  // createImageFromBlob(image: Blob) {
  //   let reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     this.imageBlobUrl = reader.result;
  //   }, false);
  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  // }

  getListOfUniqueCountriesForHolidays(): Holiday[]{
    // console.log("0 Unigue");
    // console.log(this.listOfHolidays);
    return this.holidayService.getListOfUniqueCountriesForHolidays(this.listOfHolidays);
  }

  redirectToAddHoliday(){
    this.router.navigate(['/holiday/add']);
  }

}
