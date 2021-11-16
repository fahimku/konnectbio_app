import React, { useRef } from "react";
import Select from "react-select";

const FilterForm = ({
  categories,
  subCategories,
  changeSubCategoryHandle,
  selectSubCategories,
}) => {
  const selectRef = useRef();

  function reset() {
    selectRef.current.select.clearValue();
  }

  return (
    <div className="col-md-12 text-center">
      <form className="post-filter-form row mb-4">
        <div className="col-12 col-md-4 text-left mb-2">
          <Select
            placeholder="Select category"
            ref={selectRef}
            options={categories}
            onChange={(e) => changeSubCategoryHandle(e)}
          />
        </div>
        <div className="col-12 col-md-4 text-left mb-2">
          <Select
            placeholder="Select Subcategory"
            ref={selectRef}
            options={subCategories}
            isMulti
            onChange={(e) => selectSubCategories(e)}
          />
        </div>
        <div className="col col-md-4 text-left">
          <button
            onClick={reset}
            className="btn btn-secondary reset-button btn-block"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
export default FilterForm;
