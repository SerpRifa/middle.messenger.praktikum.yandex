export enum HTTPMethods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface IOptions {
  headers?: Record<string, string>
  data?: any;
  withCredentials?: boolean;
  retries?: number;
  file?: boolean
  [key: string]: any;
}

export class Fetch {
  public  resourceUrl = "http://ya-praktikum.tech/api/v2/resources";
  public  baseUrl = "https://ya-praktikum.tech/api/v2";

  public get<G>(url: string = this.baseUrl, options: IOptions = {}): Promise<G> {
    const queryString = this.getQueryString(options.data);

    return this.sendRequest(`${this.baseUrl}${url}${queryString}`, { method: HTTPMethods.GET });
  }

  public post<G>(path: string, options: IOptions): Promise<G> {
    return this.sendRequest(`${this.baseUrl}${path}`, { method: HTTPMethods.POST, data: options.data });
  }

  public put<G>(path: string = this.baseUrl, options: IOptions): Promise<G> {
    return this.sendRequest(`${this.baseUrl}${path}`, { method: HTTPMethods.PUT, ...options });
  }

  public delete<G>(path: string = this.baseUrl, options: IOptions): Promise<G> {
    return this.sendRequest(`${this.baseUrl}${path}`, { method: HTTPMethods.DELETE, data: options.data });
  }

  private sendRequest<G>(
    url: string,
    options: IOptions = { method: HTTPMethods.GET },
  ): Promise<G> {
    const { method, data, headers, file, withCredentials = true } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = function () {
        if (xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if(!file) {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      }

      if(headers) {
        Object.entries(headers).forEach(([key, value]: [string, string]) => xhr.setRequestHeader(key, value));
      }


      xhr.withCredentials = withCredentials;
      xhr.responseType = 'json';

      if (method === HTTPMethods.GET || !data) {
        xhr.send();
      } else {
        console.log('data', data)
        xhr.send(Boolean(file) ? data : JSON.stringify(data));
      }
    });
  }

  private getQueryString(options: IOptions = {}): string {
    const result = Object.keys(options).reduce(
      (total, key) => (total !== '' ? `${total}&${options[key]}` : options[key]),
      '',
    );
    console.log('result', result ? `?${result}` : '')
    return result ? `?${result}` : '';
  }
}

export const fetch = new Fetch();
