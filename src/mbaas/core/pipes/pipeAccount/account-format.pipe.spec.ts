import { AccountFormat } from './account-format.pipe';


describe('PointSeparatorPipe', () => {
  let pipe: AccountFormat;
  beforeEach(() => {
    pipe = new AccountFormat();

  });


  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('format account property', () => {
    const returnElement = pipe.transform('1000');
    expect(returnElement).toEqual('****1000');
  });

});
