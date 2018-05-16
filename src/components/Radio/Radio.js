import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './Radio.scss';

class Radio extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { onChange } = this.props;
    onChange(e.target.value);
  }

  render() {
    const {
      className, value, label, checked,
    } = this.props;
    return (
      <label className={cn(style.radioContent, className)}>
        <span className={style.radio}>
          <span
            className={cn(style.check, {
              [style.checked]: checked,
            })}
          />
          <input
            type="radio"
            value={value}
            checked={checked}
            onChange={this.handleChange}
          />
        </span>
        <span className={style.label}>{label}</span>
      </label>
    );
  }
}
Radio.defaultProps = {
  onChange: () => {},
  checked: false,
};
Radio.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Radio;
