import config from './config.json'
export default class Api {

  isBusy = false;

  constructor() {
    //console.log(jsonTest);
    this.apiUrl = config.apiUrl;
  }

  getData = (message, callBack) => {
    if (this.isBusy) {
      console.warn('busy');
      return;
    }
    console.log(this.apiUrl);
    console.log(message);
    this.isBusy = true;
    let request = fetch(
      this.apiUrl + '?message=' + encodeURI(message),
      {
        method: 'GET',
    })
      .then((res) => {
        return res.text();
      })
      .then(
        (result) => {
          this.isBusy = false;
          console.log(result);
          console.log(JSON.parse(result));
          callBack('success', result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.isBusy = false;
          console.warn(error);
          return(error)
        });
  };
}