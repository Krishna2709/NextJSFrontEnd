import React, { useState, useEffect } from "react";
import './FilterOptionsTree.css';

interface FilterOptionsTreeProps {
    fileName: string;
    handleCheckbox: (key: string) => void;
}

interface TreeNode {
    [key: string]: Record<string, any>;
}

const FilterOptionsTree: React.FC<FilterOptionsTreeProps> = ({ fileName, handleCheckbox }) => {
    const [data, setData] = useState<TreeNode | null>(null);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const fetchData = async () => {
        try {
            const response = await fetch(`/assets/${fileName}`);
            if (!response.ok) {
                throw new Error("Failed to load data");
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fileName && fetchData();
    }, [fileName]);

    const handleCheck = (path: string, label: string) => {
        console.log(path)
        handleCheckbox(label)
        setCheckedItems(prev => ({
            ...prev,
            [path]: !prev[path]
        }));
    };

    const toggleExpand = (path: string) => {
        setExpanded(prev => ({
            ...prev,
            [path]: !prev[path]
        }));
    };

    // Recursive component to render tree nodes
    const TreeNode: React.FC<{
        node: Record<string, any>;
        path: string;
        label: string;
    }> = ({ node, path, label }) => {
        const hasChildren = Object.keys(node).length > 0;
        const isExpanded = expanded[path] || false;
        const isChecked = checkedItems[path] || false;

        return (
            <div className="tree-node w-full" style={{ paddingLeft: '0px' }}>
                <div className="node-content mb-4">
                    <label className="checkbox-label flex items-center">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            name="filter-checkbox"
                            onChange={() => handleCheck(path, label)}
                            className="mr-2 flex-shrink-0"
                        />
                        <span className="text-sm break-words">{label}</span>
                        {hasChildren && (
                            <button
                                className="expand-button ml-2 flex-shrink-0"
                                onClick={() => toggleExpand(path)}
                            >
                                {isExpanded ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#808080" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#808080" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                }
                            </button>
                        )}
                    </label>
                </div>

                {hasChildren && isExpanded && (
                    <div className="children-container pl-4 w-full">
                        {Object.entries(node).map(([childLabel, childNode]) => (
                            <TreeNode
                                key={`${path}-${childLabel}`}
                                node={childNode}
                                path={`${path}-${childLabel}`}
                                label={childLabel}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="filter-options-tree grid grid-cols-3" style={{ paddingLeft: '0px' }}>
            {data && Object.entries(data).map(([category, children]) => (
                <div key={category} className="column-container">
                    <TreeNode
                        node={children}
                        path={category}
                        label={category}
                    />
                </div>
            ))}
        </div>
    );
};

export default FilterOptionsTree;