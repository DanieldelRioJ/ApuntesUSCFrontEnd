import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { GradoService } from '../modelo/grado.service';
import { fadeAnimation } from '../animations/route-animation';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  grados:Map<string,any>;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private gradoService: GradoService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.gradoService.getGrados().subscribe(grados=>this.grados=grados.degrees);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  cierraSiEsMobil(barra:any):void{
    this.mobileQuery.matches? barra.toggle(): null;
  }
}
