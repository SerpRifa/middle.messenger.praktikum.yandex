const errorLabelClass = 'error-label';

export const createError = (target: HTMLInputElement, validMessage: string | null) => {
  if (validMessage) {
    target.classList.add('invalid');

    if (
      target.nextElementSibling === null
      || target.nextElementSibling.className !== errorLabelClass
    ) {
      const element = createErrorElement(validMessage);
      target.after(element);
    }
  }

  if (
    target.nextElementSibling !== null
    && target.nextElementSibling.className === errorLabelClass
    && !validMessage
  ) {
    target.classList.remove('invalid');
    target.nextElementSibling.remove();
  }
};

const createErrorElement = (message: string): HTMLElement => {
  const errorElement = document.createElement('div');

  errorElement.classList.add(errorLabelClass);
  errorElement.textContent = message;

  return errorElement;
};

export const nameValidator = (str: string): string | null => {
  const regex = /^[A-ZА-Я][A-Za-zА-Яа-я\\-]+$/;

  return regex.test(str) ? null : 'Некорректное имя';
};

export const loginValidator = (str: string): string | null => {
  const regex = /^(?=[\S]+)(?=.*[^0-9 ].*)[a-zA-Z0-9_-]{3,20}$/;

  return regex.test(str) ? null : 'Некорректный логин';
};

export const emailValidator = (str: string): string | null => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return regex.test(str) ? null : 'Некорректный адрес электронной почты';
};

export const passwordValidator = (str: string): string | null => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}$/;

  return regex.test(str) ? null : 'Введеный пароль не удовлетворяет требованиям';
};

export const phoneValidator = (str: string): string | null => {
  const regex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{2})[-. ]*(\d{2})(?: *x(\d+))?\s*$/;

  return regex.test(str) ? null : 'Некорректный номер телефона';
};

export const messageValidator = (str: string): string | null => (str.length > 0 ? null : 'Некорректный текст');

export type TValidate = (str: string) =>  string | null;
