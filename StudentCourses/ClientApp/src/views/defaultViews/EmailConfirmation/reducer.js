import EmailConfirmationService from './EmailConfirmationService';
import update from '../../../helpers/update';
export const EMAIL_CONFIRMATION_STARTED = "EMAIL_CONFIRMATION_STARTED";
export const EMAIL_CONFIRMATION_SUCCESS = "EMAIL_CONFIRMATION_SUCCESS";
export const EMAIL_CONFIRMATION_FAILED = "EMAIL_CONFIRMATION_FAILED";

const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },
}

export const emailConfirmation = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        EmailConfirmationService.emailConfirmation(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: EMAIL_CONFIRMATION_STARTED
        }
    },
    success: (data) => {
        return {
            type: EMAIL_CONFIRMATION_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: EMAIL_CONFIRMATION_FAILED,
            errors: error
        }
    }
}

export const emailConfirmationReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case EMAIL_CONFIRMATION_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case EMAIL_CONFIRMATION_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            break;
        }
        case EMAIL_CONFIRMATION_FAILED: {
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