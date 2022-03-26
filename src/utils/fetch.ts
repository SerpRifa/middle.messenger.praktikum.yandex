export enum HTTPMethods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface IOptions {
  [key: string]: any;
}

export class Fetch {
  public get<G>(url: string, options: IOptions = {}): Promise<G> {
    const queryString = this.getQueryString(options.data);
    return this.sendRequest(`${url}${queryString}`, { method: HTTPMethods.GET });
  }

  public post<G>(url: string, options: IOptions): Promise<G> {
    return this.sendRequest(url, { method: HTTPMethods.POST, data: options.data });
  }

  public put<G>(url: string, options: IOptions): Promise<G> {
    return this.sendRequest(url, { method: HTTPMethods.PUT, data: options.data });
  }

  public delete<G>(url: string, options: IOptions): Promise<G> {
    return this.sendRequest(url, { method: HTTPMethods.DELETE, data: options.data });
  }

  private sendRequest<G>(
    url: string,
    options: { method: string; data?: string } = { method: HTTPMethods.GET },
  ): Promise<G> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = function () {
        resolve(JSON.parse(xhr.responseText));
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === HTTPMethods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }

  private getQueryString(options: IOptions): string {
    const result = Object.keys(options).reduce(
      (total, key) => (total !== '' ? `${total}&${options[key]}` : options[key]),
      '',
    );
    return result ? `?${result}` : '';
  }
}
