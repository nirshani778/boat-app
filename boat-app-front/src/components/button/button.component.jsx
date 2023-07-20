import './button.styles.scss';

const Button = ({ name, ...otherProps }) => {
  return (
    <button className="custom-btn" {...otherProps}>
      {name}
    </button>
  );
};

export default Button;
