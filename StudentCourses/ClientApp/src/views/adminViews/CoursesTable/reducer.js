import CoursesTableService from './CoursesTableServices';
import update from '../../../helpers/update';
export const COURSES_TABLE_STARTED = "COURSES_TABLE_STARTED";
export const COURSES_TABLE_SUCCESS = "COURSES_TABLE_SUCCESS";
export const COURSES_TABLE_FAILED = "COURSES_TABLE_FAILED";

export const DELETE_COURSE_STARTED = "DELETE_COURSE_STARTED";
export const DELETE_COURSE_SUCCESS = "DELETE_COURSE_SUCCESS";
export const DELETE_COURSE_FAILED = "DELETE_COURSE_FAILED";

export const EDIT_COURSE_STARTED = "EDIT_COURSE_STARTED";
export const EDIT_COURSE_SUCCESS = "EDIT_COURSE_SUCCESS";
export const EDIT_COURSE_FAILED = "EDIT_COURSE_FAILED";

export const IMAGE_STARTED = "IMAGE_STARTED";
export const IMAGE_SUCCESS = "IMAGE_SUCCESS";
export const IMAGE_FAILED = "IMAGE_FAILED";

const initialState = {
    list: {
        data: null,
        loading: false,
        success: false,
        failed: false,
    },
}

export const getCourses = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        CoursesTableService.getCourses(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err));
            });
    }
}

export const deleteCourse = (model) => {
    return (dispatch) => {
        dispatch(getDeleteListActions.started());
        CoursesTableService.deleteCourse(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getDeleteListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("err", err);
                dispatch(getDeleteListActions.failed(err));
            });
    }
}

export const editCourse = (model) => {
    return (dispatch) => {
        dispatch(getEditListActions.started());
        CoursesTableService.editCourse(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getEditListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("err", err);
                dispatch(getEditListActions.failed(err));
            });
    }
}

export const changeImage = (model) => {
    return (dispatch) => {
        dispatch(getChangeImageListActions.started());
        CoursesTableService.changeImage(model)
            .then((response) => {
                dispatch(getChangeImageListActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getChangeImageListActions.failed(err.response));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: COURSES_TABLE_STARTED
        }
    },
    success: (data) => {
        return {
            type: COURSES_TABLE_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: COURSES_TABLE_FAILED,
            errors: error
        }
    }
}

export const getDeleteListActions = {
    started: () => {
        return {
            type: DELETE_COURSE_STARTED
        }
    },
    success: (data) => {
        return {
            type: DELETE_COURSE_SUCCESS,
            deletePayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: DELETE_COURSE_FAILED,
            payloadError:error
        }
    }
}

export const getEditListActions = {
    started: () => {
        return {
            type: EDIT_COURSE_STARTED
        }
    },
    success: (data) => {
        return {
            type: EDIT_COURSE_SUCCESS,
            deletePayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: EDIT_COURSE_FAILED,
            payloadError:error
        }
    }
}

export const getChangeImageListActions = {
    started: () => {
        return {
            type: COURSES_TABLE_STARTED
        }
    },
    success: (data) => {
        return {
            type: COURSES_TABLE_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: COURSES_TABLE_FAILED,
            errors: error
        }
    }
}

export const coursesTableReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case COURSES_TABLE_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case COURSES_TABLE_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            break;
        }
        case COURSES_TABLE_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        case DELETE_COURSE_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.errors', {});
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case DELETE_COURSE_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.messageResult', action.deletePayload);
            newState = update.set(newState, 'list.errors', {});
            break;
        }
        case DELETE_COURSE_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, 'list.errors', action.payloadError);
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case EDIT_COURSE_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.errors', {});
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case EDIT_COURSE_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.messageResult', action.deletePayload);
            newState = update.set(newState, 'list.errors', {});
            break;
        }
        case EDIT_COURSE_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, 'list.errors', action.payloadError);
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case IMAGE_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case IMAGE_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.image', action.payload);         
            break;
        }
        case IMAGE_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, "list.errors", action.errors);
            break;
        }
        default: {
            return newState;
        }
    }
    return newState;
}