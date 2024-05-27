import { TestBed, async, waitForAsync } from '@angular/core/testing';

import { ComponentCreatorService } from './component-creator.service';
import { FormBuilder } from '@angular/forms';

describe('ComponentCreatorService', () => {
  beforeEach(waitForAsync(() => {TestBed.configureTestingModule({
        providers: [ FormBuilder ]
      }
    ).compileComponents();
  }));

  it('should be created', () => {
    const service: ComponentCreatorService = TestBed.inject(ComponentCreatorService);
    expect(service).toBeTruthy();
  });
});
