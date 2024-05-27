export interface PostMessagesReq {
  fn: string;
  message: {
    [key: string]: any;
  };
}

export interface PostMessagesRes {
  [key: string]: any;
}
