import * as React from "react";
import "./FilterItem.css";
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { toggleFilter } from "../../../store/actionCreators";

interface FilterItemProps {
  title: string;
  options: string[];
}



const FilterItem: React.FC<FilterItemProps> = ({ title, options }) => {
  const dispatch: Dispatch<any> = useDispatch()
  const filterOptions: FilterOption[] = useSelector(
    (state: FilterState) => state.filterOptions)

  const editOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.checked);
    // console.log(e.target.id);
    const filterOption: string = e.target.id
    dispatch(toggleFilter(filterOption))
    console.log(filterOptions)
  }

  return (
    <>
      <div className="Filter-Item">
        <div className="Filter-Head">
          <h6>{title}</h6>
        </div>
        <div className="Filter-Options">
          {options.map((option, index) => {
            return (
              <div className="Filter-Option">
                <input type={"checkbox"} id={`${title.replace(/\s/g, "-")}-${option.replace(/\s/g, "-")}-${index}`}
                  onChange={editOption} />
                <label htmlFor={`${title.replace(/\s/g, "-")}-${option.replace(/\s/g, "-")}-${index}`}>{option}</label>
                {filterOptions}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FilterItem;
