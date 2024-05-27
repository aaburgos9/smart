/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
//console.warn('WEBWORKER_', data);
  const cls = new CallingCrypto();
  const response = `worker response to ${data}`;
  cls.loggingData(data);
  postMessage(response);
});

export class CallingCrypto {

  constructor() {}

  loggingData(text: string): void {
//  console.warn(text);
  }

}
