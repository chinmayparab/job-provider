import config from "../../config";

export const fetchCourses = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    category: "",
  });

  var requestOptions = {
    method: "POST",
    body: raw,
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(config.server + "/allcourses", requestOptions)
    .then((response) => response.json())
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      return false;
    });
};
