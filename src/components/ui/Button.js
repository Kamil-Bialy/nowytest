import '../../css/button.css';
function Button({ value, onClick, disabled , color}) {
  return <input onClick={onClick} type='button' className={"button button"+color} value={value} disabled={disabled} />;
}
export default Button;
