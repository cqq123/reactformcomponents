import React, { Component } from 'react';
import _ from 'lodash';
/* eslint-disable */
import Input from 'components/Input';
/* eslint-enable */
import style from './InputTest.scss';

class InputTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      focus: false,
    };
    this.handleChangeOnValue = this.handleChangeOnValue.bind(this);
    this.handleChangeOnFocus = this.handleChangeOnFocus.bind(this);
    this.handleChangeOnBlur = this.handleChangeOnBlur.bind(this);
  }
  handleChangeOnValue(value) {
    this.setState({
      keywords: value,
    });
  }
  handleChangeOnFocus(value) {
    this.setState({
      focus: value,
    });
  }
  handleChangeOnBlur(value) {
    this.setState({
      focus: value,
    });
  }
  search(value) {
    console.log(value, '----');
  }
  render() {
    const { keywords, focus } = this.state;
    return (
      <div className={style.main}>
        <Input
          className={style.input}
          value={keywords}
          placeholder="请输入..."
          onChange={this.handleChangeOnValue}
          onFocus={this.handleChangeOnFocus}
          onBlur={this.handleChangeOnBlur}
          onKeyDown={this.search}
        />
        {
          focus ? 'focus' : 'blur'
        }
        <p>{keywords}</p>
      </div>
    );
  }
}
export default InputTest;
