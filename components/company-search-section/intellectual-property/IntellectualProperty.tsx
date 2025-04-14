import React, { useState } from "react";

interface IntellectualPropertyProps {
    handleSearchClick: (data: IntellectualPropertyData) => void;
}

interface RangeFieldProps {
    label: string;
    onChange: (label: string, type: 'min' | 'max', value: string) => void;
    values: { min: string; max: string };
}

interface SingleFieldProps {
    label: string;
    onChange: (label: string, value: string) => void;
    value: string;
}

// Field with min/max inputs
const RangeField: React.FC<RangeFieldProps> = ({ label, onChange, values }) => {
    return (
        <div className="space-y-2">
            <label className="font-semibold">{label}</label>
            <div className="flex space-x-4">
                <div className="flex items-center">
                    <label className="text-sm mr-2">Min</label>
                    <input
                        type="text"
                        className="border p-2 w-full rounded-lg caret-black"
                        value={values.min}
                        onChange={(e) => onChange(label, 'min', e.target.value)}
                    />
                </div>
                <div className="flex items-center">
                    <label className="text-sm mr-2">Max</label>
                    <input
                        type="text"
                        className="border p-2 w-full rounded-lg caret-black"
                        value={values.max}
                        onChange={(e) => onChange(label, 'max', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

// Field with single input
const SingleField: React.FC<SingleFieldProps> = ({ label, onChange, value }) => {
    return (
        <div className="space-y-2">
            <label className="font-semibold">{label}</label>
            <div className="flex space-x-4 w-full">
                <div className="flex items-center w-full">
                    <input
                        type="text"
                        className="border p-2 w-full rounded-lg caret-black"
                        value={value}
                        onChange={(e) => onChange(label, e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

const IntellectualProperty: React.FC<IntellectualPropertyProps> = ({ handleSearchClick }) => {
    // Fields that need min/max inputs
    const rangeFields = [
        "Total Patent Documents",
        "Total Patent Families",
        "Active Patent Documents",
        "Pending Patent Documents",
        "Patents Expiring Next Year",
        "Total Clinical Trials"
    ];

    // Fields that need just a single input
    const singleFields = [
        "Top CPC Codes"
    ];

    // Initialize state for all field values
    const [formData, setFormData] = useState<IntellectualPropertyData>(() => {
        const initialData: IntellectualPropertyData = {};

        // Initialize range fields
        rangeFields.forEach(field => {
            initialData[field] = { min: '', max: '' };
        });

        // Initialize single fields
        singleFields.forEach(field => {
            initialData[field] = { value: '' };
        });

        return initialData;
    });

    // Handler for range field changes
    const handleRangeChange = (field: string, type: 'min' | 'max', value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [type]: value
            }
        }));
    };

    // Handler for single field changes
    const handleSingleChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                value
            }
        }));
    };

    // Handler for search button click
    const onSearchClick = () => {
        handleSearchClick(formData);
    };

    return (
        <div>
            <div className="grid grid-cols-3 gap-4 mt-5">
                {rangeFields.slice(0, 3).map((field, index) => (
                    <RangeField
                        key={index}
                        label={field}
                        onChange={handleRangeChange}
                        values={{
                            min: formData[field]?.min || '',
                            max: formData[field]?.max || ''
                        }}
                    />
                ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
                {rangeFields.slice(3, 6).map((field, index) => (
                    <RangeField
                        key={index + 3}
                        label={field}
                        onChange={handleRangeChange}
                        values={{
                            min: formData[field]?.min || '',
                            max: formData[field]?.max || ''
                        }}
                    />
                ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
                {singleFields.map((field, index) => (
                    <SingleField
                        key={`single-${index}`}
                        label={field}
                        onChange={handleSingleChange}
                        value={formData[field]?.value || ''}
                    />
                ))}
            </div>

            <hr />
            <button
                className="w-32 rounded-lg mt-4 px-4 py-2 text-white bg-customPurple"
                onClick={onSearchClick}
            >
                Search
            </button>
        </div>
    );
};

export default IntellectualProperty;