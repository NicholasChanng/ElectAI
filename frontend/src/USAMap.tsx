// @ts-nocheck
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import React from "react";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type USAMapProps = {
  onStateClick: (stateId: string) => void;
  selectedState: string | null;
};

export default function USAMap({ onStateClick, selectedState }: USAMapProps) {
  return (
    <div className="w-full h-full flex items-center justify-center align-center">
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => {
              const isSelected = selectedState === geo.id;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onStateClick(geo.id)}
                  style={{
                    default: {
                      fill: isSelected ? "#3b82f6" : "#e5e7eb",
                      outline: "none",
                      stroke: "#fff",
                      strokeWidth: 0.75,
                      cursor: "pointer",
                    },
                    hover: {
                      fill: "#60a5fa",
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#2563eb",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
