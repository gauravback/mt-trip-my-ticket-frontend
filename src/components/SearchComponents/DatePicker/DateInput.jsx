// import { format } from "date-fns";
// import React, { useState, useRef, forwardRef } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// function MyDatePicker() {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const datePickerRef = useRef();

//   const openDatePicker = () => {
//     console.log(datePickerRef.current);
//   };

//   const formatDate = (date) => {
//     const formattedDate = format(new Date(date), "dd MMM");
//     setSelectedDate(formattedDate);
//   };

//   return (
//     <div>
//       <input
//         id="hs-dropdown-default"
//         type="text"
//         value={selectedDate ? formatDate(selectedDate) : ""}
//         onClick={openDatePicker}
//         readOnly
//         className="hs-dropdown-toggle mt-2 block w-full rounded-md px-4 outline-none focus:ring-0 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold bg-white text-4xl font-medium"
//       />

//       <DatePicker
//         selected={selectedDate}
//         onChange={(date) => {
//           formatDate(date); // Close the date picker after a date is selected
//         }}
//         className="date-picker" // Add any additional props and styling for the date picker here
//       />
//     </div>
//   );
// }

// export default MyDatePicker;

import { format } from "date-fns";
import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MyDatePicker({ setDate, setTime }) {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "dd MMM yyyy, hh:mm aa")
  );
  const datePickerRef = useRef();

  const openDatePicker = () => {
    datePickerRef.current.setOpen(true); // Use the ref to open the date picker
  };

  const formatDate = (date) => {
    const formattedDate = date
      ? format(new Date(date), "dd MMM yyyy, hh:mm aa")
      : "";
    setSelectedDate(formattedDate);
    setDate(format(new Date(date), "yyy-MM-dd"));
    setTime(format(new Date(date), "hh:mm aa"));
  };

  return (
    <div>
      <input
        id="hs-dropdown-default"
        type="text"
        value={selectedDate || ""}
        onClick={openDatePicker}
        readOnly
        className="hs-dropdown-toggle mt-2 block w-full rounded-md outline-none focus:ring-0 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold bg-white text-2xl font-medium"
      />

      <DatePicker
        selected={selectedDate ? new Date(selectedDate) : null}
        onChange={(date) => formatDate(date)}
        className="date-picker custom-datepicker"
        dateFormat="dd MMM" // Set the date format directly on the DatePicker component
        ref={datePickerRef} // Assign the ref to the DatePicker
        minDate={new Date()}
        showTimeInput
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

export default MyDatePicker;
