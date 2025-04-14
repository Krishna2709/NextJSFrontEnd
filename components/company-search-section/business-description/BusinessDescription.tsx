import React, { useState } from "react";
import './BusinessDescription.css'

interface BusinessDescriptionProps {
    handleSearchClick: (text: string, option: string) => void;
}

const BusinessDescription: React.FC<BusinessDescriptionProps> = ({handleSearchClick}) => {
    const [text, setText] = useState('');
    const [selectedOption, setSelectedOption] = useState<string>("AND");

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= 255) {
            setText(event.target.value);
        }
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="flex flex-col">
            <textarea
                className="w-1/2 my-4 border border-gray-300 rounded-lg p-2"
                placeholder="Text"
                rows={4}
                onChange={handleTextChange}
            />
            <div className="flex flex-col w-full">
                <label className="mb-2 text-sm">
                    <input
                        type="radio"
                        name="keywordOption"
                        value="AND"
                        className="mr-2"
                        onChange={handleRadioChange}
                        checked={selectedOption === 'AND'}
                    />
                    AND <span className="text-gray-400">(Requires all listed keywords to be present in the company description)</span>
                </label>
                <label className="mb-2 text-sm">
                    <input
                        type="radio"
                        name="keywordOption"
                        value="OR"
                        className="mr-2"
                        onChange={handleRadioChange}
                    />
                    OR <span className="text-gray-400">(Allows for any of the listed keywords to be present in the company description)</span>
                </label>
                <label className="mb-4 text-sm">
                    <input
                        type="radio"
                        name="keywordOption"
                        value="NOT"
                        className="mr-2"
                        onChange={handleRadioChange}
                    />
                    NOT <span className="text-gray-400">(Excludes results that contain the specified keyword)</span>
                </label>
            </div>
            <hr />
            <button
                className="w-32 rounded-lg mt-4 px-4 py-2 text-white bg-customPurple"
                onClick={() => handleSearchClick(text, selectedOption)}
            >
                Search
            </button>
        </div>
    );
};

export default BusinessDescription;
