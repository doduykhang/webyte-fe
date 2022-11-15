import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Medicine } from 'src/app/models/medicine';
import { MedicineServiceService } from 'src/app/service/doctorservice/medicine-service.service';
import { SickServiceService } from 'src/app/service/doctorservice/sick-service.service';
import { PrescriptionService } from '../../../service/doctorservice/prescription.service';
import { Prescription } from '../../models/prescription';




// tslint:disable-next-line:variable-name
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id;
  listSick;
  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, private presService: PrescriptionService, private router: Router, private route: ActivatedRoute, private siskService: SickServiceService, private medicineService: MedicineServiceService) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }
  listPres: Prescription[];
  stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });
  formMedicine: FormGroup = new FormGroup({

    medicine: new FormControl(),
    amount: new FormControl('',[Validators.required, Validators.pattern(/^\d+$/)]),
    dosage: new FormControl(),

  })
  sicks = new FormControl();
  search;
  displayedColumns: string[] = ['position', 'medicine', 'dosage', 'amount'];
  dataSource;
  sickListOrgin = [];
  sickList = [];
  medicineList: Medicine[] = [];
  medicineListOrigin: Medicine[] = [];
  newListMedicine: MedicineBill[]=[];
  @ViewChild('selectList', { static: false }) selectList: ElementRef;
  myDropDown: string;
  stateGroupOptions: Observable<Medicine[]>;
  p: number;
  onChangeofOptions(newGov) {
    console.log(newGov);
  }

  ngOnInit() {
    // tslint:disable-next-line:no-non-null-assertion
    this.presService.getListPrescription().subscribe(data => {
      if (data) {
        this.listPres = data;
        console.log(data);
      }
    });
    this.siskService.getListSick().subscribe(data => {
      this.listSick = data;
      console.log(data);
      this.sickListOrgin = this.listSick;
      this.sickList = this.sickListOrgin;
    })
    this.medicineService.getListMedicine().subscribe(data => {
      this.medicineListOrigin = data;
      this.medicineList = this.medicineListOrigin;
      console.log(data);
    })
    this.dataSource=[];
  }

  filterMedicine(value) {
    let listFilter: Medicine[] = [];
    let search = this.formMedicine.controls.medicine.value;
    console.log(search);
    if (value != "") {
      this.medicineList = this.medicineListOrigin.filter(a => a.medicinename.toLowerCase().includes(search.toLowerCase()));
      console.log(this.medicineList);
    }
    else {
      this.medicineList = this.medicineListOrigin;
    }
  }

  return() {
    console.log(this.stateForm.value);
  }
  filterItem(event) {
    console.log(event);
    if (!event) {
      this.sickList = this.sickListOrgin;
    }
    if (event.key.length <= 1) {

      console.log(this.search);
      this.sickList = this.sickListOrgin.filter(a => a.sickname.toLowerCase()
        .includes(this.search.toLowerCase()));
      console.log('formControl' + this.sicks.value.length);
      if (this.sicks.value.length > 0) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.sicks.value.length; i++) {
          if (!this.sickList.includes(this.sicks.value[i])) {
            this.sickList.push(this.sicks.value[i]);
          }

        }
      }

    } else {
      this.sickList = this.sickListOrgin;
    }
    console.log(this.sickList + typeof event.key);

  }
  addMedicine() {
    let itemMedicine=this.formMedicine.value
    if(itemMedicine!=null){
      this.newListMedicine.push(itemMedicine);

      console.log(this.newListMedicine);
      console.log(this.dataSource);
    }
    this.dataSource=this.newListMedicine;

  }
  remove(item){
    console.log(item);
    this.newListMedicine.splice(item,1);
    console.log("new",this.newListMedicine);
    this.dataSource=this.newListMedicine;
    console.log(this.dataSource)
  }
}
export interface MedicineBill {

  position: number;
  medicine: string;
    amount: number;
    dosage:string;
}

