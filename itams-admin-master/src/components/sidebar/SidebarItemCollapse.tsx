import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { MenuItem as MenuItemInterface } from "../../interface/interface";
import { Typography, Box } from "@mui/material";
import SidebarItem from "./SidebarItem";

function SidebarItemCollapse(props: any) {
  const { data } = props;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          "&: hover": {
            backgroundColor: "#e9f5fb",
            color: "#2496ff",
            "& .MuiListItemIcon-root": {
              color: "#2496ff",
            },
          },
          paddingY: "8px",
          paddingX: "12px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ListItemIcon
          sx={{
            color: "#000000",
            "&: hover": {
              color: "#2496ff",
            },
            minWidth: "42px",
          }}
        >
          {data.icon}
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography sx={{ fontSize: "15px" }}>{data.name}</Typography>
          }
        />
        {open ? (
          <ExpandLess style={{ fontSize: 20 }} />
        ) : (
          <ExpandMore style={{ fontSize: 20 }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.menuList?.map((item: MenuItemInterface) =>
            item.menuList ? (
              <SidebarItemCollapse data={item} key={item.name} />
            ) : (
              <SidebarItem data={item} key={item.name} />
            )
          )}
        </List>
      </Collapse>
    </>
  );
}

export default SidebarItemCollapse;
