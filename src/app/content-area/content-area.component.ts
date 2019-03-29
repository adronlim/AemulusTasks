import { Component, Input, OnInit } from '@angular/core';
import { HeroDataService } from '../hero-data.service';
@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrls: ['./content-area.component.less']
})
export class ContentAreaComponent implements OnInit {
  @Input()  searchWords: string;
  // HEROES: Observable<Hero[][]>;
  heroes: any;

  // HEROES: Hero[] = [
  //   { id: 11, name: 'Mr. Nice'  , str: 10, ag: 6, int: 4  },
  //   { id: 12, name: 'Narco'     , str:  6, ag: 4, int: 10 },
  //   { id: 13, name: 'Bombasto'  , str:  8, ag: 8, int: 4  },
  //   { id: 14, name: 'Celeritas' , str:  9, ag: 5, int: 6  },
  //   { id: 15, name: 'Magneta'   , str: 12, ag: 5, int: 3  },
  //   { id: 16, name: 'RubberMan' , str: 10, ag: 8, int: 2  },
  //   { id: 17, name: 'Dynama'    , str:  2, ag: 8, int: 10 },
  //   { id: 18, name: 'Dr IQ'     , str:  4, ag: 8, int: 12 },
  //   { id: 19, name: 'Magma'     , str:  3, ag: 8, int: 9  },
  //   { id: 20, name: 'Tornado'   , str:  2, ag: 5, int: 13 }
  // ];
  constructor(private heroDataService: HeroDataService) {}
  ngOnInit() {
    this.heroDataService.getHeroes().subscribe(data => {
      this.heroes = data;
    });
  }
  onSearch( SearchWords: string ) {
    this.searchWords = SearchWords;
  }
}
  // splitHEROES() {
  //   this.HEROES[0].forEach((element, index) => {
  //     console.log(index);
  //     if (index === 1) {
  //       this.heroTable1 = element[index];
  //     } else if ( index === 2) {
  //       this.heroTable2 = element[index];
  //     }
  //   });
  // }
  // splitHEROES2(element, index, array) {
  //   console.log('a[' + index + '] = ' + element);
  // }
