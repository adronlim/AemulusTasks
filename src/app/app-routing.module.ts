import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ContentAreaComponent } from './content-area/content-area.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { HeroInfoComponent } from './hero-info/hero-info.component';
import { HeroStatisticComponent } from './hero-statistic/hero-statistic.component';
// import { GithubProfileComponent} from './github-profile
// import { NotFoundComponent } './not-found/not-found'
const appRoutes: Routes = [
  { path: 'content-area', component: ContentAreaComponent },
  { path: 'nav-bar', component: NavBarComponent },
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'HeroInfo/:i/:id', component: HeroInfoComponent},
  { path: 'Statistic', component: HeroStatisticComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { enableTracing: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
