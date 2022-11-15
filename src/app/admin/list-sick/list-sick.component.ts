import {Component, OnInit} from '@angular/core';
import {SickService} from '../../service/adminservice/sick.service';
import {FormControl} from '@angular/forms';
import { MatDialog, SELECT_ITEM_HEIGHT_EM } from '@angular/material';
import { CreateSickFormComponent } from './create-sick-form/create-sick-form.component';
import { UpdateSickFormComponent } from './update-sick-form/update-sick-form.component';
import { NotifyService } from 'src/app/service/notify.service';

@Component({
  selector: 'app-list-sick',
  templateUrl: './list-sick.component.html',
  styleUrls: ['./list-sick.component.css']
})
export class ListSickComponent implements OnInit {
  listSick;
  listSickOriginal;
  listTypeSick;
  filterSick;
  typeSick: FormControl = new FormControl('Lọc theo loại bệnh');
  p: number;
  constructor(private sickService: SickService,
              public dialog: MatDialog,
              public notify: NotifyService
    ) {
    this.filterSick = 'Lọc theo loại bệnh';
  }

  loadSick() {

    this.sickService.getListSick().subscribe(data => {
      this.listSickOriginal = data;
      console.log(data);
      this.listSick = this.listSickOriginal;
    });
    this.sickService.getListTypeSick().subscribe(data1 => {
      this.listTypeSick = data1;
      console.log(data1);
    });
  }

  ngOnInit() {
    this.loadSick()
  }

  filterTypeSick(idtypesick) {
    console.log(idtypesick);
    if (idtypesick !== 0 && idtypesick != null) {
      this.listSick = this.listSickOriginal.filter(a => a.sicktypeid === idtypesick);
    } else {
      this.listSick = this.listSickOriginal;
    }
  }

  create(){
    const dialogRef = this.dialog.open(CreateSickFormComponent, {
      width: '250px',
      data: this.listTypeSick
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadSick()
    });
  }

  update(item){
    const dialogRef = this.dialog.open(UpdateSickFormComponent, {
      width: '250px',
      data: {
        sick: item,
        sicktypes: this.listTypeSick
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadSick()
    });
  }

  delete(item){
    this.notify.xoaBenh(item.sickid)
  }
}
