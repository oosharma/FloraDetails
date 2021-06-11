import * as React from "react";
import FilterItem from "./Filter-Item/FilterItem";
import "./Filters.css";

const Filters: React.FC = () => {
  const items = [
    { name: "Bloom Time", options: ["Spring", "Summer", "Winter", "Fall"] },
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
    { name: "Water Needs", options: ["None", "Low", "Moderate"] },
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
    { name: "Appropriate Location", options: ["Garden", "Sidewalk", "Roof"] },
    {
      name: "Suitable Site Conditions",
      options: ["Sun", "Parte Shade", "Shade", "Fall"],
    },
  ];

  return (
    <div className="Filters-Section">
      <h3>Filters</h3>
      <div className="Filters">
        {items.map((item, index) => {
          return <FilterItem title={item.name} options={item.options} />;
        })}
      </div>
    </div>
  );
};

export default Filters;
