import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-updatemodal',
  templateUrl: './updatemodal.component.html',
  styleUrls: ['./updatemodal.component.scss'],
})
export class UpdatemodalComponent implements OnInit {
  dataVal: any;

  groupModel: any = {
    btnText: '',
    id: '',
    description: '',
    priority: '',
    status: '',
  };
  btnText: string = '';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.dataVal = this.config.data;
    if (this.config.header === 'Add') {
      console.log('Add');
      this.btnText = 'Add List';
      this.groupModel.btnText = 'Add';
    } else {
      console.log('Update');
      this.btnText = 'Update';
      this.groupModel = {
        btnText: this.config.header,
        id: this.dataVal.id,
        description: this.dataVal.description,
        priority: this.dataVal.priority,
        status: this.dataVal.status,
      };
    }
    console.log(this.ref);
  }

  update() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.profileForm.value);
    console.log(this.groupModel);
    this.ref.close(this.groupModel);
  }
}
