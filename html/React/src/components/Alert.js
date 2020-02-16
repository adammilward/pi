// App.js
import React from 'react'
import { useAlert } from 'react-alert'

const Alert = (props) => {
  const alert = useAlert();
  alert.show(props.alert.message, {...props.alert});
  return (<></>);
};

export default Alert