import { Component, OnInit, Input } from '@angular/core';
import { Hero } from 'src/hero';
import { HEROES } from "src/mock-hero";  		//Cannot ../

@Component({
  selector: 'app-hero-stat',
  templateUrl: './hero-stat.component.html',
  styleUrls: ['./hero-stat.component.less']
})
export class HeroStatComponent implements OnInit {
	
  //@Input() heroDetails;

  //heroes = HEROES;
  //hero:Hero;

  constructor() { }

  ngOnInit() {
  	//this.hero = this.heroDetails;
  }

}
