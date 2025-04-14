'use client'
import React, { useState, useEffect, useRef, UIEvent, ChangeEvent } from "react";
import "./CompanyScreening.css";
import Image from "next/image";
import SearchServices from "@/service/SearchServices";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { SECTION_DATA, SECTION_DATA_OLD, TABLE_ROW_ITEM } from "./data";

import AppHeader from "@/components/app-header/AppHeader";
import CriteriaList from "@/components/criteria-list/CriteriaList";
import SearchBar from "@/components/search-bar/SearchBar";
import ResultsOverlay from "@/components/results-table/ResultsTable";
import CompanyGrid from "@/components/company-grid/CompanyGrid";
import CompanySearchSection from "@/components/company-search-section/CompanySearchSection";

const CompanyScreening: React.FC = () => {
    const idCounter = useRef<number>(1);
    let firstColumn = "Company Overview"

    const [selectedBox, setSelectedBox] = useState<string | null>(null);
    const [selectedCriteria, setSelectedCriteria] = useState<Criteria[]>([]);
    const [data, setData] = useState<any>({});
    const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [apiData, setApiData] = useState<any>(null);
    const [locationsData, setLocationsData] = useState<any>({});
    const [editingCriteria, setEditingCriteria] = useState<Criteria | null>(null);
    const [showBusinessDescriptionGrid, setShowBusinessDescriptionGrid] = useState<boolean>(false);
    const [businessDescriptionQuery, setBusinessDescriptionQuery] = useState<string>("");
    const [logicalOperator, setLogicalOperator] = useState<"AND" | "OR" | "NOT">("AND");
    const [showResults, setShowResults] = useState<boolean>(false);
    const [results, setResults] = useState<any[]>([]);
    const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<string>(firstColumn);
    const [welcomeMessage, setWelcomeMessage] = useState<string>("");
    const [isSectorsExpanded, setIsSectorsExpanded] = useState<boolean>(false);
    const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
    const [sectorMessage, setSectorMessage] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");
    const [showStepThree, setShowStepThree] = useState<boolean>(false);
    const [dealTypesData, setDealTypesData] = useState<any>(null);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);

    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

                                                const toggleSection = (title: string) => {
                                                    setExpandedSections(prev => ({ ...prev, [title]: !prev[title] }));
                                                };

    // BACKEDN SEARCH

    // console.log("searchQuery",  searchQuery)
    // console.log("selectedCriteria",  selectedCriteria )

    useEffect(() => {
        const fetchData = async () => {
            const resp = await SearchServices.getIntelliSearchResults({
                "GICS_PRIMARY_INDUSTRY": "Biotechnology"
            });
            console.log("resp", resp?.data);
            setResults(resp?.data);
        };
        fetchData();
    }, [])
    

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        setIsScrolling(target.scrollTop > 0);
    };

    const queryCriteriaMap: Record<string, { id: number; name: string; count: number }[]> = {
        "Health care and Information Technology": [
            { id: 1, name: "Healthcare", count: 12000 },
            { id: 2, name: "Information Technology", count: 18500 },
        ],
        "United States and Europe": [
            { id: 3, name: "United States", count: 7500000 },
            { id: 4, name: "Europe", count: 2500000 },
        ],
        "revenue is at least 10 Bil and revenue is at least 10%": [
            { id: 5, name: "Revenue ≥ $10B", count: 1500 },
            { id: 6, name: "Growth Rate ≥ 10%", count: 4200 },
        ],
    };

    const [activeBox, setActiveBox] = useState<string | null>(null);
    const [boxMessages] = useState<Record<string, string>>({
        "Sectors and Industries":
            "Do you need help to target high-growth sectors and industries by selecting from more than 10,000 industry SIC and GICS codes. Focus on what matters to your strategy.",
        "Business Description":
            "My advanced Boolean search engine requires mastery of the art. Please may I provide assistance with this feature?",
        "Locations":
            "Our more than 10M + companies are located throughout the world. Narrow your focus to strategic locations",
        "Business Cycles and Backing Status": "Identify companies by growth stage...",
        "Deals and Investors":
            "Analyze historical deal activity and investor patterns to stay ahead in a competitive market.",
        "Financial Metrics":
            "Customize financial thresholds to identify companies that meet your strategic criteria.",
        "Intellectual Property": "Discover companies with patents and trademarks...",
    });

    const [boxQueries] = useState<Record<string, string>>({
        "Sectors and Industries": "Health care and Information Technology",
        "Deals and Investors": "Unicorn",
        Locations: " United States and Europe",
        "Financial Metrics": " revenue is at least 10 Bil and revenue is at least 10%",
    });

    const handleSectorsClick = () => {
        setIsSectorsExpanded(true);
        setWelcomeMessage("");
        setShowStepThree(false);
    };

    const handleCloseOverlay = () => {
        setSelectedBox(null);
        setIsSectorsExpanded(false);
        setActiveBox(null);
        setInputValue("");
        setWelcomeMessage(
            "You can type your search in my ChatExM box or you can explore 7 Company's criteria in the cards below"
        );
    };

    useEffect(() => {
        if (activeBox) {
            setWelcomeMessage(boxMessages[activeBox]);
            const queryTimer = setTimeout(() => {
                let currentQuery = "";
                let i = 0;
                // const targetQuery = boxQueries[activeBox] || "";
                const targetQuery = "";
                const typingEffect = setInterval(() => {
                    if (i < targetQuery.length) {
                        currentQuery += targetQuery[i];
                        setInputValue(currentQuery);
                        i++;
                    } else {
                        clearInterval(typingEffect);
                        const criteriaToAdd = queryCriteriaMap[targetQuery] || [];
                        setSelectedCriteria((prev) => [
                            ...prev,
                            ...criteriaToAdd
                                .filter((newItem) => !prev.some((existing) => existing.id === newItem.id))
                                .map((item) => ({ ...item, editable: true, boxName: activeBox })),
                        ]);

                        // if (activeBox === "Sectors and Industries") {
                        //     setSelectedSectors(["Healthcare", "InformationTechnology"]);
                        // }
                    }
                }, 50);
            }, 2000);
            return () => clearTimeout(queryTimer);
        }
    }, [activeBox, boxMessages, boxQueries, queryCriteriaMap]);

    useEffect(() => {
        setWelcomeMessage(
            "Welcome to Ex Machina! Our intuitive interface offers deep insights from over 10 mil+ companies worldwide, all at your fingertips. May I tell you about my search platform?"
        );
        const yesTimer = setTimeout(() => {
            let currentText = "";
            let i = 0;
            const typingEffect = setInterval(() => {
                if (i < 3) {
                    currentText += "Yes"[i];
                    setInputValue(currentText);
                    i++;
                } else {
                    clearInterval(typingEffect);
                    setTimeout(() => {
                        setInputValue("");
                        setShowStepThree(true);
                        setWelcomeMessage(
                            "You can type your search in my ChatExM box or you can explore 7 Company's criteria in the cards below"
                        );
                    }, 3000);
                }
            }, 50);
        }, 10000);
        return () => clearTimeout(yesTimer);
    }, []);

    const handleBoxClick = async (box: string): Promise<void> => {
        setActiveBox(box);
        setShowStepThree(false);
        setWelcomeMessage("");
        setSelectedBox(box)
    };

    const tableData: TableRow[] = Array(50).fill(TABLE_ROW_ITEM);

    // const sectionData: Record<string, SectionItem[]> = SECTION_DATA_OLD;

    const sectionData: Record<string, SectionItem[]> = SECTION_DATA;
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(
    //                 "https://api.allorigins.win/get?url=http://209.74.87.17/criteria"
    //             );
    //             if (!response.ok) throw new Error("Failed to fetch data");
    //             const jsonData = await response.json();
    //             const dataParsed = JSON.parse(jsonData.contents || "{}");
    //             setApiData(dataParsed);
    //         } catch (error) {
    //             console.error("Error fetching data from API:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
        if (!searchQuery) {
            setSearchResults([]);
            return;
        }

        if (apiData && typeof apiData === "object") {
            const resultsArr: string[] = [];
            const lowerQuery = searchQuery.toLowerCase();

            if (lowerQuery === "industries") {
                resultsArr.push(...Object.keys(apiData.industries || {}));
            } else if (lowerQuery === "locations") {
                resultsArr.push(...Object.keys(apiData.locations || {}));
            } else if (lowerQuery === "business cycle") {
                resultsArr.push(...(apiData.business_cycle || []));
            } else if (lowerQuery === "ownership status") {
                resultsArr.push(...(apiData.ownership_status || []));
            } else if (lowerQuery === "financial backing status") {
                resultsArr.push(...(apiData.financial_backing_status || []));
            } else {
                const flatten = (obj: any, path = "") => {
                    Object.keys(obj).forEach((key) => {
                        const newPath = path ? `${path} > ${key}` : key;
                        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
                            flatten(obj[key], newPath);
                        } else if (Array.isArray(obj[key])) {
                            obj[key].forEach((item: string) => {
                                if (item.toLowerCase().includes(lowerQuery)) {
                                    resultsArr.push(item);
                                }
                            });
                        } else {
                            if (key.toLowerCase().includes(lowerQuery)) {
                                resultsArr.push(key);
                            }
                        }
                    });
                };
                flatten(apiData);
            }
            setSearchResults(resultsArr);
        } else {
            console.error("apiData is not an object:", apiData);
        }
    }, [searchQuery, apiData]);

    const handleSearchResultClick = (result: string) => {
        const newId = idCounter.current;
        console.log("search, assigned", idCounter.current);
        idCounter.current++;
        const newCriteria: Criteria = {
            id: newId,
            name: result,
            count: Math.floor(Math.random() * 100000),
            editable: true,
            boxName: "Search Result",
        };
        setSelectedCriteria((prev) => [...prev, newCriteria]);
    };

    const handleBusinessDescription = (businessDescriptionText: string, logicalOperatorOption: string) => {
        const newId = idCounter.current;
        console.log("busines, assigned", idCounter.current);
        idCounter.current++;
        const newCriteria: Criteria = {
            id: newId,
            name: `Business Description: ${businessDescriptionText} (${logicalOperatorOption})`,
            count: Math.floor(Math.random() * 100000),
            editable: true,
            boxName: "Business Description",
        };
        setSelectedCriteria((prev) => [...prev, newCriteria]);
        setSelectedBox(null);
    };

    const toggleNode = (key: string) => {
        setExpandedNodes((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleCheckboxChange = (key: string) => {
        console.log("Checkbox clicked:", key);

        // Calculate new selected items outside of setState
        const isKeySelected = selectedItems.includes(key);
        const newSelectedItems = isKeySelected
            ? selectedItems.filter(item => item !== key)
            : [...selectedItems, key];

        // Update selectedItems state
        setSelectedItems(newSelectedItems);

        // Handle criteria updates separately, after calculating new selected items
        if (editingCriteria) {
            if (newSelectedItems.length === 0) {
                setSelectedCriteria(prevCriteria =>
                    prevCriteria.filter(criteria => criteria.id !== editingCriteria.id)
                );
            } else {
                setSelectedCriteria(prevCriteria =>
                    prevCriteria.map(criteria =>
                        criteria.id === editingCriteria.id
                            ? { ...criteria, name: newSelectedItems.join(", ") }
                            : criteria
                    )
                );
            }
        } else {
            if (!isKeySelected) { // If we're adding the item
                const itemExists = selectedCriteria.some(
                    criteria => criteria.name === key
                );

                if (!itemExists) {
                    const newId = idCounter.current;
                    console.log("check, assigned", idCounter.current);
                    idCounter.current++;

                    const newCriteria: Criteria = {
                        id: newId,
                        name: key,
                        count: Math.floor(Math.random() * 100000),
                        editable: true,
                        boxName: selectedBox ?? "",
                    };

                    setSelectedCriteria(prevCriteria => [...prevCriteria, newCriteria]);
                }
            } else { // If we're removing the item
                setSelectedCriteria(prevCriteria =>
                    prevCriteria.filter(criteria => criteria.name !== key)
                );
            }
        }
    };

    const handleEdit = (id: number) => {
        const criteriaToEdit = selectedCriteria.find((criteria) => criteria.id === id);
        if (criteriaToEdit) {
            setEditingCriteria(criteriaToEdit);
            handleBoxClick(criteriaToEdit.boxName);
            setSelectedItems(criteriaToEdit.name.split(", "));
        }
    };

    const handleClear = (id: number) => {
        console.log("Clearing criteria with id:", id);
        setSelectedCriteria((prevCriteria) => {
            const updatedCriteria = prevCriteria.filter((criteria) => criteria.id !== id);
            setSelectedItems((prevItems) =>
                prevItems.filter(
                    (item) => !updatedCriteria.some((criteria) => criteria.name === item)
                )
            );
            return updatedCriteria;
        });
    };

    
    const handleIntellectualPropertySearch = (data: IntellectualPropertyData): void => {
        console.log("Intellectual Property Search clicked!", data);
        const newId = idCounter.current;
        console.log("intell, assigned", idCounter.current);
        idCounter.current++;
        const newCriteria: Criteria = {
            id: newId,
            name: `Intellectual Property Search`,
            count: Math.floor(Math.random() * 100000),
            editable: true,
            boxName: "Intellectual Property",
        };
        setSelectedCriteria((prev) => [...prev, newCriteria]);
        setSelectedBox(null);
    };


    const handleFinancialMetricsSearch = (financialMetricsData: FinancialMetrics, fiscalPeriodData: FiscalPeriod): void => {
        console.log("Financial Metrics Search clicked!", financialMetricsData, fiscalPeriodData);
        const newId = idCounter.current;
        console.log("Metric, assigned", idCounter.current);
        idCounter.current++;
        const newCriteria: Criteria = {
            id: newId,
            name: `Financial Metrics Search`,
            count: Math.floor(Math.random() * 100000),
            editable: true,
            boxName: "Financial Metrics",
        };
        setSelectedCriteria((prev) => [...prev, newCriteria]);
        setSelectedBox(null);
    };


    const handleDealsAndInvestorsSearch = (): void => {
        console.log("Deals and Investors Search clicked!");
        const newId = idCounter.current;
        console.log("deal, assigned", idCounter.current);
        idCounter.current++;
        const newCriteria: Criteria = {
            id: newId,
            name: `Deals and Investors Search`,
            count: Math.floor(Math.random() * 100000),
            editable: true,
            boxName: "Deals and Investors",
        };
        setSelectedCriteria((prev) => [...prev, newCriteria]);
        setSelectedBox(null);
    };

    const handleViewResults = (): void => {
        setShowResults(true);
        console.log("Viewing results for:", selectedCriteria);
    };

    const handleBackToCriteria = (): void => {
        setShowResults(false);
    };

    useEffect(() => {
        const handleDOMContentLoaded = () => {
            const welcomeMessageEl = document.querySelector(".welcome-message") as HTMLElement;
            const hasSeenMessage = localStorage.getItem("hasSeenWelcomeMessage");
            if (welcomeMessageEl) {
                if (!hasSeenMessage) {
                    welcomeMessageEl.style.animation =
                        "typewriter 4s steps(40) forwards, blinking-cursor 0.75s step-end infinite";
                    localStorage.setItem("hasSeenWelcomeMessage", "true");
                } else {
                    welcomeMessageEl.style.width = "100%";
                    welcomeMessageEl.style.borderRightColor = "transparent";
                }
            }
        };
        document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
        return () => document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
    }, []);

    const handleRowClick = (companyName: string): void => {
        // Navigation logic can be implemented here (e.g. router.push)
    };

    const sectorImages: Record<string, string> = {
        "Sectors and Industries": "/icons/IndustrySectorIcon.png",
        "Business Description": "/icons/BusinessIcon.png",
        Locations: "/icons/LocationsIcon.png",
        "Business Cycles and Backing Status": "/icons/BackingSatusIcon.png",
        "Deals and Investors": "/icons/DealsIcon.png",
        "Financial Metrics": "/icons/financialMetricsIcon.png",
        "Intellectual Property": "/icons/intellectualproperty.png",
    };

    const items = [
        "Sectors and Industries",
        "Business Description",
        "Locations",
        "Business Cycles and Backing Status",
        "Deals and Investors",
        "Financial Metrics",
        "Intellectual Property",
    ];

    return (
        <div className="company-screening">
            <AppHeader />

            <div className="main-content">
                <div className="two-column-layout">
                    <div className="left-column">
                        <h2>ChatExM</h2>
                        <div className="column-content">
                            <div className="chat-message">
                                {activeBox ? boxMessages[activeBox] : welcomeMessage}
                            </div>
                            <SearchBar
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                searchResults={searchResults}
                                handleSearchResultClick={handleSearchResultClick}
                                showStepThree={showStepThree}
                            />
                        </div>
                    </div>

                    <div className="right-column">
                        <h2>Summary of Selected Criteria</h2>
                        <div className="column-content">
                            <CriteriaList
                                selectedCriteria={selectedCriteria}
                                handleEdit={handleEdit}
                                handleClear={handleClear}
                            />
                            {selectedCriteria.length > 0 && (
                                <div className="view-results-container">
                                    <button className="view-results-button" onClick={handleViewResults}>
                                        View Results
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* <div className="search-summary-divider"></div> */}

                {!showResults ? (
                    <>
                        <h1 className="explore-grid-h1">Explore Company Criteria Below</h1>
                        <div className={`company-search-section ${selectedBox ? "" : "hidden"}`}>
                            <CompanySearchSection
                                selectedBox={selectedBox}
                                handleBusinessSearch={handleBusinessDescription}
                                handleCheckboxChange={handleCheckboxChange}
                                handleBoxClick={handleBoxClick}
                                handleDealsSearch={handleDealsAndInvestorsSearch}
                                handleFinancialMetricsSearch = {handleFinancialMetricsSearch}
                                handleIPSearch={handleIntellectualPropertySearch}
                            />
                        </div>

                        <div className={`company-grid-container ${selectedBox ? "hidden" : ""}`}>
                            <CompanyGrid
                                items={items}
                                activeBox={activeBox}
                                handleBoxClick={handleBoxClick}
                                sectorImages={sectorImages}
                            />                            
                        </div>
                    </>
                ) : (
                    <ResultsOverlay
                        sectionData={sectionData}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                        results={results}
                        handleRowClick={handleRowClick}
                        hoveredColumn={hoveredColumn}
                        setHoveredColumn={setHoveredColumn}
                        handleBackToCriteria={handleBackToCriteria}
                    />
                ) }
            </div>
        </div>
    );
};

export default CompanyScreening;
