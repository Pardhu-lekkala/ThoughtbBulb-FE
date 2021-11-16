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
