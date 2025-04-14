import React from "react";
import './CriteriaList.css'

interface CriteriaListProps {
    selectedCriteria: Criteria[];
    handleEdit: (id: number) => void;
    handleClear: (id: number) => void;
}

const CriteriaList: React.FC<CriteriaListProps> = ({ selectedCriteria, handleEdit, handleClear }) => {
    return (
        <div className="criteria-list-container">
            <div className="criteria-list">
                {selectedCriteria.map((criteria) => (
                    <div key={criteria.id} className="criteria-item">
                        <span className="criteria-number">{criteria.id}</span>
                        <span className="criteria-name">{criteria.name}</span>
                        <span className="criteria-count">{criteria.count.toLocaleString()}</span>
                        <button className="edit-btn" onClick={() => handleEdit(criteria.id)}>
                            Edit
                        </button>
                        <button className="clear-btn" onClick={() => handleClear(criteria.id)}>
                            Clear
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CriteriaList;
