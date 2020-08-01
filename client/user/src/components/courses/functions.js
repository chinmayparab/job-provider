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

export const fetchAppliedCourses = (token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(config.server + "/user-enrolled-courses", requestOptions)
    .then((response) => response.json())
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const enrolCourses = (course_id, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token);

  var raw = JSON.stringify({
    course_id: course_id,
  });

  var requestOptions = {
    method: "POST",
    body: raw,
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(config.server + "/enroll-course", requestOptions)
    .then((response) => response.json())
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      return false;
    });
};
