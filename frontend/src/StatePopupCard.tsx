import React from "react";
import axios from "axios";

type FormDataType = {
  year: number;
  presidential: number;
  bachelorsPercent: number;
  averageIncome: number;
  whitePercent: number;
  averageAge: number;
};

type StatePopupCardProps = {
  state: string;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  prediction: number;
  setPrediction: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
};

export default function StatePopupCard({
  state,
  formData,
  setFormData,
  prediction,
  setPrediction,
  onClose,
}: StatePopupCardProps) {
  const handleYearBlur = (value: number) => {
    let year = Math.round(value);
    year = Math.min(Math.max(year, 1980), 2060);
    if (year % 2 !== 0) year += 1;
    setFormData((prev) => ({ ...prev, year }));
    setFormData((prev) => ({ ...prev, presidential: year % 4 === 0 ? 1 : 0 }));
  };
  const handleYearChange = (value: number) => {
    setFormData((prev) => ({ ...prev, year: value ? value : 0 }));
  };
  const handlePercentageChange = (field: keyof FormDataType, value: number) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    setFormData((prev) => ({ ...prev, [field]: clampedValue }));
  };
  const handleIncomeBlur = (value: number) => {
    const clampedValue = Math.min(Math.max(value, 20000), 100000);
    setFormData((prev) => ({ ...prev, averageIncome: clampedValue }));
  };
  const handleIncomeChange = (value: number) => {
    setFormData((prev) => ({ ...prev, averageIncome: value ? value : 0 }));
  };
  const handleAgeChange = (value: number) => {
    setFormData((prev) => ({ ...prev, averageAge: value ? value : 1 }));
  };
  const handleAgeBlur = (value: number) => {
    const age = Math.min(Math.max(value, 18), 45);
    setFormData((prev) => ({ ...prev, averageAge: age }));
  };
  const sendData = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/predict",
        formData
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  return (
    <div className="fixed left-0 top-0 h-full w-[400px] bg-white shadow-2xl z-50 p-8 flex flex-col overflow-y-auto">
      <button
        className="self-end mb-4 text-gray-400 hover:text-gray-700 text-2xl"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">{state}</h1>
          <p className="text-gray-600">
            Adjust the metrics for {state} and predict turnout.
          </p>
        </div>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Year Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Election Year
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-grow">
                <input
                  type="range"
                  min="1980"
                  max="2060"
                  step="2"
                  value={formData.year || 1980}
                  onChange={(e) => handleYearBlur(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <input
                type="number"
                value={formData.year || ""}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                onBlur={(e) => handleYearBlur(parseInt(e.target.value))}
                className="w-24 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
          </div>
          {/* Bachelor's Percentage */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Percentage with Bachelor's Degree or higher
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-grow">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.bachelorsPercent}
                  onChange={(e) =>
                    handlePercentageChange(
                      "bachelorsPercent",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={formData.bachelorsPercent}
                  onChange={(e) =>
                    handlePercentageChange(
                      "bachelorsPercent",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-20 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                />
                <span className="ml-1">%</span>
              </div>
            </div>
          </div>
          {/* Average Income */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Average Income
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-grow">
                <input
                  type="range"
                  min="20000"
                  max="100000"
                  step="1000"
                  value={formData.averageIncome || 20000}
                  onChange={(e) => handleIncomeChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div className="flex items-center">
                <span className="mr-1">$</span>
                <input
                  type="number"
                  value={formData.averageIncome || ""}
                  onChange={(e) => handleIncomeChange(parseInt(e.target.value))}
                  onBlur={(e) => handleIncomeBlur(parseInt(e.target.value))}
                  className="w-24 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                />
              </div>
            </div>
          </div>
          {/* White Percentage */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              White Population Percentage
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-grow">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.whitePercent}
                  onChange={(e) =>
                    handlePercentageChange(
                      "whitePercent",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={formData.whitePercent}
                  onChange={(e) =>
                    handlePercentageChange(
                      "whitePercent",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-20 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                />
                <span className="ml-1">%</span>
              </div>
            </div>
          </div>
          {/* Average Age */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Average Age
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-grow">
                <input
                  type="range"
                  min="18"
                  max="45"
                  step="1"
                  value={formData.averageAge || 18}
                  onChange={(e) => handleAgeBlur(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <input
                type="number"
                value={formData.averageAge || ""}
                onChange={(e) => handleAgeChange(parseFloat(e.target.value))}
                onBlur={(e) => handleAgeBlur(parseFloat(e.target.value))}
                className="w-20 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              className="flex-1 py-3 px-4 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
              onClick={() =>
                setFormData({
                  year: 2024,
                  presidential: 1,
                  bachelorsPercent: 30,
                  averageIncome: 60000,
                  whitePercent: 50,
                  averageAge: 38.5,
                })
              }
            >
              Reset
            </button>
            <button
              type="button"
              className="flex-1 py-3 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              onClick={sendData}
            >
              Predict
            </button>
          </div>
        </form>
        {prediction === 0 ? (
          ""
        ) : (
          <>
            <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Prediction
            </h3>
            <div className="flex flex-wrap">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f2f4]">
                <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">
                  {prediction === 0 ? "" : prediction.toFixed(3) + "%"}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
