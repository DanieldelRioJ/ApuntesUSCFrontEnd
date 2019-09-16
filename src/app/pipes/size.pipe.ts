import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class SizePipe implements PipeTransform {

  transform(value: number): any {
    if(value<1000) return value+"B";
    else if(value>1000 && value<1000000) return Math.round(value/1000)+"kB";
    else if(value<1000000000) return Math.round(value/1000000)+"MB";
    else return Math.round(value/1000000000)+"GB";
  }

}
