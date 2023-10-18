import { LoadingButton } from "@mui/lab";
import styled from "@emotion/styled";

function CustomLoadingButton({ isLoading, textButton, onClick }) {
  const CustomLoadingButton = styled(LoadingButton)({
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

  const stylesCSS = {
    blueButton: {
      padding: "18px 125px",
      marginTop: "16px",
    },
  };

  return (
    <>
      <CustomLoadingButton
        loading={isLoading}
        variant="contained"
        onClick={onClick}
        style={stylesCSS.blueButton}
        type="submit"
        color="primary"
      >
        <span>{textButton}</span>
      </CustomLoadingButton>
    </>
  );
}

export default CustomLoadingButton;
