import inputTmpl from './Input.hbs';
import * as styles from './Input.module.css';
import classnames from '../../utils/classnames';
import { BaseBlock } from '../../utils/base-block';
import { BaseComponetProps } from '../../types/types';
import { createError } from '../../utils/validators';

export interface InputProps extends BaseComponetProps {
  placeholder?: string;
  error?: string;
  value?: string | null;
  type?: string;
  className?: string;
}

export class Input extends BaseBlock<InputProps> {
  private validators: Array<(str: string) => string | null> = [];

  constructor(props :any, validators: any[] = []) {
    super(props);
    this.validators = validators;
  }

  render() {
    const className = classnames(styles.input, this.props?.className);
    return this.compile(inputTmpl, {
      placeholder: '', value: '', type: 'text', ...this.props, className,
    });
  }

  componentAfterRender() {
    this.element?.addEventListener('focus', () => this.validateInput());
    this.element?.addEventListener('blur', () => this.validateInput());
  }

  validateInput() {
    const { value } = this.element as HTMLInputElement;
    this.validators.forEach((callback) => {
      const error = callback(value);
      createError(this.element as HTMLInputElement, error);
    });
  }
}

export class TextField extends Input {
  render() {
    const className = classnames(styles.input, this.props?.className);
    return this.compile(inputTmpl, {
      placeholder: '', value: '', ...this.props, type: 'text', className,
    });
  }
}

export class PasswordField extends TextField {
  render() {
    const className = classnames(styles.input, this.props?.className);
    return this.compile(inputTmpl, {
      placeholder: '', value: '', ...this.props, type: 'password', className,
    });
  }
}

export class EmailField extends TextField {
  render() {
    const className = classnames(styles.input, this.props?.className);
    return this.compile(inputTmpl, {
      placeholder: '', value: '', ...this.props, type: 'text', className,
    });
  }
}
