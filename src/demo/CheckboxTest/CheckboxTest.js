import React, { Component } from 'react';
import _ from 'lodash';
/* eslint-disable */
import Checkbox from 'components/Checkbox';
/* eslint-enable */
import style from './CheckboxTest.scss';

class CheckboxTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(check) {
    this.setState({
      checked: check,
    });
  }

  render() {
    const { checked } = this.state;
    return (
      <div className={style.main}>
        <Checkbox
          label="海曙区"
          checked={checked}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default CheckboxTest;
