import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable */
import { Select, Option } from 'components/Select';
/* eslint-enable */
import cn from 'classnames';
import style from './SelectTest.scss';

class SelectTest extends Component {
  constructor(props) {
    super(props);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.state = {
      isLoading: false,
    };
  }
  handleChangeValue(value) {
    const { changeSelectValue, changeList } = this.props;
    this.setState({
      isLoading: true,
    });
    changeSelectValue(value);
    changeList().then(() => {
      this.setState({
        isLoading: false,
      });
    });
  }
  render() {
    const { selectValue, selectList, childrenList } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        <Select
          className={style.select}
          value={selectValue}
          changeValue={this.handleChangeValue}
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
        <div>
          {
            isLoading && (
              <span>正在加载，请稍后……</span>
            )
          }
          { !isLoading && !_.isEmpty(childrenList) &&
            childrenList.map((a, idx) => (
              <div key={idx}>{a.data.title}</div>
            ))
          }
        </div>
      </div>
    );
  }
}
SelectTest.propTypes = {
  selectValue: PropTypes.string.isRequired,
  selectList: PropTypes.array.isRequired,
  childrenList: PropTypes.array.isRequired,
  changeSelectValue: PropTypes.func.isRequired,
  changeList: PropTypes.func.isRequired,
};

export default SelectTest;
// eslint-disabled
