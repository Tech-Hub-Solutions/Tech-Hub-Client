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

BlueBackgroundButton.propTypes = {
  children: PropTypes.node.isRequired,
};

function BlueBackgroundButton({ children }) {
  return <BlueStyledButton variant="contained">{children}</BlueStyledButton>;
}

export default BlueBackgroundButton;
