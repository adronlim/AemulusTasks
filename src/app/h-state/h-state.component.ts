import { Component, OnInit, Input } from '@angular/core';
import { Hero } from 'src/hero';


@Component({
  selector: 'app-h-state',
  templateUrl: './h-state.component.html',
  styleUrls: ['./h-state.component.less']
})

export class HStateComponent implements OnInit {
  @Input() heroDetails: any;
  @Input() Swords: string;
  @Input() infoLinks: string;
  HeroD: [][] = [];
  sByWord: string;
  constructor() {
  }
  ngOnInit() {
    if ( this.heroDetails ) {
      console.log(this.heroDetails.HEROES[0]);
      console.log(this.heroDetails.HEROES);
      console.log(`%c ${this.heroDetails.HEROES}      %c   HeroObj   `, 'background: green; color: white', 'background: red; color: white');
      this.HeroD = this.heroDetails.HEROES;
      console.log(this.HeroD);
    }
  }
  sortBy(x: string, heroD: Hero[]) {
    this.sByWord = x;
    if (x === 'id') {
      heroD.sort((a, b) => a.id - b.id);
    } else if (x === 'str') {
      heroD.sort((a, b) => a.str - b.str);
    } else if (x === 'ag') {
      heroD.sort((a, b) => a.ag - b.ag);
    } else if (x === 'name') {
      heroD.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      heroD.sort((a, b) => a.int - b.int);
    }
  }
}
