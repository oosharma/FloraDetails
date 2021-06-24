import * as actionTypes from "./actionTypes"

export function toggleFilter(filterId: FilterOption) {
    return {
        type: actionTypes.TOGGLE_FILTER,
        filterId: filterId
    }
}


export function filterByName(name: string) {
    return {
        type: actionTypes.FILTER_BY_NAME,
        filterId: name
    }
}