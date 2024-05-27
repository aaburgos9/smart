import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { SendInformationService } from '../service/SendInformation/send-information.service';
import { STEP_ID } from 'src/mbaas/mbaas.const';

@Injectable({
  providedIn: 'root'
})
export class AccessProcessGuard implements CanLoad {

  constructor(
    private guard: SendInformationService<boolean>
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean {
    return (route.data.child as Array<any>)
      .map( item => this.guard.lastValue(STEP_ID) === item)
      .reduce((previusValue, currentValue) => previusValue || currentValue, false);
  }
}
