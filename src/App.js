import "./App.css";

import { useContext, useState } from "react";
import Employee from "./components/Employee";
import Summary from "./components/Summary";
import ShiftModal from "./components/ShiftModal";
import { ShiftContext } from "./contexts/ShiftContext";

const BLANK_NEW_SHIFT = {
  name: "",
  startTime: "",
  endTime: "",
};

function App() {
  const { shifts, setShifts, shiftsRequest } = useContext(ShiftContext);
  const [newShift, setNewShift] = useState(BLANK_NEW_SHIFT);
  const [showModal, setShowModal] = useState(false);
  const [employeeFilter, setEmployeeFilter] = useState("");

  const employeeNamesAsSet = new Set(shifts.map((shift) => shift.name));
  const allEmployeeNames = [...employeeNamesAsSet];
  const matchingEmployees =
    employeeFilter.length === 0
      ? allEmployeeNames
      : allEmployeeNames.filter((employeeName) =>
          employeeName.toLowerCase().includes(employeeFilter.toLowerCase())
        );

  const totalMinutes = shifts.reduce((acc, shift) => {
    const deltaMinutes =
      (shift.endTime.getTime() - shift.startTime.getTime()) / (1000 * 60);

    return acc + deltaMinutes;
  }, 0);

  const newShiftOnSubmit = (e) => {
    e.preventDefault();

    const { name, startTime, endTime } = newShift;
    if (!name) {
      alert("Missing employee name");
      return;
    }

    const startTimeAsDate = new Date(startTime);
    if (!startTime || isNaN(startTimeAsDate)) {
      alert("Invalid start time");
      return;
    }

    const endTimeAsDate = new Date(endTime);
    if (!endTime || isNaN(endTimeAsDate)) {
      alert("Invalid end time");
      return;
    }

    if (startTime > endTime) {
      alert("Seems like you set start after end time");
      return;
    }

    setShifts((prev) => {
      return prev.concat({
        name,
        startTime: startTimeAsDate,
        endTime: endTimeAsDate,
      });
    });

    setNewShift(BLANK_NEW_SHIFT);
    setShowModal(false);
    setEmployeeFilter("");
  };

  const newShiftInputOnChange = (field, value) => {
    setNewShift((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
      <header
        style={{
          position: "relative",
          height: "80px",
        }}
      >
        <div style={{ position: "absolute", left: "20px", bottom: 0 }}>
          <div
            style={{
              color: "#555",
              fontSize: "14px",
              lineHeight: "24px",
              height: "24px",
            }}
          >
            <label htmlFor="employeeFilter">Filter shifts by employee</label>
          </div>
          <div>
            <input
              id="employeeFilter"
              type="text"
              value={employeeFilter}
              onChange={(e) => setEmployeeFilter(e.target.value)}
              style={{ fontSize: "20px" }}
            />
          </div>
        </div>
        <button
          style={{
            backgroundColor: showModal ? "#666" : "#3C7668",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            cursor: "pointer",
            position: "absolute",
            right: "20px",
            bottom: 0,
            fontSize: "20px",
            padding: "12px 24px",
          }}
          onClick={() => setShowModal((prev) => !prev)}
        >
          {showModal ? "Cancel" : "Submit shift"}
        </button>
      </header>

      <main style={{ margin: "40px 20px", position: "relative" }}>
        {showModal && (
          <ShiftModal
            {...newShift}
            onSubmit={newShiftOnSubmit}
            onInputChange={newShiftInputOnChange}
          />
        )}

        {shiftsRequest.loading && <p>Loading default shifts...</p>}

        {matchingEmployees.map((employeeName) => {
          const employeeShifts = shifts
            .filter((shift) => shift.name === employeeName)
            .map(({ startTime, endTime }) => ({ startTime, endTime }));

          employeeShifts.sort((a, b) => a.startTime - b.startTime);

          return (
            <Employee
              key={employeeName}
              name={employeeName}
              shifts={employeeShifts}
            />
          );
        })}

        <Summary minutes={totalMinutes} />
      </main>
    </div>
  );
}

export default App;
