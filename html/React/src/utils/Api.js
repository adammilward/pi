export default class Api {
  getData = () => {
    //let url = "van_data.php";
    let url = "http://thx1138-dev/van_data.php";
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   firstParam: 'yourValue',
      //   secondParam: 'yourOtherValue',
      // }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          return(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.warn(error);
          return(error)
        });
  };
}