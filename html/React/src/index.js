import React from "react"
import ReactDOM from "react-dom"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from "./components/App.js"

// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
};

if (window.config === undefined) {
  window.config = {
    "apiUrl": "http://thx1138",
    "websocket": {
      "host": "192.168.1.6",
      "port": "1138"
    }
  }
}

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
  , document.getElementById("root")
);