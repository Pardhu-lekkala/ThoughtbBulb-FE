/* import { AWSAPI } from "../../utils/functions/api";
import { purgeStore } from "../../utils/functions/purgeStore";

import { showSnackbar, toggleSignInLoading, toggleSignUpLoading } from "./ui";

export const setUser = (User) => {
  return {
    type: "SET_USER",
    payload: User,
  };
};

//SIGNIN
export const startSetUser = (loginData, history) => {
  return async (dispatch) => {
    dispatch(toggleSignInLoading(true));
    AWSAPI("post", "/vsignin", {
      body: { username: loginData.email, password: loginData.password },
    })
      .then((res) => {
        dispatch(setUser(res));
        dispatch(toggleSignInLoading(false));
        history.push("/overview");
      })
      .catch((error) => {
        //console.log(error);
        dispatch(toggleSignInLoading(false));
        dispatch(showSnackbar(error.response.data.message, "error"));
      });
  };
};

//SIGNUP
export const startAddUser = (registerData, deviceData, history) => {
  return async (dispatch) => {
    dispatch(toggleSignUpLoading(true));
    AWSAPI("post", "/vsignup", {
      body: {
        email: registerData.email,
        username: registerData.username,
        password: registerData.password,
        phone: registerData.mobile ? registerData.mobile : "",
        street: deviceData.street,
        city: deviceData.city,
        state: deviceData.state,
        zip: deviceData.zip,
        name: deviceData.name,
        website: deviceData.website,
      },
    })
      .then((res) => {
        dispatch(toggleSignUpLoading(false));
        dispatch(showSnackbar("Signup successful !", "success"));
        history.push("/signin");
      })
      .catch((error) => {
        //console.log(error);
        dispatch(toggleSignUpLoading(false));
        if (error?.response?.data?.message) {
          dispatch(showSnackbar(error.response.data.message, "error"));
        } else if (error?.response?.data?.msg) {
          dispatch(showSnackbar(error.response.data.msg, "error"));
        }
      });
  };
};

//LOGOUT
export const startLogoutUser = (history) => {
  return async (dispatch) => {
    try {
      purgeStore(dispatch);
      history.push("/signin");
    } catch (error) {
      //console.log("error signing out: ", error);
    }
  };
};
 */