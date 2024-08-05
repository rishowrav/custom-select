import React from "react";
import CustomSelect from "./components/CustomSelect";

const options = [
  { label: "Bangladesh", value: "1" },
  { label: "United States", value: "2" },
  { label: "Canada", value: "3" },
  { label: "Germany", value: "4" },
  { label: "Japan", value: "5" },
  { label: "Brazil", value: "6" },
  { label: "India", value: "7" },
  { label: "Australia", value: "8" },
  { label: "France", value: "9" },
  { label: "China", value: "10" },
];

const groupedOptions = {
  "Asian Countries:": [
    { label: "Bangladesh", value: "1" },
    { label: "India", value: "2" },
    { label: "China", value: "3" },
    { label: "Iran", value: "4" },
  ],
  "European Countries:": [
    { label: "United Kingdom", value: "5" },
    { label: "Spain", value: "6" },
    { label: "Romania", value: "7" },
    { label: "Norway", value: "8" },
  ],
};

function App() {
  const handleChange = (selectedValue) => {
    console.log("Selected Value:", selectedValue);
  };

  const handleMenuOpen = () => {
    console.log("Menu opened");
  };

  const handleSearch = (searchText) => {
    console.log("Search text:", searchText);
  };

  return (
    <div className="App " style={{ height: "100vh" }}>
      <h1 className="kzui-text__center">Custom Select</h1>
      <div className="kzui-customSelect__container">
        <div>
          {/* single select */}
          <h4>Single Select</h4>
          <CustomSelect
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            options={options}
            placeholder="Search Country"
            isGrouped={false}
            isMulti={false}
            onChangeHandler={handleChange}
            onMenuOpen={handleMenuOpen}
            onSearchHandler={handleSearch}
          />
        </div>

        <div>
          {/* multi select */}
          <h4>Multi Select</h4>
          <CustomSelect
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            options={options}
            placeholder="Search Country"
            isGrouped={false}
            isMulti
            onChangeHandler={handleChange}
            onMenuOpen={handleMenuOpen}
            onSearchHandler={handleSearch}
          />
        </div>

        <div>
          {/* multi select with group */}
          <h4>Multi Select with group</h4>
          <CustomSelect
            isClearable={true}
            isSearchable={false}
            isDisabled={false}
            options={groupedOptions}
            placeholder="Select Multiple Country"
            isGrouped
            isMulti
            onChangeHandler={handleChange}
            onMenuOpen={handleMenuOpen}
            onSearchHandler={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
