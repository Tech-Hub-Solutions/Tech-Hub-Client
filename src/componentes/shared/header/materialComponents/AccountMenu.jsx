import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useNavigate } from "react-router-dom";
import ConfiguracaoPerfilModal from "../../../modais/configuracaoPerfil/ConfiguracaoPerfil";

export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const stylesCSS = {
    iconMenuItem: {
      color: "#858585",
      marginRight: "6px",
      width: "26px",
    },
  };

  const redirectToPerfil = () => {
    navigate({
      pathname: "/perfil",
    });
  };

  return (
    <>
      <Box>
        <Tooltip title="Configurações">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: -0.5 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 40, height: 40 }}
              alt="Imagem de perfil"
              src={props.image}
            >
              L
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={(handleClose, redirectToPerfil)}>
          <AccountCircleRoundedIcon sx={stylesCSS.iconMenuItem} /> <p>Perfil</p>
        </MenuItem>

        <MenuItem onClick={(handleClose, () => setIsModalOpen(!isModalOpen))}>
          <SettingsRoundedIcon sx={stylesCSS.iconMenuItem} />{" "}
          <p>Configurações</p>
        </MenuItem>
        <Divider variant="middle" />

        <MenuItem
          onClick={() => {
            sessionStorage.clear();
            navigate("/");
          }}
        >
          <LogoutRoundedIcon sx={stylesCSS.iconMenuItem} />
          <p>Sair</p>
        </MenuItem>
      </Menu>

      <ConfiguracaoPerfilModal
        isConfiguracaoModalOpen={isModalOpen}
        setIsConfiguracaoModalOpen={setIsModalOpen}
      ></ConfiguracaoPerfilModal>
    </>
  );
}
