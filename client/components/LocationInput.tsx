import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Loader2, X } from "lucide-react";

interface LocationResult {
  place_id: number;
  display_name: string;
  address: {
    city?: string;
    state?: string;
    country?: string;
    town?: string;
    village?: string;
    county?: string;
  };
}

interface LocationInputProps {
  label: string;
  placeholder: string;
  value: string;
  onLocationSelect: (location: { displayText: string; city: string; state: string; country: string }) => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({ label, placeholder, value, onLocationSelect }) => {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const searchLocation = async () => {
      if (query.length < 3 || query === value) {
        setResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json&addressdetails=1&limit=5`,
          {
            headers: {
              "User-Agent": "MetLLAppWeb/1.0",
            },
          }
        );
        const data = await response.json();
        setResults(data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Location search failed:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(searchLocation, 500);
    return () => clearTimeout(timeoutId);
  }, [query, value]);

  const handleSelect = (result: LocationResult) => {
    const address = result.address;
    const city = address.city || address.town || address.village || address.county || "";
    const state = address.state || "";
    const country = address.country || "";
    
    // Create a clean display text (City, State)
    let displayText = city;
    if (state && state !== city) {
      displayText += displayText ? `, ${state}` : state;
    }
    if (!displayText) {
      displayText = result.display_name.split(",").slice(0, 2).join(",");
    }

    setQuery(displayText);
    setShowDropdown(false);
    onLocationSelect({ displayText, city, state, country });
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">{label}</label>
      <div className="relative flex items-center w-full h-12 rounded-xl border border-[#333333] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
        <div className="pl-3 pr-2 text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          className="flex-1 h-full px-1 text-gray-900 focus:outline-none placeholder:text-gray-400 bg-transparent text-[15px]"
        />
        {isSearching && (
          <div className="pr-3 text-gray-400 animate-spin">
            <Loader2 size={18} />
          </div>
        )}
        {query && !isSearching && (
          <button 
            type="button"
            onClick={() => {
              setQuery('');
              onLocationSelect({ displayText: '', city: '', state: '', country: '' });
            }}
            className="pr-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden max-h-60 overflow-y-auto">
          {results.map((result) => {
            const address = result.address;
            const city = address.city || address.town || address.village || address.county;
            return (
              <button
                key={result.place_id}
                type="button"
                onClick={() => handleSelect(result)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-start gap-3 border-b border-gray-50 last:border-0 transition-colors"
              >
                <MapPin size={18} className="text-gray-500 mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium text-gray-900">
                    {city || result.display_name.split(",")[0]}
                  </span>
                  <span className="text-[13px] text-gray-500 line-clamp-1 mt-0.5">
                    {result.display_name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
