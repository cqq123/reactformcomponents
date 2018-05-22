import React, { Component } from 'react';
/* eslint-disable */
import { Radio, RadioGroup } from 'components/Radio';
/* eslint-enable */
import style from './RadioTest.scss';

class RadioTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectTypeList: [
        { id: '1', name: '海曙区' },
        { id: '2', name: '鄞州区' },
        { id: '3', name: '江北区' },
      ],
      projectType: '1',
    };
  }
  changeProjectType = (value) => {
    this.setState({
      projectType: value,
    });
  }
  render() {
    return (
      <RadioGroup
        className={style.radioGroup}
        onChange={this.changeProjectType}
        selectValue={this.state.projectType}
      >
        {
          this.state.projectTypeList.map((type, idx) => (
            <Radio
              key={idx}
              value={type.id}
              label={type.name}
              className={style.radio}
            />
          ))
        }
      </RadioGroup>
    );
  }
}
export default RadioTest;
