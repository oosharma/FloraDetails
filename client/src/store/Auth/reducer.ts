import * as actionTypes from "./actionTypes";

const initialState: AuthItem = {
  token: localStorage.getItem("token"),
  isAuthorized: false,
  isLoading: false,
  user: {},
};

export const reducer = (
  state: AuthItem = initialState,
  action: AuthAction
): AuthItem => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
        return  {...action.auth} ;
      }
  return state;
};


