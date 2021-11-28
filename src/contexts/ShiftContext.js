import { createContext, useState, useEffect } from "react";

const ShiftContext = createContext(null);

const apiURL =
  "https://gist.githubusercontent.com/benna100/5fd674171ea528d7cd1d504e9bb0ca6f/raw";

function ShiftProvider({ children }) {
  const [shifts, setShifts] = useState([]);
  const [shiftsRequest, setShiftsRequest] = useState({});

  useEffect(() => {
    setShiftsRequest({ loading: true });

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        const defaultShifts = data.map((shift) => ({
          name: shift.name,
          startTime: new Date(shift.start),
          endTime: new Date(shift.end),
        }));

        setShifts(defaultShifts);
        setShiftsRequest({ loading: false });
      })
      .catch((error) => {
        alert("Unexpected error occurred while fetching default shifts");
        console.error(error);
        setShiftsRequest({ loading: false, error });
      });
  }, []);

  return (
    <ShiftContext.Provider value={{ shifts, setShifts, shiftsRequest }}>
      {children}
    </ShiftContext.Provider>
  );
}

export { ShiftContext };
export default ShiftProvider;
