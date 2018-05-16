import React, { Component } from 'react';
/* eslint-disable */
import { Select, Option } from 'components/Select';
/* eslint-enable */
import cn from 'classnames';
import style from './SelectTest.scss';

class SelectTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: '',
      selectList: [
        { label: '海曙区', id: '33001' },
        { label: '鄞州区', id: '33002' },
        { label: '江北区', id: '33003' },
      ],
    };
    this.changeValue = this.changeValue.bind(this);
  }
  changeValue(value) {
    this.setState({
      selectValue: value,
    });
  }
  render() {
    const { selectValue, selectList } = this.state;
    return (
      <Select
        className={style.select}
        value={selectValue}
        changeValue={this.changeValue}
      >
        {
          selectList.map(item => (
            <Option
              key={item.id}
              className={cn(style.option, {
                [style.selectOption]: selectValue === item.label,
              })}
              value={item.label}
            />
          ))
        }
      </Select>
    );
  }
}

export default SelectTest;
