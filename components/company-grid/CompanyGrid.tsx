import React from "react";
import './CompanyGrid.css'

interface CompanyGridProps {
    items: string[];
    activeBox: string | null;
    handleBoxClick: (box: string) => Promise<void>;
    sectorImages: Record<string, string>;
}

const CompanyGrid: React.FC<CompanyGridProps> = ({ items, activeBox, handleBoxClick, sectorImages }) => {
    return (
        <>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`company-grid-item ${activeBox === item ? "expanded" : ""}`}
                    onClick={() => handleBoxClick(item)}
                >
                    <div className="company-grid-content">
                        <p className="company-grid-title">{item}</p>
                        <div className="company-grid-img-container">
                            <img
                                src={sectorImages[item]}
                                alt={item}
                                className="company-grid-img"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CompanyGrid;
