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

  async getAccount(apiKey: string): Promise<Account> {
    return await this.get(`${this.endpoint}/v1/account?api_key=${apiKey}`);
  }

  async uploadFile(
    file: File,
    apiKey?: string,
    onProgress?: (n: number) => void
  ): Promise<string> {
    const data = new FormData();
    data.append("file", file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (event) => {
        onProgress && onProgress((event.loaded / event.total) * 100);
      });
      xhr.addEventListener("loadend", () => {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
        } else {
          reject("Failed upload request");
        }
      });
      xhr.open("POST", `${this.endpoint}/v1/uploads`);
      xhr.send(data);
    });
  }
}

export interface Account {
  id: number;
  username: string;
  apiKey: string;
}
