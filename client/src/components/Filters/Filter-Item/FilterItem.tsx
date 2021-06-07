import * as React from "react";
import "./FilterItem.css";
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { toggleFilter } from "../../../store/Filters/actionCreators";

interface FilterItemProps {
  title: string;
  options: string[];
}



const FilterItem: React.FC<FilterItemProps> = ({ title, options }) => {
  const dispatch: Dispatch<any> = useDispatch()
  const filterOptions: FilterState = useSelector((state: any) => state.filters)

  const editOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.checked);
    // console.log(e.target.id);
    const filterOption: string = e.target.id;
    dispatch(toggleFilter(filterOption))
  }

  return (
    <>
      <div className="Filter-Item">
        <div className="Filter-Head">
          <h6>{title}</h6>
        </div>
        <div className="Filter-Options">
          {options.map((option, index) => {
            const filterKey = title.replace(/\s/g, "_").toLowerCase();
            return (
              <div className="Filter-Option">
                <input type={"checkbox"} id={`${filterKey}:${option}`}
                  onChange={editOption} checked={filterOptions[filterKey] === option ? true : false} />
                <label htmlFor={`${filterKey}:${option}`}>{option}</label>

              </div>
            );
          })}

        </div>
      </div>
    </>
  );
};

export default FilterItem;
