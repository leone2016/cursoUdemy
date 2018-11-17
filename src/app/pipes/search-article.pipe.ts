import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchArticle'
})
export class SearchArticlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
