import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  headers:Array<any> = [{id: 0, name:'From'},{id: 1, name:'To'},{id: 2, name:'Product'},{id:3, name:'Status'}]
  data:Array<any> = [
  {id:0, from:'12-04-2002', to:'16-04-2002', product:'camera', status: 'renting'},
  {id:0, from:'16-04-2002', to:'10-04-2002', product:'tripod', status: 'late'},
  {id:0, from:'12-04-2002', to:'16-04-2002', product:'camera', status: 'returned'},
  {id:0, from:'12-04-2002', to:'16-04-2002', product:'lamp', status: 'returned'}]

  constructor() { }

  ngOnInit(): void {
  }

}
