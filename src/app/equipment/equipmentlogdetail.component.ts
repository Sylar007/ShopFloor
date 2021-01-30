import { Component, Input, OnInit } from '@angular/core';
import { AngularXTimelineData } from 'angularx-timeline';
import { first } from 'rxjs/operators';
import { WorkOrderLog } from '../_models';
import { EquipmentService } from '../_services';

@Component({
  selector: 'app-timeline',
  templateUrl: './equipmentlogdetail.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentLogDetailComponent implements OnInit {
  dataSource: AngularXTimelineData[] = [];
  workorderLogs: WorkOrderLog[] = [];
  @Input() equipmentId: number;
  //data = [];
  constructor(
    private equipmentService: EquipmentService
  ) { }

 ngOnInit() {
    // let data = [
    //   { title: 'Event Period #1' },
    //   { date: new Date(2020, 0, 1), title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    //   { date: new Date(2020, 1, 1), title: 'Lorem ipsum', content: '<strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    //   { date: new Date(2020, 2, 1), title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    //   { title: 'Event Period #2' },
    //   { date: new Date(2020, 0, 1), title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    //   { date: 'Unconfirmed Date', title: 'Lorem ipsum', content: '<strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    //   { date: new Date(2020, 2, 1), title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    // ];
  let data = [];//{"date":"15/11/2020 8:37:29 PM","title":"PM: WO Name 1","content":"<p style='font-size:14pt;'>PM: WO-201115-01 </p><br><br>\r\n                                               Assigned to: Diah<br>\r\n                                               Date: 15/11/2020 8:37:29 PM<br>\r\n                                               Status: Pending<br>\r\n                                            "}];    // // Fetch All Equipment on Page load
    this.equipmentService.getEquipmentLog(this.equipmentId)
      .pipe(first())
      .subscribe(workorderLogs => {
        data = workorderLogs;
        data.forEach(entry => this.dataSource.push(entry));
      });


  }
}
