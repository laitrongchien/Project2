import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Notification from "./Notification";
import HomeIcon from "@mui/icons-material/Home";
import { MenuItem as MenuItemInterface } from "../../interface/interface";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const settings: MenuItemInterface[] = [
  { name: "Edit Your Profile", destination: "/account/profile" },
  { name: "Change Password", destination: "/account/password" },
  { name: "Logout", destination: "/login" },
];

const Header = (props: any) => {
  const navigate = useNavigate();
  const { getAuth, authContext } = useAuthContext();

  const { onNavOpen } = props;

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickUserMenu = async (destination: string) => {
    handleCloseUserMenu();
    switch (destination) {
      case "/login":
        try {
          await logout();
          getAuth();
          navigate("/login");
        } catch (err: any) {
          console.log(err);
          toast.error(err.response.data.message);
        }
        return;
      default:
        navigate(destination);
        return;
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffffff" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "space-between", md: "flex-start" },
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={onNavOpen}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flexBasis: "18%" }}>
            <Box
              component="a"
              href="/"
              sx={{
                mr: "24px",
                display: "flex",
              }}
            >
              <HomeIcon sx={{ fontSize: "30px", color: "#2496ff" }} />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#000000",
                textDecoration: "none",
              }}
            >
              ITAMS
            </Typography>
          </Box>

          <Box sx={{ flexBasis: "75%", display: { xs: "none", md: "flex" } }}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              sx={{
                width: "500px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
              }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "gray" }} />,
              }}
            />
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
              ml: "8px",
            }}
          >
            <Notification />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="avatar" src={authContext?.avatar} sizes="small" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((item: MenuItemInterface) => (
                <MenuItem
                  key={item.name}
                  onClick={() => handleClickUserMenu(item.destination)}
                >
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
