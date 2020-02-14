// App.js
import React from 'react'
import { useAlert } from 'react-alert'

const Alert = (props) => {
  console.log('Alert props', props);
  const alert = useAlert();
  alert.show(props.errMsg);
  return (<></>);
};

export default Alert