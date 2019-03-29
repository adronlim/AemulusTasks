import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroDataService} from '../hero-data.service';
import { Hero } from '../../hero';
@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.less']
})
export class HeroInfoComponent implements OnInit {
  iLink: any;
  infoLink: Array<any>[];
  id: any;
  table: any;
  selectedLinkInfo: any;
  HeroesInfo: Hero[][] = [[], []];
  description: any;
  selectedHeroId: any;
  selectedHeroPortrait: string;
  selectedHeroDescription: string;
  selectedHeroName: any;
  selectedHeroStr: any;
  selectedHeroAg: any;
  selectedHeroInt: any;

  heroInfo: any;
  constructor( private route: ActivatedRoute, private HeroDService: HeroDataService,   private location: Location) {
  }
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.table = params.get('i');
    });
    this.HeroDService.getLinkInfo().subscribe(data => {
      this.iLink = data;

      this.infoLink = this.iLink.InfoLink;
      console.log(this.infoLink);
      this.selectedLinkInfo = this.findSelectedInfo(this.infoLink, this.table);
      this.selectedHeroId = this.selectedLinkInfo.id;
      this.selectedHeroPortrait = this.selectedLinkInfo.portrait;
      this.selectedHeroDescription = this.selectedLinkInfo.description;
      console.log(this.selectedHeroDescription);
      this.HeroDService.getLoremIpsum(this.selectedHeroDescription).subscribe(LIdescript => {
        if (this.selectedHeroDescription) {
          console.log(LIdescript);
          this.description = Object.values(LIdescript);
          console.log(this.description);
        }
      });
    });
    this.HeroDService.getHeroes().subscribe(Heroes => {
      // Loop through the data file, find and match the id to get the data.
      console.log( Object.values(Heroes)[0] );
      this.HeroesInfo = Object.values(Heroes);
      console.log(Object.values(this.HeroesInfo[0]).length);
      this.heroInfo = this.findSelectedInfo( this.HeroesInfo[0], this.table );
      console.log(this.HeroesInfo);
      this.selectedHeroName = this.heroInfo.name;
      this.selectedHeroStr = this.heroInfo.str;
      this.selectedHeroAg = this.heroInfo.ag;
      this.selectedHeroInt = this.heroInfo.int;
    });
  }
  goBack(): void {
    this.location.back();
  }
  findSelectedInfo(TinfoLink: any, TNum: number ): Hero {
    let i;
    i = 0;
    while (TinfoLink !== null || TinfoLink !== undefined) {
      if ( TinfoLink[TNum - 1][i].id == this.id) {
        return TinfoLink[TNum - 1][i];
      }
      i++;
      if ( TinfoLink[TNum - 1][i] === null || TinfoLink[TNum - 1][i] === undefined ) {
        console.log(`The information Link is ${TinfoLink[TNum - 1][i]}`);
        break;
      }
    }
  }
}

