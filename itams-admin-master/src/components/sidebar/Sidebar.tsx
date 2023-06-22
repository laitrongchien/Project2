import {
  Drawer,
  List,
  Stack,
  Toolbar,
  useMediaQuery,
  Theme,
} from "@mui/material";
import pages from "./config";
import SidebarItemCollapse from "./SidebarItemCollapse";
import SidebarItem from "./SidebarItem";

function Sidebar(props: any) {
  const { open, onClose } = props;
  const isLgScreen = useMediaQuery("(min-width: 900px)");
  // console.log(isLgScreen);

  return (
    <Drawer
      anchor="left"
      variant={isLgScreen ? "permanent" : "temporary"}
      open={isLgScreen ? true : open}
      onClose={isLgScreen ? undefined : onClose}
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
