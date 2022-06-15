import update from "../../../helpers/update";
import AddCourseService from "./AddCourseService";

export const ADD_COURSE_STARTED = "ADD_COURSE_STARTED";
export const ADD_COURSE_SUCCESS = "ADD_COURSE_SUCCESS";
export const ADD_COURSE_FAILED = "ADD_COURSE_FAILED";

const initialState = {
  post: {
    loading: false,
    success: false,
    failed: false,
    errors: {}
  },
};

export const addCourseReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case ADD_COURSE_STARTED: {
      newState = update.set(state, "post.loading", true);
      newState = update.set(newState, "post.success", false);
      newState = update.set(newState, "post.errors",{});
      newState = update.set(newState, "post.failed", false);
      break;
    }
    case ADD_COURSE_SUCCESS: {
      newState = update.set(state, "post.loading", false);
      newState = update.set(newState, "post.failed", false);
      newState = update.set(newState, "post.success", true);
      break;
    }
    case ADD_COURSE_FAILED: {
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

export function addCourse(model) {
  return dispatch => {
    dispatch(addCourseListActions.started());
    AddCourseService.addCourse(model)
      .then(res => {
        console.log("then", res);
        dispatch(addCourseListActions.success());
      },
      err => { throw err; })
      .catch (err => {
        console.log("error", err);
      dispatch(addCourseListActions.failed(err.response));
    });
  }
}

export const addCourseListActions = {
  started: () => {
    return {
      type: ADD_COURSE_STARTED
    }
  },
  success: () => {
    return {
      type: ADD_COURSE_SUCCESS,
    }
  },
  failed: (error) => {
    return {
      type: ADD_COURSE_FAILED,
      errors: error.data
    }
  }
}