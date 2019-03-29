import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';   // Routes
import { FilterPipe } from './filter.pipe';
import { HeroDataService } from './hero-data.service';

import { AppComponent } from './app.component';
import { HeroStatComponent } from './hero-stat/hero-stat.component';
import { HStateComponent } from './h-state/h-state.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeroInfoComponent } from './hero-info/hero-info.component';
import { HeroStatisticComponent } from './hero-statistic/hero-statistic.component';
import { ChartHeroComponent } from './chart-hero/chart-hero.component';
@NgModule({
  imports:      [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule], // <-- debugging purposes only)
  declarations: [AppComponent, HeroStatComponent, HStateComponent, FilterPipe,
    NavBarComponent, ContentAreaComponent, SearchComponent, HomeComponent, HeroInfoComponent, HeroStatisticComponent, ChartHeroComponent],
  providers:    [HeroDataService],
  bootstrap:    [AppComponent]
})
export class AppModule { }
