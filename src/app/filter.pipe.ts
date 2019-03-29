import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from 'src/hero';
import index from '@angular/cli/lib/cli';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

transform(items: Hero[], Words: string): any[] {

  if (!items) { return []; }
  if (!Words) { return items; }
  Words = Words.toLowerCase();

  return items.filter( it => {
      // console.log(typeof items);
      // console.log(it);
      return it.name.toLowerCase().includes(Words);
  });
  }
}
