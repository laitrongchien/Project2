import { ListItemButton, ListItemIcon } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";

function SidebarItem(props: any) {
  const { pathname } = useLocation();
  // console.log(pathname);
  const { data } = props;
  const navigate = useNavigate();
  return (
    <ListItemButton
      onClick={() => navigate(data?.destination ?? "")}
      sx={{
        "&: hover": {
          backgroundColor: "#e9f5fb",
          color: "#2496ff",
          "& .MuiListItemIcon-root": {
            color: "#2496ff",
          },
        },
        backgroundColor: data.destination === pathname ? "#d9f0fb" : "unset",
        color: data.destination === pathname ? "#2496ff" : "unset",
        "& .MuiListItemIcon-root": {
          color: data.destination === pathname ? "#2496ff" : "unset",
        },
        borderRight:
          data.destination === pathname ? "4px solid #1890ff" : "unset",
        paddingY: "8px",
        paddingX: "12px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <ListItemIcon
        sx={{
          color: "#000000",
          minWidth: "42px",
        }}
      >
        {data.icon}
      </ListItemIcon>
      <ListItemText
        disableTypography
        primary={<Typography sx={{ fontSize: "15px" }}>{data.name}</Typography>}
      />
    </ListItemButton>
  );
}

export default SidebarItem;
