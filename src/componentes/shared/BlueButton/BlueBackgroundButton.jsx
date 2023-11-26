import styled from "@emotion/styled";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const BlueStyledButton = styled(Button)({
  fontFamily: "Montserrat, sans-serif",
  textTransform: "none",
  fontStyle: "normal",
  fontSize: "16px",
  padding: "10px 16px",
  borderRadius: "6px",
  fontWeight: "600",
  backgroundColor: "#0F9EEA",
  color: "#fdfdfd",
  lineHeight: "1.3",
});

const BlueBackgroundButton = ({
  onClick,
  children,
  style,
  type,
  valueDisabled,
}) => {
  return (
    <BlueStyledButton
      onClick={onClick}
      variant="contained"
      style={style}
      disabled={valueDisabled}
      type={type}
    >
      {children}
    </BlueStyledButton>
  );
};

BlueBackgroundButton.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  type: PropTypes.string,
};
export default BlueBackgroundButton;
