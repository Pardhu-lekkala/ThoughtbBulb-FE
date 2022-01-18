import axios from "../../config/axios";

export const setProject = (Project) => {
  return {
    type: "SET_PROJECT",
    payload: Project,
  };
};

export const startSetProject = (accesscode) => {
  return async (dispatch) => {
    axios
      .get(`/projects/access/${accesscode}`)
      .then((response) => {
        dispatch(setProject(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const startSetProjectStatic = (accesscode) => {
  return async (dispatch) => {
    axios
      //.get(`https://conference-deploy.s3.amazonaws.com/${accesscode}.json`)
      .get(
        `https://conference-static-bucket.s3.us-east-2.amazonaws.com/${accesscode}.json`
      )
      .then((response) => {
        dispatch(setProject(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
