import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SendInformationService } from '../service/SendInformation/send-information.service';
import { GUARD_PRODUCTO } from 'src/mbaas/mbaas.const';

@Injectable({
  providedIn: 'root'
})
export class AccessProductGuard implements CanLoad {

  constructor(
    private guard: SendInformationService<string>
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean {
    return (route.data.PRODUCT as Array<string>)
      .filter( item => this.guard.lastValue(GUARD_PRODUCTO) === item).length === 1;
  }
}
