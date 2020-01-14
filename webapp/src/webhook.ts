export type Headers = {
  [key: string]: string[];
};

export type Webhook = {
  body: string;
  date: string;
  headers: Headers;
  ip: string;
  method: string;
  proto: string;
};
