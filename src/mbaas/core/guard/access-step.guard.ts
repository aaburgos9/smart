import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot } from '@angular/router';
import { SendInformationService } from '../service/SendInformation/send-information.service';
import { STEP_ID } from 'src/mbaas/mbaas.const';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessStepGuard implements CanActivate, CanDeactivate<any> {

  constructor(
    private guard: SendInformationService<string>
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
  ): boolean {
    if (!environment.production) { return true; }
    return this.guard.lastValue(STEP_ID) === next.data.stepId;
  }

  canDeactivate(
    currentRoute: ActivatedRouteSnapshot,
  ): boolean {
    if (!environment.production) { return true; }
    return this.guard.lastValue(STEP_ID) !== currentRoute.data.stepId;
  }
}
