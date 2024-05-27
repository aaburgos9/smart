import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { AccessStepGuard } from './access-step.guard';
import { SendInformationService } from '../service/SendInformation/send-information.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { STEP_ID } from 'src/mbaas/mbaas.const';

describe('AccessStepGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessStepGuard, SendInformationService]
    });
  });

  it('should ...', inject([AccessStepGuard], (guard: AccessStepGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('canActivate ...', inject([AccessStepGuard], (guard: AccessStepGuard) => {
    const a = guard.canActivate(({ data: { stepId: 'TEMP001'}} as any));
    expect(a).toBeTruthy();
  }));

  it('canActivate ...', inject([AccessStepGuard], (guard: AccessStepGuard) => {
    const obser: SendInformationService<string> = TestBed.inject(SendInformationService);
    obser.sendData('TEMP001', STEP_ID);
    const a = guard.canActivate(({ data: { stepId: 'TEMP001'}} as any));
    expect(a).toBeTruthy();
  }));

  it('canDeactivate ...', inject([AccessStepGuard], (guard: AccessStepGuard) => {
    const a = guard.canDeactivate(({ data: { stepId: 'TEMP001'}} as any));
    expect(a).toBeTruthy();
  }));

  it('canDeactivate ...', inject([AccessStepGuard], (guard: AccessStepGuard) => {
    const obser: SendInformationService<string> = TestBed.inject(SendInformationService);
    obser.sendData('TEMP001', STEP_ID);
    const a = guard.canDeactivate(({ data: { stepId: 'TEMP001'}} as any));
    expect(a).toBe(true);
  }));
});
