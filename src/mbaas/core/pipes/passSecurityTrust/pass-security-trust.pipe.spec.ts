import { PassSecurityTrustPipe } from './pass-security-trust.pipe';

describe('PassSecurityTrustPipe', () => {
  it('create an instance', () => {
    const pipe = new PassSecurityTrustPipe({
      bypassSecurityTrustHtml: (item) => item
    } as any).transform('<div></div>', 'html');
    expect(pipe).toEqual('<div></div>');
  });
});

describe('PassSecurityTrustPipe', () => {
  it('create an instance', () => {
    const pipe = new PassSecurityTrustPipe({
      bypassSecurityTrustStyle: (item) => item
    } as any).transform('<div></div>', 'style');
    expect(pipe).toEqual('<div></div>');
  });
});

describe('PassSecurityTrustPipe', () => {
  it('create an instance', () => {
    const pipe = new PassSecurityTrustPipe({
      bypassSecurityTrustScript: (item) => item
    } as any).transform('<div></div>', 'script');
    expect(pipe).toEqual('<div></div>');
  });
});

describe('PassSecurityTrustPipe', () => {
  it('create an instance', () => {
    const pipe = new PassSecurityTrustPipe({
      bypassSecurityTrustUrl: (item) => item
    } as any).transform('<div></div>', 'url');
    expect(pipe).toEqual('<div></div>');
  });
});

describe('PassSecurityTrustPipe', () => {
  it('create an instance', () => {
    const pipe = new PassSecurityTrustPipe({
      bypassSecurityTrustResourceUrl: (item) => item
    } as any).transform('<div></div>', 'resourceUrl');
    expect(pipe).toEqual('<div></div>');
  });
});

