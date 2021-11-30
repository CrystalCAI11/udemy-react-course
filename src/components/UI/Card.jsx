import "./Card.css"

export const Card = (props) => {
  const classes = props.className // 开放式tag自定义组件的className只能当成props传入
  return <div className={classes}>{props.children}</div> // props.children 是组件在外面引用的时候包裹的子元素
}
