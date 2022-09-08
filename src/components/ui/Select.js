import '../../css/Input.css';
import cx from 'classnames';
function Select({ onChange, value, error, onBlur, children }) {
  return (
    <div className='inputContainer'>
      <select
        onChange={onChange}
        className={cx('input', { inputError: error })}
        value={value}
        onBlur={onBlur}
      >
        {children}
      </select>
      <div className='inputErrorText'>{error ? error : ''}</div>
    </div>
  );
}

export default Select;
