import AllCoursesService from './MyCoursesService';
import update from '../../../helpers/update';
export const MY_COURSES_STARTED = "MY_COURSES_STARTED";
export const MY_COURSES_SUCCESS = "MY_COURSES_SUCCESS";
export const MY_COURSES_FAILED = "MY_COURSES_FAILED";

export const UNSUBSCRIBE_COURSE_STARTED = "UNSUBSCRIBE_COURSE_STARTED";
export const UNSUBSCRIBE_COURSE_SUCCESS = "UNSUBSCRIBE_COURSE_SUCCESS";
export const UNSUBSCRIBE_COURSE_FAILED = "UNSUBSCRIBE_COURSE_FAILED";

const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },
}

export const getMyCourses = () => {
    return (dispatch) => {
        dispatch(getListActions.started());
        AllCoursesService.getMyCourses()
            .then((response) => {
                console.log("response", response);
                dispatch(getListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err));
            });
    }
}

export const unsubscribeCourse = (model) => {
    return (dispatch) => {
        dispatch(getUnsubscribeListActions.started());
        AllCoursesService.unsubscribeCourse(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getUnsubscribeListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getUnsubscribeListActions.failed(err));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: MY_COURSES_STARTED
        }
    },
    success: (data) => {
        return {
            type: MY_COURSES_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: MY_COURSES_FAILED,
            errors: error
        }
    }
}

export const getUnsubscribeListActions = {
    started: () => {
        return {
            type: UNSUBSCRIBE_COURSE_STARTED
        }
    },
    success: (data) => {
        return {
            type: UNSUBSCRIBE_COURSE_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: UNSUBSCRIBE_COURSE_FAILED,
            errors: error
        }
    }
}

export const myCoursesReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case MY_COURSES_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case MY_COURSES_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            break;
        }
        case MY_COURSES_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        case UNSUBSCRIBE_COURSE_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case UNSUBSCRIBE_COURSE_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            break;
        }
        case UNSUBSCRIBE_COURSE_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        default: {
            return newState;
        }
    }
    return newState;
}