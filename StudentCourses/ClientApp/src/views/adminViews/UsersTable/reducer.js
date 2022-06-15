import UsersTableService from './UsersTableService';
import update from '../../../helpers/update';
export const USERS_TABLE_STARTED = "USERS_TABLE_STARTED";
export const USERS_TABLE_SUCCESS = "USERS_TABLE_SUCCESS";
export const USERS_TABLE_FAILED = "USERS_TABLE_FAILED";

export const DELETE_USER_STARTED = "DELETE_USER_STARTED";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILED = "DELETE_USER_FAILED";

export const EDIT_USER_STARTED = "EDIT_USER_STARTED";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAILED = "EDIT_USER_FAILED";


const initialState = {
    list: {
        data: null,
        loading: false,
        success: false,
        failed: false,
    },
}

export const getUsers = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        UsersTableService.getUsers(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err));
            });
    }
}

export const deleteUser = (model) => {
    return (dispatch) => {
        dispatch(getDeleteListActions.started());
        UsersTableService.deleteUser(model)
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

export const editUser = (model) => {
    return (dispatch) => {
        dispatch(getEditListActions.started());
        UsersTableService.editUser(model)
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

export const getListActions = {
    started: () => {
        return {
            type: USERS_TABLE_STARTED
        }
    },
    success: (data) => {
        return {
            type: USERS_TABLE_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: USERS_TABLE_FAILED,
            errors: error
        }
    }
}

export const getDeleteListActions = {
    started: () => {
        return {
            type: DELETE_USER_STARTED
        }
    },
    success: (data) => {
        return {
            type: DELETE_USER_SUCCESS,
            deletePayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: DELETE_USER_FAILED,
            payloadError:error
        }
    }
}

export const getEditListActions = {
    started: () => {
        return {
            type: EDIT_USER_STARTED
        }
    },
    success: (data) => {
        return {
            type: EDIT_USER_SUCCESS,
            editPayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: EDIT_USER_FAILED,
            payloadError:error
        }
    }
}

export const usersTableReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case USERS_TABLE_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case USERS_TABLE_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            break;
        }
        case USERS_TABLE_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        case DELETE_USER_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.errors', {});
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case DELETE_USER_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.messageResult', action.deletePayload);
            newState = update.set(newState, 'list.errors', {});
            break;
        }
        case DELETE_USER_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, 'list.errors', action.payloadError);
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case EDIT_USER_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.errors', {});
            break;
        }
        case EDIT_USER_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.editPayload);
            newState = update.set(newState, 'list.data', action.editPayload);
            newState = update.set(newState, 'list.data', action.editPayload);
            newState = update.set(newState, 'list.messageResult', "success");
            break;
        }
        case EDIT_USER_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, 'list.errors', action.payloadError);
            break;
        }
        default: {
            return newState;
        }
    }
    return newState;
}