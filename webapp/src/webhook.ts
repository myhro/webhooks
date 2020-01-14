export type Header = {
  [key: string]: string[];
};

export type Webhook = {
  body: string;
  date: string;
  headers: Header;
  ip: string;
  method: string;
  proto: string;
};
