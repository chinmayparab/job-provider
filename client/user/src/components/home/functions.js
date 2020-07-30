import config from "../../config";

export const fetchLocations = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(config.server + "/locationsfield", requestOptions)
    .then((response) => response.json())
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const fetchTitles = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(config.server + "/titlesfield", requestOptions)
    .then((response) => response.json())
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      return false;
    });
};
