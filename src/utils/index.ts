class Button extends Block {
  constructor(props) {
    // Создаём враппер дом-элемент button
    super("button", props);
  }

  render() {
    // В проекте должен быть ваш собственный шаблонизатор
    return `<div>${this.props.text}</div>`;
  }
}

function render(query, block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}

let button = new Button({
  text: 'Click me',
});

button = new Proxy(button, {
  deleteProperty(target, prop) {
    throw new Error("нет доступа");
  }
})

// app — это class дива в корне DOM
render(".app", button);

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
  button.setProps({
    text: 'Click me, please',
  });
}, 1000);


const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data) {
  // Можно делать трансформацию GET-параметров в отдельной функции
  return Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');
}

class HTTPTransport {
  get = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };
  put = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };
  post = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };
  delete = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  // PUT, POST, DELETE

  // options:
  // headers — obj
  // data — obj
  request = (url, options = { method: METHOD.GET }, timeout = 5000) => {
    const { method, data, headers } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (method === METHOD.GET) {
        const query = queryStringify(data);
        url = query.length > 0? `${url}?${query}` : url;
      }
      xhr.open(method, url);
      xhr.timeout = timeout;
      for(let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }


      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;


      if (method === METHOD.GET) {
        console.log('METHOD.GET')
        xhr.send();
      } else {
        xhr.send(data);
      }
    })

  };
}

const hTTPTransport = new HTTPTransport()
hTTPTransport.get('http://localhost:3000/')
