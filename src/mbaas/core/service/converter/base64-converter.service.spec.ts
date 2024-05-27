import { TestBed } from '@angular/core/testing';

import { Base64ConverterService } from './base64-converter.service';

describe('Base64ConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Base64ConverterService = TestBed.inject(Base64ConverterService);
    expect(service).toBeTruthy();
  });

  it('should be created call function', () => {
    const service: Base64ConverterService = TestBed.inject(Base64ConverterService);
    const blobData = service.base64toBlob('aG9sYSBtdW5kbyBlc3RvIGVzIHVuYSBwcnVlYmE=');
    expect(blobData).toBeTruthy();
  });

});
