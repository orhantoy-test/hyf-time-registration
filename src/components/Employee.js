import PropTypes from "prop-types";

import formatHours from "../utils/formatHours";

const timeLocaleStringOptions = {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
};

const fullDateLocaleStringOptions = {
  ...timeLocaleStringOptions,
  year: "numeric",
  month: "long",
  day: "numeric",
};

function Employee(props) {
  const totalMinutes = props.shifts.reduce((acc, shift) => {
    const deltaMinutes =
      (shift.endTime.getTime() - shift.startTime.getTime()) / (1000 * 60);

    return acc + deltaMinutes;
  }, 0);

  return (
    <div
      style={{
        backgroundColor: "#9FC2E8",
        padding: "12px",
        marginBottom: "24px",
      }}
    >
      <h2 style={{ margin: 0 }}>{props.name}</h2>

      <table className="EmployeeShifts">
        <thead>
          <tr>
            <th style={{ width: "50%", textAlign: "left" }}>Start</th>
            <th style={{ width: "30%", textAlign: "left" }}>End</th>
            <th style={{ width: "20%", textAlign: "right" }}>Hours</th>
          </tr>
        </thead>
        <tbody>
          {props.shifts.map((shift, index) => {
            const { startTime, endTime } = shift;

            const isSameDay =
              startTime.getDate() === endTime.getDate() &&
              startTime.getMonth() === endTime.getMonth() &&
              startTime.getFullYear() === endTime.getFullYear();

            const formattedEndTime = isSameDay
              ? endTime.toLocaleTimeString([], timeLocaleStringOptions)
              : endTime.toLocaleString([], fullDateLocaleStringOptions);

            const deltaMinutes =
              (endTime.getTime() - startTime.getTime()) / (1000 * 60);

            return (
              <tr key={index}>
                <td>
                  {startTime.toLocaleString([], fullDateLocaleStringOptions)}
                </td>
                <td>{formattedEndTime}</td>
                <td style={{ textAlign: "right" }}>
                  {formatHours(deltaMinutes)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"></td>
            <td style={{ textAlign: "right" }}>{formatHours(totalMinutes)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

Employee.propTypes = {
  name: PropTypes.string.isRequired,
  shifts: PropTypes.arrayOf(
    PropTypes.exact({
      startTime: PropTypes.instanceOf(Date).isRequired,
      endTime: PropTypes.instanceOf(Date).isRequired,
    })
  ),
};

export default Employee;
