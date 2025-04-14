import React, { useState } from "react";

interface FinancialMetricsProps {
    handleSearchClick: (financialMetrics: FinancialMetrics, fiscalPeriod: FiscalPeriod) => void;
}

const FinancialMetrics: React.FC<FinancialMetricsProps> = ({ handleSearchClick }) => {
    const [financialMetrics, setFinancialMetrics] = useState<FinancialMetrics>({
        revenue: { min: "", max: "" },
        netIncome: { min: "", max: "" },
        ebitda: { min: "", max: "" },
        impliedEV: { min: "", max: "" },
        ebit: "",
        marketCap: "",
        netDebt: "",
        grossProfit: "",
        totalRaised: "",
        totalDebt: "",
    });
    const [fiscalPeriod, setFiscalPeriod] = useState<FiscalPeriod>({
        from: "",
        to: "",
    });

    const handleFinancialMetricsChange = (metric: string, field: string, value: string): void => {
        setFinancialMetrics((prevMetrics) => ({
            ...prevMetrics,
            [metric]:
                typeof prevMetrics[metric as keyof FinancialMetrics] === "object"
                    ? { ...(prevMetrics[metric as keyof FinancialMetrics] as FinancialRange), [field]: value }
                    : value,
        }));
    };

    const handleFiscalPeriodChange = (field: keyof FiscalPeriod, value: string): void => {
        setFiscalPeriod((prevPeriod) => ({
            ...prevPeriod,
            [field]: value,
        }));
    };

    const formatMetricLabel = (metric: string): string => {
        return metric.charAt(0).toUpperCase() + metric.slice(1).replace(/([A-Z])/g, " $1");
    };

    return (
        <div>
            {/* Range Metrics (with min/max) */}
            <div className="grid grid-cols-2 gap-4 mt-5">
                {Object.keys(financialMetrics)
                    .filter((metric) => typeof financialMetrics[metric as keyof FinancialMetrics] === "object")
                    .map((metric, index) => (
                        <div className="space-y-2" key={metric}>
                            <label className="font-semibold">{formatMetricLabel(metric)}</label>
                            <div className="flex items-center space-x-4">
                                <label className="text-sm mr-2">Min</label>
                                <input
                                    type="text"
                                    className="border p-2 w-full rounded-lg caret-black"
                                    placeholder="$ 1,000"
                                    value={(financialMetrics[metric as keyof FinancialMetrics] as FinancialRange).min}
                                    onChange={(e) => handleFinancialMetricsChange(metric, "min", e.target.value)}
                                />
                                <label className="text-sm mr-2">Max</label>
                                <input
                                    type="text"
                                    className="border p-2 w-full rounded-lg caret-black"
                                    placeholder="$ 1,000,000"
                                    value={(financialMetrics[metric as keyof FinancialMetrics] as FinancialRange).max}
                                    onChange={(e) => handleFinancialMetricsChange(metric, "max", e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
            </div>

            {/* Single Value Metrics */}
            <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
                {Object.keys(financialMetrics)
                    .filter((metric) => typeof financialMetrics[metric as keyof FinancialMetrics] === "string")
                    .map((metric, index) => (
                        <div className="space-y-2" key={metric}>
                            <label className="font-semibold">{formatMetricLabel(metric)}</label>
                            <input
                                type="text"
                                className="border p-2 w-full rounded-lg caret-black"
                                placeholder="$ 1,000,000"
                                value={financialMetrics[metric as keyof FinancialMetrics] as string}
                                onChange={(e) => handleFinancialMetricsChange(metric, "", e.target.value)}
                            />
                        </div>
                    ))}
            </div>

            <hr />

            {/* Fiscal Period */}
            <div className="mt-4 mb-4">
                <label className="font-semibold">Fiscal Period</label>
                <div className="flex items-center space-x-4 mt-2">
                    <label className="text-sm mr-2">From</label>
                    <input
                        type="date"
                        className="border p-2 rounded-lg caret-black"
                        value={fiscalPeriod.from}
                        onChange={(e) => handleFiscalPeriodChange("from", e.target.value)}
                    />
                    <label className="text-sm mr-2">To</label>
                    <input
                        type="date"
                        className="border p-2 rounded-lg caret-black"
                        value={fiscalPeriod.to}
                        onChange={(e) => handleFiscalPeriodChange("to", e.target.value)}
                    />
                </div>
            </div>

            <hr />

            <button
                className="w-32 rounded-lg mt-4 px-4 py-2 text-white bg-customPurple"
                onClick={() => handleSearchClick(financialMetrics, fiscalPeriod)}
            >
                Search
            </button>
        </div>
    );
};

export default FinancialMetrics;