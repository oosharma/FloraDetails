import * as actionTypes from "./actionTypes";

const initialState: FilterState = {
  filterOptions: [],
};

export const reducer = (
  state: FilterState = initialState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case actionTypes.TOGGLE_FILTER:

      if (state.filterOptions.includes(action.filterId)) {
        const updatedFilterOptions: FilterOption[] = state.filterOptions.filter(
          (item) => {
            return item !== action.filterId;
          }
        );
        return { filterOptions: updatedFilterOptions };
      }

      const updatedFilterOptions: FilterOption[] = state.filterOptions.concat(
        action.filterId
      );
 
      return { filterOptions: updatedFilterOptions };
  }
  return state;
};

 
