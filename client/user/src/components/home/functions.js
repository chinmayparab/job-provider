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

export const fetchRecommendations = (localAuthToken) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", localAuthToken);

  var raw = JSON.stringify({
    which: "pred_cat",
  });

  var requestOptions = {
    method: "POST",
    body: raw,
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(config.server + "/recommendations", requestOptions)
    .then((response) => response.json())
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      return false;
    });
};
