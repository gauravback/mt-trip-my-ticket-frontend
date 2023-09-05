import React from "react";
import flatpickr from "flatpickr"; // Import flatpickr library
import "flatpickr/dist/flatpickr.min.css"; // Import flatpickr styles

const DateInput = ({ id, setDate }) => {
  flatpickr(`#${id}`, {
    dateFormat: "Y-m-d", // Format for user display
    altFormat: "F j, Y", // Format for logging
    altInput: true,
    theme: "custom-theme",
    onChange: function (selectedDates, dateStr, instance) {
      setDate(dateStr);
    },
  });
  return (
    <div>
      
      <input
        onChange={(e) => {
          console.log(e.target.value);
        }}
        type="text"
        id={id}
        required
        placeholder="Select a date"
        className="p-3 datepicker block w-full text-lg border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0 overflow-hidden"
      />
    </div>
  );
};

export default DateInput;
