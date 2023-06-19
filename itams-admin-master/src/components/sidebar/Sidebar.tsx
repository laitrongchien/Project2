import { Drawer, List, Stack, Toolbar } from "@mui/material";
import pages from "./config";
import SidebarItemCollapse from "./SidebarItemCollapse";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "240px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "240px",
          position: "relative",
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }}
    >
      <List disablePadding>
        {/* <Toolbar sx={{ marginBottom: "20px" }}>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="center"
            >
              <Avatar src={assets.images.logo} />
            </Stack>
          </Toolbar> */}
        {pages.map((page, index) =>
          page.hasChild ? (
            <SidebarItemCollapse data={page} key={page.name} />
          ) : (
            <SidebarItem data={page} key={page.name} />
          )
        )}
      </List>
    </Drawer>
  );
}

export default Sidebar;
