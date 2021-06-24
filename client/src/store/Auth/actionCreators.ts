import * as actionTypes from "./actionTypes"

export function setAuthAction(auth: AuthItem): AuthAction {
    return {
        type: actionTypes.SET_AUTH,
        auth
    }
}

