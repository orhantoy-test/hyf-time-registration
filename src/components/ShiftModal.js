import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function ShiftModal(props) {
  const employeeNameInputRef = useRef(null);

  useEffect(() => {
    employeeNameInputRef.current.focus();
  }, []);

  return (
    <form
      style={{
        position: "absolute",
        padding: "20px",
        background: "#fff",
        boxShadow: "6px 6px 16px #888888",
        top: "-30px",
        right: "8px",
        zIndex: 10,
        border: "1px solid #444",
      }}
      onSubmit={props.onSubmit}
    >
      <h2 style={{ margin: "0 0 20px 0" }}>Submit shift</h2>
      <div className="formRow">
        <label>
          <span>Employee</span>
          <input
            ref={employeeNameInputRef}
            type="text"
            placeholder="Name"
            value={props.name}
            onChange={(e) => props.onInputChange("name", e.target.value)}
          />
        </label>
      </div>
      <div className="formRow">
        <label>
          <span>Start</span>
          <input
            type="datetime-local"
            value={props.startTime}
            onChange={(e) => props.onInputChange("startTime", e.target.value)}
          />
        </label>
      </div>
      <div className="formRow">
        <label>
          <span>End</span>
          <input
            type="datetime-local"
            value={props.endTime}
            onChange={(e) => props.onInputChange("endTime", e.target.value)}
          />
        </label>
      </div>
      <div className="formBtnRow">
        <button type="submit">Submit shift</button>
      </div>
    </form>
  );
}

ShiftModal.propTypes = {
  name: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default ShiftModal;
