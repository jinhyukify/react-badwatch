import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: 'INIT'
    },
    status: {
        isLoggedIn: false,
        current_user: {}
    }
};

export default function authentication(state, action)
{
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type)
    {
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.AUTH_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' }
                },
                status: {
                    isLoggedIn: { $set: true },
                    current_user: { $set: action.current_user }
                }
            });    
        case types.AUTH_LOGIN_FAIL:
            return update(state, {
                login: {
                    status: { $set: 'FAIL' }
                }
            }); 
        case types.AUTH_LOGOUT:
            return update(state, {
                login: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.AUTH_LOGOUT_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'INIT' }
                },
                status: {
                    isLoggedIn: { $set: false },
                    current_user: { $set: {} }
                }
            })
        default:
            return state;       
    }
}
