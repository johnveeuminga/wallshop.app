import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'search',
  pure: true
})
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], searchTerm:String): any[] {
    if (searchTerm){
      searchTerm = searchTerm.toUpperCase();
      return items.filter(item => {
          console.log(item);
          return item.authCode.toUpperCase().indexOf(searchTerm)!==-1});
    }else{
      return items;
    }
  }
    
}
