export class API {
  endpoint: string;

  constructor() {
    this.endpoint = "http://localhost:7417";
  }

  async post(url: string, body: any): Promise<any> {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  async get(url: string) {
    return await fetch(url, {
      method: "GET",
      headers: {},
    }).then((res) => res.json());
  }

  async signup(username: string, password: string): Promise<Account> {
    return await this.post(`${this.endpoint}/v1/signup`, {
      username,
      password,
    });
  }
}

export interface Account {
  id: number;
  username: string;
  apiKey: string;
}
