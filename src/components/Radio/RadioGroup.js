import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './Radio.scss';

const RadioGroup = ({
  className, onChange, selectValue, children, ...other
}) => (
  <div {...other} className={cn(style.group, className)}>
    {
      React.Children.map(children, child => React.cloneElement(child, {
        checked: selectValue === child.props.value,
        onChange,
      }))
    }


  </div>
);

RadioGroup.propTypes = {
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectValue: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default RadioGroup;
