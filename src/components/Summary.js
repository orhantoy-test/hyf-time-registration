import PropTypes from "prop-types";

import formatHours from "../utils/formatHours";

function Summary(props) {
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
        {formatHours(props.minutes)}
      </div>
    </div>
  );
}

Summary.propTypes = {
  minutes: PropTypes.number.isRequired,
};

export default Summary;
