import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../services/logs.service';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logs:any = [];
  users:any;
  p: number = 1;
  total: number = 0;
  constructor(public logService: LogsService) {}

  ngOnInit(): void {
    this.getLogs();
  }
  getLogs(){
    this.logService.getLogs(this.p).subscribe((res: any) => {
      this.logs = res.data;
      this.total = res.total;
    });
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getLogs();
}
}
