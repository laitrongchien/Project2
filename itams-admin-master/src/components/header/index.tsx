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

const Header = () => {
  const navigate = useNavigate();
  const { getAuth, authContext } = useAuthContext();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexBasis: "18%" }}>
            <Box
              component="a"
              href="/"
              sx={{
                mr: "24px",
                display: { xs: "none", md: "flex" },
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
                display: { xs: "none", md: "flex" },
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

          <Box sx={{ flexBasis: "75%" }}>
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
              flexGrow: 1,
              flexBasis: "30%",
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                width: "300px",
                // display: { xs: "block", md: "block" },
              }}
            >
              {pages.map((page: Page) => (
                <MenuItem
                  key={page.name}
                  disableRipple={page.hasChild ? true : false}
                >
                  {page.hasChild ? (
                    <NestedList data={page} />
                  ) : (
                    <Typography
                      textTransform="capitalize"
                      textAlign="center"
                      onClick={() => navigate(page?.destination ?? "")}
                    >
                      {page.name}
                    </Typography>
                  )}
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ITAMS
          </Typography>
          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page: Page) =>
              page.hasChild ? (
                <MenuListComposition
                  menuList={page.menuList}
                  name={page.name}
                  key={page.name}
                />
              ) : (
                <Button
                  key={page.name}
                  onClick={() => navigate(page?.destination ?? "")}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "capitalize",
                    position: "relative",
                    "&:hover::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "6px",
                      left: 0,
                      width: "100%",
                      height: "2px",
                      backgroundColor: "white",
                    },
                  }}
                >
                  {page.name}
                </Button>
              )
            )}
          </Box> */}

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
