import React from "react";
import FilterOptionsTree from "../filter-options-tree/FilterOptionsTree";

interface DealAndInvestorsProps {
  handleCheckbox: (key: string) => void;
  handleSearchClick: () => void;
}

const DealAndInvestors: React.FC<DealAndInvestorsProps> = ({ handleCheckbox, handleSearchClick }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {/* Deal Size */}
        <div className="space-y-2">
          <label className="font-semibold">Deal size</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <label className="text-sm mr-2">Min</label>
              <input type="text" className="border p-2 w-full rounded-lg caret-black" placeholder="$ 1,000" />
            </div>
            <div className="flex items-center">
              <label className="text-sm mr-2">Max</label>
              <input type="text" className="border p-2 w-full rounded-lg caret-black" placeholder="$ 1,000,000" />
            </div>
          </div>
        </div>
        {/* Deal Date */}
        <div className="space-y-2 col-span-2">
          <label className="font-semibold">Deal date</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input type="radio" name="dateRange" className="mr-2" /> Custom dates
            </label>
            <label className="flex items-center mr-2">
              <input type="radio" name="dateRange" className="mr-2" /> Trailing ranges
            </label>
            <div className="flex items-center">
              <label className="text-sm mr-2">Min</label>
              <input type="text" className="border p-2 w-full rounded-lg caret-black" placeholder="$ 1,000" />
            </div>
            <div className="flex items-center">
              <label className="text-sm mr-2">Max</label>
              <input type="text" className="border p-2 w-full rounded-lg caret-black" placeholder="$ 1,000,000" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
        {/* Pre-money Valuation */}
        <div className="space-y-2">
          <label className="font-semibold">Pre-money Val</label>
          <div className="flex items-center space-x-4">
            <label className="text-sm mr-2">Min</label>
            <input type="text" className="border p-2 w-full rounded-lg caret-black" placeholder="$ 1,000" />
            <label className="text-sm mr-2">Max</label>
            <input type="text" className="border p-2 w-full rounded-lg caret-black" placeholder="$ 1,000,000" />
          </div>
        </div>
        {/* Past Valuation */}
        <div className="space-y-2">
          <label className="font-semibold">Past Valuation</label>
          <div className="flex items-center space-x-4">
            <label className="text-sm mr-2">Min</label>
            <input type="text" className="border p-2 w-full rounded-lg caret-black" placeholder="$ 1,000" />
            <label className="text-sm mr-2">Max</label>
            <input type="text" className="border p-2 w-full rounded-lg caret-black" placeholder="$ 1,000,000" />
          </div>
        </div>
        {/* Total Raised */}
        <div className="space-y-2">
          <label className="font-semibold">Total Raised</label>
          <div className="flex items-center space-x-4">
            <label className="text-sm mr-2">Min</label>
            <input type="text" className="border p-2 w-full rounded-lg caret-black" placeholder="$ 1,000" />
            <label className="text-sm mr-2">Max</label>
            <input type="text" className="border p-2 w-full rounded-lg caret-black" placeholder="$ 1,000,000" />
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-4 mb-4">
        <label className="font-semibold">Investors locations</label>
        <FilterOptionsTree fileName={'LocationsTree.json'} handleCheckbox={handleCheckbox} />
      </div>
      <hr />
      <div className="mt-4">
        <label className="font-semibold">Investors locations</label>
        <FilterOptionsTree fileName={'DealTypes.json'} handleCheckbox={handleCheckbox} />
      </div>
      <hr />
      <button
        className="w-32 rounded-lg mt-4 px-4 py-2 text-white bg-customPurple"
        onClick={() => handleSearchClick()}
      >
        Search
      </button>
    </div>
  );
};

export default DealAndInvestors;