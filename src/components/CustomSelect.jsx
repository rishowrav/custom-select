import React, { useState, useEffect } from "react";
import "../styles/CustomSelect.css";

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  options = [],
  value,
  placeholder,
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const [selectedValues, setSelectedValues] = useState(
    value || (isMulti ? [] : "")
  );
  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen && onMenuOpen) {
      onMenuOpen();
    }
  }, [menuOpen, onMenuOpen]);

  const handleSelect = (option) => {
    if (isMulti) {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter((val) => val !== option)
        : [...selectedValues, option];
      setSelectedValues(newValues);
      onChangeHandler(newValues);
    } else {
      setSelectedValues(option);
      onChangeHandler(option);
      setMenuOpen(false);
    }
  };

  const handleClear = (option) => {
    if (isMulti) {
      const newValues = selectedValues.filter((val) => val !== option);
      setSelectedValues(newValues);
      onChangeHandler(newValues);
    } else {
      setSelectedValues("");
      onChangeHandler("");
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    onSearchHandler(e.target.value);
  };

  // Search Filter
  const filteredOptions = isGrouped
    ? options
    : isSearchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      )
    : options;

  return (
    <div className={`kzui-customSelect ${isDisabled ? "disabled" : ""}`}>
      <div
        onClick={() => !isDisabled && setMenuOpen(!menuOpen)}
        className="kzui-customSelect__control"
      >
        <div className="kzui-customSelect__values kzui-height_40">
          {isMulti ? (
            selectedValues.map((val, index) => (
              <span key={index} className="kzui-customSelect__value">
                {val.label}
                {isClearable && (
                  <button
                    style={{
                      fontSize: 20,
                      background: "#d63031",
                      color: "white",
                      borderRadius: "5px",
                    }}
                    onClick={() => handleClear(val)}
                  >
                    &times;
                  </button>
                )}
              </span>
            ))
          ) : selectedValues ? (
            <span className="kzui-customSelect__value">
              {selectedValues.label}
              {isClearable && (
                <button
                  style={{
                    fontSize: 20,
                    background: "#d63031",
                    color: "white",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleClear(selectedValues)}
                >
                  {" "}
                  &times;
                </button>
              )}
            </span>
          ) : (
            <span className="kzui-placeholder"></span>
          )}{" "}
          {/* placeholder text */}
          <div
            className={`kzui-flex__item__center ${
              selectedValues.length || isSearchable ? "kzui-hidden" : ""
            }`}
          >
            <span className="kzui-placeholder">Select Country</span>
          </div>
        </div>
        {/* Search Input */}
        {isSearchable && (
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder={`${placeholder ? placeholder : "Search..."}`}
            disabled={isDisabled}
          />
        )}
        <div style={{ fontSize: 20, color: "gray" }}>&#11206;</div>
      </div>

      {/* Country List */}
      {menuOpen && (
        <div className="kzui-optionsList">
          {filteredOptions.length || isGrouped ? (
            isGrouped ? (
              Object.keys(filteredOptions).map((group, index) => (
                <div key={index} className="kzui-optionsList__group">
                  <div className="kzui-optionsList__group__label">{group}</div>
                  {filteredOptions[group].map((option, index) => (
                    <div
                      key={index}
                      className={`option ${
                        selectedValues.includes(option) ? "selected" : ""
                      }`}
                      onClick={() => handleSelect(option)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className={`option  ${
                    !isMulti
                      ? selectedValues?.label
                        ? selectedValues?.label.includes(option?.label)
                          ? "selected"
                          : ""
                        : ""
                      : selectedValues.includes(option)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))
            )
          ) : (
            <div className="kzui-optionsList__group">
              <div className="">Not Found...</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
