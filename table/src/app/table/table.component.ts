import {Component, OnInit} from '@angular/core';
import {TableService} from "./table.service";



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})

export class TableComponent implements OnInit {

  namecheckbox;
  headers: Array<string> = [];
  subheaders: Array<string> = [];
  keyfordata: Array<string> = [];
  data: Array<object>;
  colspan: object = {};
  colspandef: object = {};
  display: object = {};
  setchecked: object = {};
  btn = ['btn btn-secondary active', 'btn btn-secondary']


  constructor(private jsonService: TableService) {

  }

  ngOnInit() {
    this.jsonService.getJson().subscribe(getdata => {
      this.namecheckbox = getdata.head;
      this.data = getdata.data;
      getdata.head.forEach( x => {
         this.headers.push(x.name);
         this.display[x.name] = '';
         this.setchecked[x.name] = true;
         if (x['sub-head']) {
              this.colspan[x.name] = x['sub-head'].length;
              this.colspandef[x.name] = x['sub-head'].length;
              x['sub-head'].forEach( v => {
              this.subheaders.push(v.name);
              this.keyfordata.push(v.name);
              this.display[v.name] = '';
              this.setchecked[v.name] = true;
              });
          } else {
              this.keyfordata.push(x.name);
            }
      });
    });
  }

  displayOffHeads(event, x) {
    if (!event.target.checked) {
      this.display[x] = 'off';
    } else {
        this.display[x] = '';
      }
  }

  displayOffHeadandSub(event, namehead: any, listsub: any) {
    if (!event.target.checked) {
      this.setchecked[namehead] = false;
      this.display[namehead] = 'off';
      listsub.forEach( s => {
        this.display[s.name] = 'off';
        this.colspan[namehead] = 0;
        this.setchecked[s.name] = false;
      });
    } else {
        this.display[namehead] = '';
        this.setchecked[namehead] = true;
        listsub.forEach( s => {
          this.display[s.name] = '';
          this.setchecked[s.name] = true;
          this.colspan[namehead] = listsub.length;
        });
      }
  }

  displayOffSub(event, namesub: any, namehead: any) {
    if (!event.target.checked) {
      this.display[namesub] = 'off';
      if (this.colspan[namehead] === 1) {
        this.display[namehead] = 'off';
      }
      this.colspan[namehead] --;
      this.setchecked[namehead] = false;
      this.setchecked[namesub] = false;
    } else {
        this.setchecked[namesub] = true;
        this.display[namesub] = '';
        if (this.colspan[namehead] === 0) {
          this.display[namehead] = '';
        }
        if (this.colspan[namehead] === this.colspandef[namehead] - 1) {
          this.setchecked[namehead] = true;
        }
        this.colspan[namehead] ++;
      }
  }

}
