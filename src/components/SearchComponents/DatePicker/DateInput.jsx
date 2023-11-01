import { format } from "date-fns";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateInput({ setDate, setTime }) {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "dd MMM yyyy, HH:mm")
  );
  const datePickerRef = useRef();

  const openDatePicker = () => {
    datePickerRef.current.setOpen(true); // Use the ref to open the date picker
  };

  const formatDate = (date) => {
    const formattedDate = date
      ? format(new Date(date), "dd MMM yyyy, HH:mm")
      : "";
    setSelectedDate(formattedDate);
    setDate(format(new Date(date), "yyy-MM-dd"));
    setTime(format(new Date(date), "HH:mm"));
  };

  return (
    <div>
      <input
        id="hs-dropdown-default"
        type="text"
        value={selectedDate || ""}
        onClick={openDatePicker}
        readOnly
        className="hs-dropdown-toggle mt-2 block w-full rounded-md outline-none focus:ring-0 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold bg-white text-xl md:text-2xl font-medium"
      />

      <DatePicker
        selected={selectedDate ? new Date(selectedDate) : null}
        onChange={(date) => formatDate(date)}
        className="date-picker custom-datepicker"
        dateFormat="dd MMM" // Set the date format directly on the DatePicker component
        ref={datePickerRef} // Assign the ref to the DatePicker
        minDate={new Date()}
        showTimeInput
        timeFormat="a"
        popperClassName="custom-popper"
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [5, 10],
            },
          },
          {
            name: "preventOverflow",
            options: {
              rootBoundary: "viewport",
              tether: false,
              altAxis: true,
            },
          },
        ]}
      />
    </div>
  );
}

export default DateInput;
