import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  sWords = '';
  @Output() searchFunc = new EventEmitter<string>();

  constructor() { }
  ngOnInit() {}

  onKey(even: string) {
    this.sWords = even;
    this.pass2Parent();
  }
  pass2Parent() {
    this.searchFunc.emit(this.sWords);
  }
}
