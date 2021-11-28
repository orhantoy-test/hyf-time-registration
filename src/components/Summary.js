import { useContext } from "react";
import { ShiftContext } from "../contexts/ShiftContext";

import formatHours from "../utils/formatHours";

function Summary() {
  const { shifts } = useContext(ShiftContext);
  const totalMinutes = shifts.reduce((acc, shift) => {
    const deltaMinutes =
      (shift.endTime.getTime() - shift.startTime.getTime()) / (1000 * 60);

    return acc + deltaMinutes;
  }, 0);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #aaa",
        marginTop: "40px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div style={{ lineHeight: "32px" }}>Total hours</div>
      <div
        style={{
          lineHeight: "64px",
          fontSize: "42px",
          fontWeight: "bold",
        }}
      >
        {formatHours(totalMinutes)}
      </div>
    </div>
  );
}

export default Summary;
