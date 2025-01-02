import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    year: 2024,
    presidential: 1,
    bachelorsPercent: 30,
    averageIncome: 60000,
    whitePercent: 50,
    averageAge: 38.5,
  });

  const [prediction, setPrediction] = useState(0);

  useEffect(() => {
    setPrediction(0);
  }, [formData]);

  const handleYearChange = (value: number) => {
    let year = Math.round(value);
    if (year % 2 !== 0) year += 1;
    // if (year < 1980) year = 1980;
    // if (year > 2060) year = 2060;
    setFormData((prev) => ({ ...prev, year }));

    if (year % 4 == 0) setFormData((prev) => ({ ...prev, presidential: 1 }));
    else setFormData((prev) => ({ ...prev, presidential: 0 }));
  };

  const handlePercentageChange = (field: string, value: number) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    setFormData((prev) => ({ ...prev, [field]: clampedValue }));
  };

  const handleIncomeChange = (value: number) => {
    const clampedValue = Math.min(Math.max(value, 20000), 100000);
    setFormData((prev) => ({ ...prev, averageIncome: clampedValue }));
  };

  const sendData = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/predict",
        formData
      );
      console.log("Response:", response.data.prediction);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            What percent of a State's population is likely to vote?
          </h1>
          <p className="text-gray-600">
            Given these metrics, find out what percent of eligible voters
            actually go out and vote on Election Day!
          </p>
        </div>

        <form className="space-y-6">
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
                  value={formData.year}
                  onChange={(e) => handleYearChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
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
                  value={formData.averageIncome}
                  onChange={(e) =>
                    handleIncomeChange(parseFloat(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div className="flex items-center">
                <span className="mr-1">$</span>
                <input
                  type="number"
                  value={formData.averageIncome}
                  onChange={(e) => handleIncomeChange(parseInt(e.target.value))}
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
                  value={formData.averageAge}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      averageAge: parseInt(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <input
                type="number"
                value={formData.averageAge}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    averageAge: parseInt(e.target.value),
                  }))
                }
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
              Reset Default
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
            {" "}
            <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Prediction
            </h3>
            <div className="flex flex-wrap">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f2f4]">
                {/* <p className="text-[#111418] text-base font-medium leading-normal">
              50%
            </p> */}
                <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">
                  {prediction === 0 ? "" : prediction.toFixed(3) + "%"}
                </p>
                {/* <p className="text-[#078838] text-base font-medium leading-normal">
              +0%
            </p> */}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
