import { HeroDataService } from './src/app/hero-data.service';
import { Hero } from 'src/hero';

export class HeroesData{
  private dHeroes: any;

  getHeroes(): any {
    // this.heroDataService.getHeroes()
    //   .subscribe(heroes => this.heroes = heroes);
    return this.dHeroes;
  }
  // constructor(private heroDataService: HeroDataService) {
  //   this.heroes = heroDataService.getHeroes();
  // }

  constructor(private heroDataService: HeroDataService) {
    this.heroDataService.getHeroes().subscribe(
      heroes => {
        this.dHeroes = heroes;
        console.log(this.dHeroes);
      },
      err => {
        console.log(err);
      }
    );
  }


}
