import { PointSeparatorPipe } from './point-separator.pipe';


describe('PointSeparatorPipe', () => {
  let pipe: PointSeparatorPipe;
  beforeEach(() => {
    pipe = new PointSeparatorPipe();

  });


  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('simbol property null', () => {
    const returnElement = pipe.transform('1000', null);
    expect(returnElement).toEqual('1.000');
  });

  it('simbol property $', () => {
    const returnElement = pipe.transform('100', '$');
    expect(returnElement).toEqual('100');
  });

  it('remove decimal', () => {
    const returnElement = pipe.transform('1000.11');
    expect(returnElement).toEqual('1.000');
  });

  it('simbol remove decimal property $', () => {
    const returnElement = pipe.transform('100.12', '$');
    expect(returnElement).toEqual('100');
  });
});
