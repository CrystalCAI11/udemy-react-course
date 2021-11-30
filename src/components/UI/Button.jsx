import "./Button.css"

export const Button = (props) => {
  return (
    <button
      className="button"
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
