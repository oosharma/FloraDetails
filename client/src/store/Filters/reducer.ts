import * as actionTypes from "./actionTypes";
import { string } from "prop-types";

const initialState: FilterState = {
  "sizeAtMaturity": "null",
  "appropriateLocation": "null",
  "plantType": "null",
  "waterNeeds": "null",
  "bloomTime": "null",
  "suitableSiteConditions": "null"

};

export const reducer = (
  state: FilterState = initialState,
  action: FilterAction
): FilterState => {
  console.log(1234, action);
  switch (action.type) {
    case actionTypes.TOGGLE_FILTER:
      const key: string = action.filterId.split(":")[0];
      let val: string = action.filterId.split(":")[1];

      if (state[key] === val) {
        val = "null"
      }
      //  if (state[key] === null) {
      console.log(1234, { ...state, [key]: val });
      return { ...state, [key]: val };

    case actionTypes.FILTER_BY_NAME:


      //  if (state[key] === null) {

      return { ["name"]: action.filterId };
    // }

    // const updatedFilterOptions: FilterOption[] = state.filterOptions.concat(
    //   action.filterId
    // );

    // return { filterOptions: updatedFilterOptions };
  }
  return state;
};


