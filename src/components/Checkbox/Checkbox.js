import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './Checkbox.scss';

const Checkbox = ({
  label, onChange, checked, className,
}) => (
  <div className={cn(style.main, className)}>
    {
      <label className={style.label}>
        <span>{label}</span>
        <input
          className={style.inputcheckbox}
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
        />
        <span
          className={cn(style.checkbox, {
            [style.checked]: checked,
          })}
        />
      </label>
    }
  </div>
);

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default Checkbox;
