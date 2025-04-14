import React from "react";
import './SearchBar.css'

interface SearchBarProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    searchResults: string[];
    handleSearchResultClick: (result: string) => void;
    showStepThree: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ inputValue, setInputValue, searchResults, handleSearchResultClick, showStepThree }) => {
    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder={showStepThree ? "Message ChatExM..." : "Message ExM"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
            <div className="search-results">
                {searchResults.map((result, index) => (
                    <div
                        key={index}
                        className="result-item"
                        onClick={() => handleSearchResultClick(result)}
                    >
                        {result}
                    </div>
                ))}
            </div>
        </>
    );
};

export default SearchBar;
