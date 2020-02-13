import config from './config.json'
export default class Api {

  constructor() {
    //console.log(jsonTest);
    this.apiUrl = config.apiUrl;
  }

  getData = (message, callBack) => {
    console.log(message);
    console.log(this.apiUrl);
    let request = fetch(
      this.apiUrl + '?message=' + encodeURI(message),
      {
        method: 'GET',
    })
      .then((res) => {
        return res.json()
      })
      .then(
        (result) => {
          callBack('success', result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.warn(error);
          return(error)
        });
    console.log(request);
  };
}