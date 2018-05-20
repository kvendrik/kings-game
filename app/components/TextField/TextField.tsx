import * as React from 'react';
import {Bind} from 'lodash-decorators';
import classNames from 'Utils/classNames';

import * as styles from './TextField.scss';

export interface Props {
  type?: string;
  value?: string;
  label?: string;
  name?: string;
  long?: boolean;
  required?: boolean;
  onChange?: (inputEvent: any) => void;
}

interface State {
  value: string;
}

export default class TextField extends React.Component<Props, State> {
  state = {
    value: this.props.value || '',
  };

  @Bind()
  onFieldValueChange(inputEvent: any) {
    const {onChange} = this.props;
    const {
      target: {value},
    } = inputEvent;

    this.setState({value});

    if (onChange) {
      onChange(inputEvent);
    }
  }

  render() {
    const {type = 'text', value, label, name, long, required} = this.props;
    const {value: currentValue} = this.state;

    const labelClassName = classNames(
      styles.Label,
      currentValue.length > 0 && styles.LabelActive,
    );

    const dataProps: any = {};
    Object.keys(this.props)
      .filter(key => /^data\-/.test(key))
      .forEach(key => {
        dataProps[key] = (this.props as any)[key];
      });

    return (
      <>
        {label && (
          <label htmlFor={name} className={labelClassName}>
            {label}
          </label>
        )}
        {long ? (
          <textarea
            className={styles.Textarea}
            defaultValue={value}
            name={name}
            id={name}
            onChange={this.onFieldValueChange}
            required={required}
            {...dataProps}
          />
        ) : (
          <input
            className={styles.Input}
            type={type}
            defaultValue={value}
            name={name}
            id={name}
            onChange={this.onFieldValueChange}
            required={required}
            {...dataProps}
          />
        )}
        <div className={styles.Underline} />
      </>
    );
  }
}
