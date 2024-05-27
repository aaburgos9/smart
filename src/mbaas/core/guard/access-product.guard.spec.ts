import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { AccessProductGuard } from './access-product.guard';
import { SendInformationService } from '../service/SendInformation/send-information.service';
import { GUARD_PRODUCTO } from 'src/mbaas/mbaas.const';

describe('AccessProductGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessProductGuard, SendInformationService]
    });
  });

  beforeEach(() => {
    spyOn(TestBed.inject(SendInformationService), 'lastValue').and.returnValues(true, false);
  });

  it('should ...', inject([AccessProductGuard], (guard: AccessProductGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('canLoad ...', inject([AccessProductGuard], (guard: AccessProductGuard) => {
    const obser: SendInformationService<boolean> = TestBed.inject(SendInformationService);
    const routeMock = {
      data: {
        PRODUCT: [true]
      }
    };
    const a = guard.canLoad(routeMock, null);
    expect(a).toBeTruthy();
  }));

  it('canLoad ...', inject([AccessProductGuard], (guard: AccessProductGuard) => {
    const obser: SendInformationService<boolean> = TestBed.inject(SendInformationService);
    const routeMock = {
      data: {
        PRODUCT: ['']
      }
    };
    const a = guard.canLoad(routeMock, null);
    expect(a).toBeFalsy();
  }));
});
