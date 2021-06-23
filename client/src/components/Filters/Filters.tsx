import * as React from "react";
import FilterItem from "./Filter-Item/FilterItem";
import "./Filters.css";

interface FiltersProps {
  type: string;

}


const Filters: React.FC<FiltersProps> = (props) => {
  const items = [
    { name: "Bloom Time", options: ["Spring", "Summer", "Winter", "Fall"] }, { name: "Water Needs", options: ["None", "Low", "Moderate"] }, { name: "Appropriate Location", options: ["Garden", "Sidewalk", "Roof"] },
    {
      name: "Plant Type",
      options: [
        "Perennial",
        "Tree (evergreen)",
        "Tree (deciduous)",
        "Annual",
        "Succulent",
        "Grass",
        "Vine",
        "Palm",
      ],
    },

    {
      name: "Size at Maturity",
      options: [
        "< 1 ft",
        "1-3 ft",
        "4-6 ft",
        "7-12 ft",
        "13-24 ft",
        "> 24 ft",
        "Varies",
      ],
    },

    {
      name: "Suitable Site Conditions",
      options: ["Sun", "Parte Shade", "Shade", "Fall"],
    },
  ];

  return (
    <div className={`Filters-Section-${props.type}`}>
      <h3>Filters</h3>
      <div className={`Filters-${props.type}`}>
        {items.map((item, index) => {
          return <FilterItem title={item.name} options={item.options} />;
        })}
      </div>
    </div>
  );
};

export default Filters;
