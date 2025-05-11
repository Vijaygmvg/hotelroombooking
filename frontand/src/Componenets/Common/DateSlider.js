import React, { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import enUS from 'date-fns/locale/en-US'
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; 
function DateSlider({ onDateChange, onFilterChange }) {

  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
    key: "selection"
  })

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection)
    onDateChange(ranges.selection.startDate, ranges.selection.endDate)
    onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
  }

  const handleClearFilter = () => {
    setDateRange({
      startDate: undefined,
      endDate: undefined,
      key: "selection"
    })
    onDateChange(null, null)
    onFilterChange(null, null)
  }

  return (
    <div className="p-6 border rounded-xl bg-gray-50  mx-auto shadow-md">
      <h5 className="text-xl font-semibold text-gray-700 text-center mb-4">
        Filter bookings by date
      </h5>
      
      <DateRangePicker
        ranges={[dateRange]}
        onChange={handleSelect}
        locale={enUS}
        className="mb-6"
      />

      <button
        onClick={handleClearFilter}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition duration-300"
      >
        Clear Filter
      </button>
    </div>
  )
}

export default DateSlider
