import update from "../../../helpers/update";
import RegisterService from "./RegisterService";

export const REGISTER_POST_STARTED = "REGISTER_POST_STARTED";
export const REGISTER_POST_SUCCESS = "REGISTER_POST_SUCCESS";
export const REGISTER_POST_FAILED = "REGISTER_POST_FAILED";
export const REGISTER_SET_CURRENT_USER = "REGISTER/SET_CURRENT_USER";

const initialState = {
  post: {
    loading: false,
    success: false,
    failed: false,
    errors: {}
  },
};

export const registerReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case REGISTER_POST_STARTED: {
      newState = update.set(state, "post.loading", true);
      newState = update.set(newState, "post.success", false);
      newState = update.set(newState, "post.errors",{});
      newState = update.set(newState, "post.failed", false);
      break;
    }
    case REGISTER_POST_SUCCESS: {
      newState = update.set(state, "post.loading", false);
      newState = update.set(newState, "post.failed", false);
      newState = update.set(newState, "post.success", true);
      break;
    }
    case REGISTER_POST_FAILED: {
      newState = update.set(state, "post.loading", false);
      newState = update.set(newState, "post.success", false);
      newState = update.set(newState, "post.errors", action.errors);
      newState = update.set(newState, "post.failed", true);
      break;
    }
    default: {
      return newState;
    }
  }
  return newState;
};

export function Register(data) {
  return dispatch => {
    dispatch(registerListActions.started());
    RegisterService.register(data)
      .then(res => {
        console.log("then", res);
        dispatch(registerListActions.success());
      },
      err => { throw err; })
      .catch (err => {
        console.log("error", err);
      dispatch(registerListActions.failed(err.response));
    });
  }
}

export const registerListActions = {
  started: () => {
    return {
      type: REGISTER_POST_STARTED
    }
  },
  success: () => {
    return {
      type: REGISTER_POST_SUCCESS,
    }
  },
  failed: (error) => {
    return {
      type: REGISTER_POST_FAILED,
      errors: error.data
    }
  }
}