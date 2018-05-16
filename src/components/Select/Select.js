import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import reactClickOutside from 'react-click-outside';
import style from './Select.scss';


class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.changeShow = this.changeShow.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.clearnValue = this.clearnValue.bind(this);
  }
  onSelect(selectValue) {
    const { changeValue, value } = this.props;
    if (selectValue !== value) {
      changeValue(selectValue);
    }
    this.setState({
      show: false,
    });
  }
  changeShow() {
    this.setState(prevProps => ({
      show: !prevProps.show,
    }));
  }
  handleClickOutside() {
    this.setState({
      show: false,
    });
  }
  clearnValue(e) {
    e.stopPropagation();
    const { changeValue } = this.props;
    changeValue('');
  }
  render() {
    const {
      value, children, className, name,
    } = this.props;
    const { show } = this.state;
    return (
      <div className={cn(style.main, className)}>
        <div
          className={style.select}
          onClick={this.changeShow}
        >
          <span className={style.selectValue}>{value === '' ? name : value}</span>
          <div className={style.icons}>
            {
              value !== '' &&
              <span
                className={style.closeIcon}
                onClick={this.clearnValue}
              />
            }
            <span
              className={cn(style.selectIcon, {
                [style.rotateIcon]: this.state.show,
                [style.rotateIconReserve]: !this.state.show,
              })}
            />
          </div>

        </div>
        {
          show &&
          <div className={style.options}>
            {
              React.Children.map(children, child =>
                React.cloneElement(child, {
                  onSelect: this.onSelect,
                }))
            }
          </div>
        }

      </div>
    );
  }
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  changeValue: PropTypes.func,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  name: PropTypes.string,
};

Select.defaultProps = {
  changeValue: () => {},
  name: '请选择...',
};
export default reactClickOutside(Select);
