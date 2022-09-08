import '../../css/Input.css';
import cx from 'classnames';
function Input({ onChange, value, placeholder, type, error, maxLength, onBlur }) {
  return (
    <div className='inputContainer'>
      <input
        onChange={onChange}
        className={cx('input', { inputError: error })}
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onBlur={onBlur}
        min={0}
      />
      <div className='inputErrorText'>{error ? error : ''}</div>
    </div>
  );
}

export default Input;
