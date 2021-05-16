import * as actionTypes from "./actionTypes"

export function toggleFilter(filterId: FilterOption){
    return {
        type: actionTypes.TOGGLE_FILTER,
        filterId: filterId
    }
}