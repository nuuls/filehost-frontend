const apiUrls: { [key: string]: string } = {
  "beta.nuuls.com": "https://beta-i.nuuls.com",
  "nuuls.com": "https://i.nuuls.com",
};

interface APIErrorBody {
  status: number;
  statusCode: string;
  message: string;
  data: any | null;
}

export class APIError {
  public status: number;
  public body: APIErrorBody;

  constructor(res: Response, body: APIErrorBody) {
    this.status = res.status;
    this.body = body;
  }
}

export class API {
  public endpoint: string;

  constructor() {
    this.endpoint =
      apiUrls[window.location.hostname] || "http://localhost:7417";
  }

  async doFetch(method: string, url: string, body?: any): Promise<any> {
    return await fetch(url, {
      method,
      headers: body
        ? {
            "Content-Type": "application/json",
          }
        : {},
      body: body ? JSON.stringify(body) : null,
    }).then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      const body = await res.json();
      return Promise.reject(new APIError(res, body));
    });
  }

  async post(url: string, body: any): Promise<any> {
    return await this.doFetch("POST", url, body);
  }

  async get(url: string) {
    return await this.doFetch("GET", url);
  }

  async delete(url: string) {
    return await this.doFetch("DELETE", url);
  }

  async signup(username: string, password: string): Promise<Account> {
    return await this.post(`${this.endpoint}/v1/signup`, {
      username,
      password,
    });
  }

  async login(username: string, password: string): Promise<Account> {
    return await this.post(`${this.endpoint}/v1/login`, {
      username,
      password,
    });
  }

  async getAccount(apiKey: string): Promise<Account> {
    return await this.get(`${this.endpoint}/v1/account?api_key=${apiKey}`);
  }

  async getUploads(apiKey: string): Promise<GetUploadsResponse> {
    return await this.get(`${this.endpoint}/v1/uploads?api_key=${apiKey}`);
  }

  async deleteUpload(filename: string, apiKey: string): Promise<Upload> {
    return await this.delete(
      `${this.endpoint}/v1/uploads/${filename}?api_key=${apiKey}`
    );
  }

  async getDomain(id: number, apiKey: string): Promise<Domain> {
    return await this.get(
      `${this.endpoint}/v1/domains/${id}?api_key=${apiKey}`
    );
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
          return;
        }

        let message = "Connection to server failed";

        if (xhr.status >= 400) {
          try {
            const data = JSON.parse(xhr.responseText);
            message = data?.message || xhr.statusText;
          } catch (err) {
            message = xhr.statusText;
          }
        }

        reject(`${message}`);
      });
      xhr.open(
        "POST",
        `${this.endpoint}/v1/uploads?${apiKey ? "api_key=" + apiKey : ""}`
      );
      xhr.send(data);
    });
  }
}

export interface Account {
  id: number;
  username: string;
  apiKey: string;
  defaultDomainId: number;
  defaultExpiryHours: number;
}

export interface Domain {
  id: number;
  domain: string;
}

export interface GetUploadsResponse {
  total: number;
  data: [Upload];
}

export interface Upload {
  id: number;
  owner: any;
  expiresAt: Date;
  filename: string;
  mimeType: string;
  domain: any;
}
