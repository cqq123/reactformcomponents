import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import _ from 'lodash';
import style from './input.scss';

class Input extends Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.changeBlur = this.changeBlur.bind(this);
    this.changeFocus = this.changeFocus.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  changeValue(e) {
    const { onChange } = this.props;
    onChange(e.target.value);
  }
  changeFocus() {
    const { onFocus } = this.props;
    onFocus(true);
  }
  changeBlur() {
    const { onBlur } = this.props;
    onBlur(false);
  }
  keyDown(e) {
    const { onKeyDown } = this.props;
    if (e.keyCode === 13) {
      onKeyDown(_.trim(e.target.value));
    }
  }
  render() {
    const {
      className, onChange, onBlur, onFocus, onKeyDown, ...other
    } = this.props;
    return (
      <input
        className={cn(style.input, className)}
        onChange={this.changeValue}
        onFocus={this.changeFocus}
        onBlur={this.changeBlur}
        onKeyDown={this.keyDown}
        {...other}
      />
    );
  }
}


Input.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onKeyDown: () => {},
};
Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  className: PropTypes.string,
};
export default Input;
