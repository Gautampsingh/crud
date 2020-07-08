import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/core/services/list.service';
import Label from 'src/app/shared/constants/Label';

import { DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { UpdatemodalComponent } from 'src/app/shared/dialogs/updatemodal/updatemodal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DialogService],
})
export class ListComponent implements OnInit {
  labels: any;
  lists: any;
  cols: any[];
  constructor(
    private listService: ListService,
    private dialogService: DialogService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.labels = Label;
    this.getLists();
    // set the table headers
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'title', header: 'Title' },
      { field: 'description', header: 'Description' },
      { field: 'priority', header: 'Priority' },
      { field: 'status', header: 'Status' },
    ];
  }

  getLists() {
    this.listService.getAll().subscribe((data: any) => {
      this.lists = data;
    });
  }

  deleteList(myData: any) {
    this.listService.delete(myData.title).subscribe(
      (response: any) => {
        this.toastr.success('Deleted successfully', '', {
          timeOut: environment.toasterTimeOut,
        });
        this.getLists();
      },
      (error: any) => {
        this.toastr.error('Error fetching data', '', {
          timeOut: environment.toasterTimeOut,
        });
      }
    );
  }

  updateList(myData: any, text: string) {
    const ref = this.dialogService.open(UpdatemodalComponent, {
      header: text,
      data: myData,
      width: '50%',
    });

    ref.onClose.subscribe((response) => {
      if (response) {
        if (response.btnText === 'Update') {
          const postData = {
            description: response.description,
            id: response.id,
            priority: response.priority,
            status: response.status,
          };

          this.listService.put(postData, myData.title).subscribe(
            (response: any) => {
              this.toastr.success('Updated successfully', '', {
                timeOut: environment.toasterTimeOut,
              });
              this.getLists();
            },
            (error: any) => {
              this.toastr.error('Error fetching data', '', {
                timeOut: environment.toasterTimeOut,
              });
            }
          );
        } else if (response.btnText === 'Add') {
          const postAddData = {
            description: response.description,
            id: response.id,
            priority: response.priority,
            status: response.status,
          };
          this.listService.POST(postAddData).subscribe(
            (response: any) => {
              this.toastr.success('Added successfully', '', {
                timeOut: environment.toasterTimeOut,
              });
              this.getLists();
            },
            (error: any) => {
              this.toastr.error('Error fetching data', '', {
                timeOut: environment.toasterTimeOut,
              });
            }
          );
        }
      }
    });
  }
}
