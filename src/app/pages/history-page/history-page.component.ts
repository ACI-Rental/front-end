import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  constructor() { }

  headers:Array<string> = ['From', 'To', 'Product', 'Status']
  data:Array<any> = [
  {from:'12-04-2002', to:'16-04-2002', product:'camera', status: 'renting'},
  {from:'16-04-2002', to:'10-04-2002', product:'tripod', status: 'late'},
  {from:'12-04-2002', to:'16-04-2002', product:'camera', status: 'returned'},
  {from:'12-04-2002', to:'16-04-2002', product:'lamp', status: 'returned'}]

  ngOnInit(): void {
  }
}
