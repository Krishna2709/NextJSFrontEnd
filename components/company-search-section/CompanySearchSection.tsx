import React, { useEffect, useState } from "react";
import './CompanySearchSection.css'
import FilterOptionsTree from "./filter-options-tree/FilterOptionsTree";
import BusinessDescription from './business-description/BusinessDescription'
import DealAndInvestors from "./deals-and-investors/DealsAndInvestors";
import FinancialMetrics from "./financial-metrics/FinancialMetrics";
import IntellectualProperty from "./intellectual-property/IntellectualProperty";

interface CompanySearchSectionProps {
    selectedBox: string | null;
    handleBusinessSearch: (text: string, option: string) => void;
    handleCheckboxChange: (key: string) => void;
    handleBoxClick: (box: string) => void;
    handleDealsSearch: () => void;
    handleFinancialMetricsSearch: (financialMetrics: FinancialMetrics, fiscalPeriod: FiscalPeriod) => void;
    handleIPSearch: (data: IntellectualPropertyData) => void;
}

const CompanySearchSection: React.FC<CompanySearchSectionProps> = ({ selectedBox, handleBusinessSearch, handleCheckboxChange, handleBoxClick, handleDealsSearch, handleFinancialMetricsSearch, handleIPSearch }) => {
    const companyFilterItems: string[] = [
        "Sectors and Industries",
        "Locations",
        "Business Description",
        "Business Cycles and Backing Status",
        "Deals and Investors",
        "Financial Metrics",
        "Intellectual Property",
    ]
    const jsonFileName: any = {
        "Sectors and Industries": "output.json",
        "Locations": "LocationsTree.json",
        "Business Cycles and Backing Status": "BusinessCycle.json"
    }

    const [activeItem, setActiveItem] = useState(selectedBox ? selectedBox : "")

    useEffect(() => {
        setActiveItem(selectedBox || "");
    }, [selectedBox]);

    const filterOptionsElements = () => (
        <div className="filter-container">
            {activeItem === 'Business Description' && <BusinessDescription handleSearchClick={handleBusinessSearch} />}
            {activeItem === 'Deals and Investors' && <DealAndInvestors handleCheckbox={handleCheckboxChange} handleSearchClick={handleDealsSearch} />}
            {activeItem === 'Intellectual Property' && <IntellectualProperty handleSearchClick={handleIPSearch} />}

            <div className={activeItem === 'Financial Metrics' ? '' : 'hidden'}>
                <FinancialMetrics handleSearchClick={handleFinancialMetricsSearch} />
            </div>

            <div className={`filter-section ${["Sectors and Industries", "Locations", "Business Cycles and Backing Status"].includes(activeItem) ? '' : 'hidden'}`}>
                <FilterOptionsTree fileName={jsonFileName[activeItem]} handleCheckbox={handleCheckboxChange} />
            </div>
        </div>
    );

    const changeActiveItem = (item: string) => {
        setActiveItem(item);
        handleBoxClick(item);
    }

    return (
        <>
            <section className="company-search-section-container flex">
                <div className="w-48 h-full shrink-0 py-5">
                    <nav>
                        <ul>
                            {companyFilterItems.map((item) => (
                                <li
                                    key={item}
                                    className={`px-4 py-3 cursor-pointer ${activeItem === item ? 'bg-white text-black' : ''
                                        }`}
                                    onClick={() => changeActiveItem(item)}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="flex-1 p-6 overflow-auto search-section">
                    <h3 className="font-semibold">{activeItem}</h3>
                    {filterOptionsElements()}
                </div>
            </section>
        </>
    );
};

export default CompanySearchSection;
