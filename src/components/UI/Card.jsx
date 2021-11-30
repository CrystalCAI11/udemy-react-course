import "./Card.css"

export const Card = (props) => {
  return <div className={`card ${props.className}`}>{props.children}</div>
}
