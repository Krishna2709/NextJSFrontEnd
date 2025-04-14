import React from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown } from 'lucide-react';
import './ResultsTable.css'

interface ResultsTableProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    sectionData: Record<string, SectionItem[]>;
    results: TableRow[];
    handleRowClick: (companyName: string) => void;
    hoveredColumn: string | null;
    setHoveredColumn: (column: string | null) => void;
    expandedSections: Record<string, boolean>;
    toggleSection: (title: string) => void;
    handleBackToCriteria: () => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
    activeSection,
    setActiveSection,
    sectionData,
    results,
    handleRowClick,
    hoveredColumn,
    setHoveredColumn,
    expandedSections,
    toggleSection,
    handleBackToCriteria
}) => {
    return (
        <div className="results-overlay">
            <div className="results-view">
                <div className="results-header">
                    <button className="back-button" onClick={handleBackToCriteria}>
                        <Image src="/icons/left_arrows.png" alt="Back" width={40} height={40} />
                    </button>
                    <h5 className="results-title" style={{ color: "white" }}>Search Results</h5>
                </div>
                <div className="results-container">
                    <div className="results-left-column narrow">
                        <div className="sections-list">
                            {Object.keys(sectionData).map((sectionTitle) => (
                                <div
                                    key={sectionTitle}
                                    style={{ cursor: "pointer" }}
                                    className={`section-nav-item ${activeSection === sectionTitle ? "active" : ""}`}
                                    onClick={() => {
                                        setActiveSection(sectionTitle);
                                        toggleSection(sectionTitle);
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <h3>{sectionTitle}</h3>
                                        <span>
                                            {expandedSections[sectionTitle] ? <ChevronUp color="white" /> : <ChevronDown color="white" />}
                                        </span>
                                    </div>
                                    {expandedSections[sectionTitle] && (
                                        <div className="subitems-list">
                                            {sectionData[sectionTitle].map((item, index) => (
                                                (index > 0 || sectionTitle === "Company Overview") && (
                                                    <div
                                                        key={item.dataKey}
                                                        className="subitem"
                                                        onClick={() => {
                                                            setHoveredColumn(item.dataKey);
                                                            requestAnimationFrame(() => {
                                                                const colIndex = sectionData[activeSection].findIndex(
                                                                    (col) => col.dataKey === item.dataKey
                                                                );
                                                                const table = document.querySelector(".scrollable-table");
                                                                if (table && colIndex >= 0) {
                                                                    const headerCells = table.querySelectorAll("thead th");
                                                                    const targetHeader = headerCells[colIndex] as HTMLElement;
                                                                    if (targetHeader) {
                                                                        const offset = targetHeader.offsetLeft;
                                                                        table.scrollTo({ left: offset - 700, behavior: "smooth" });
                                                                    }
                                                                }
                                                            });
                                                        }}
                                                    >
                                                        {item.header}
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="results-right-column wide">
                        <div className="scrollable-table" style={{ overflow: 'auto', maxHeight: '84vw' }}>
                            <table>
                                <thead>
                                    <tr>
                                        {sectionData[activeSection].map((item, index) => (
                                            <th
                                                key={item.dataKey}
                                                style={{
                                                    background: "rgba(0, 9, 72, 1)",
                                                    color: "white",
                                                    width: "150px",
                                                    position: "sticky",
                                                    top: 0,
                                                    zIndex: index === 0 ? 3 : 2,
                                                    left: index === 0 ? 0 : "auto"
                                                }}
                                                className={hoveredColumn === item.dataKey ? "column-highlight" : ""}
                                            >
                                                {item.header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((row, rowIndex) => (
                                        <tr
                                            key={rowIndex}
                                            onClick={() => handleRowClick(row.companyLegalName)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {sectionData[activeSection].map((item, colIndex) => (
                                                <td
                                                    key={item.dataKey}
                                                    style={{
                                                        position: colIndex === 0 ? "sticky" : "static",
                                                        left: colIndex === 0 ? 0 : "auto",
                                                        background: colIndex === 0 ? "#fff" : "inherit",
                                                        zIndex: colIndex === 0 ? 1 : "auto"
                                                    }}
                                                >
                                                    {row[item.dataKey as keyof TableRow] || "N/A"}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsTable;
