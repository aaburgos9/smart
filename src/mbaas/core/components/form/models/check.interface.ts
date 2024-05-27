export interface Check {
    name: string;
    value: any;
    label: string;
    tooltip2?: {
      img: string;
      text: string;
    };
    hide?: boolean;
  }
