import { TestBed } from '@angular/core/testing';

import { NodeForgeService } from './node-forge.service';

describe('NodeForgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodeForgeService = TestBed.inject(NodeForgeService);
    expect(service).toBeTruthy();
  });

  it('encriptacionClaveB', () => {
    const service: NodeForgeService = TestBed.inject(NodeForgeService);
    const method = 'encriptacionClaveB';
    const hash = service.buildHash[method](
      `-----BEGIN PUBLIC KEY-----
			MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi0/ajmKQ6P3+lInTZvRp
			l8NBxUikVzz1ZaqJVlW6cy6rXkms2TYwawHJp6Uat4VoMj7+jCFxs7daOcQOLWA2
			6KMKP+C8uSzdy6tgKN/CwkalDPU/+kC/ImEHwa7i3FFnXsBeJN5Md7my0MOhqYR6
			vpiGtFu99YvRzBkOsj53ZT7Fya/EgEFrAmudfnNg7BmALO0lgXUKwGBZbg5h4pSk
			ss06SQdNwvrpC0dRBBnww0nOXQmnEljNIfcJ1kCXyYO3GKVNkyzW+gQCpkB+xPxM
			4+m4WWo93xKbI9SOXaIxhDu19Y5V7cbm2BunVaIvTNAtQuoamUN3arfg3d9mO8/y
			BQIDAQAB
      -----END PUBLIC KEY-----`,
      'Frase'
    );
    expect(hash).toBeTruthy();
  });

  it('encriptacionClaveA', () => {
    const service: NodeForgeService = TestBed.inject(NodeForgeService);
    const method = 'encriptacionClaveA';
    const hash = service.buildHash[method](
      `-----BEGIN PUBLIC KEY-----
			MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi0/ajmKQ6P3+lInTZvRp
			l8NBxUikVzz1ZaqJVlW6cy6rXkms2TYwawHJp6Uat4VoMj7+jCFxs7daOcQOLWA2
			6KMKP+C8uSzdy6tgKN/CwkalDPU/+kC/ImEHwa7i3FFnXsBeJN5Md7my0MOhqYR6
			vpiGtFu99YvRzBkOsj53ZT7Fya/EgEFrAmudfnNg7BmALO0lgXUKwGBZbg5h4pSk
			ss06SQdNwvrpC0dRBBnww0nOXQmnEljNIfcJ1kCXyYO3GKVNkyzW+gQCpkB+xPxM
			4+m4WWo93xKbI9SOXaIxhDu19Y5V7cbm2BunVaIvTNAtQuoamUN3arfg3d9mO8/y
			BQIDAQAB
      -----END PUBLIC KEY-----`,
      'Frase'
    );
    expect(hash).toBeTruthy();
  });
});
