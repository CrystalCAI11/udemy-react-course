import React from "react"
import ReactDOM from "react-dom"
import { Card } from "./Card"
import { Button } from "./Button"
import "./ErrorModal.css"

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onConfirm} />
}

const ModalOverlay = (props) => {
  return (
    <Card className="modal">
      <header className="header">
        <h2>{props.title}</h2>
      </header>
      <div className="content">
        <p>{props.message}</p>
      </div>
      <footer className="actions">
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  )
}

// ReactDOM.createPortal 把dom render在public/index.html的指定位置。不管从哪里调用它都render在固定的dom里，可以优化性能。
export const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  )
}
