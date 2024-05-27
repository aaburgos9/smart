import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { AccessProcessGuard } from './access-process.guard';
import { SendInformationService } from '../service/SendInformation/send-information.service';
import { STEP_ID } from 'src/mbaas/mbaas.const';

describe('AccessProcessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessProcessGuard, SendInformationService]
    });
  });

  it('should ...', inject([AccessProcessGuard], (guard: AccessProcessGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('canLoad ...', inject([AccessProcessGuard], (guard: AccessProcessGuard) => {
    const obser: SendInformationService<string> = TestBed.inject(SendInformationService);
    obser.sendData('TEMP001', STEP_ID);
    const a = guard.canLoad({ data: { child: ['TEMP001']}}, null);
    expect(a).toBeTruthy();
  }));

  it('canLoad ...', inject([AccessProcessGuard], (guard: AccessProcessGuard) => {
    const obser: SendInformationService<string> = TestBed.inject(SendInformationService);
    obser.sendData('TEMP001', STEP_ID);
    const a = guard.canLoad({ data: { child: ['TEMP002']}}, null);
    expect(a).toBeFalsy();
  }));
});
