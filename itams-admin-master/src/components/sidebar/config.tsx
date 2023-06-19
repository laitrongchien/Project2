import { MenuItem as MenuItemInterface } from "../../interface/interface";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

interface Page {
  name: string;
  hasChild: boolean;
  destination?: string;
  icon?: any;
  menuList?: MenuItemInterface[];
}

const pages: Page[] = [
  {
    name: "Dashboard",
    destination: "/",
    icon: <BarChartOutlinedIcon />,
    hasChild: false,
  },
  {
    name: "Assets",
    destination: "/hardware",
    icon: <ComputerOutlinedIcon />,
    hasChild: true,
    menuList: [
      { name: "List All", destination: "/hardware" },
      { name: "All Requests", destination: "/request-assets" },
      { name: "Asset Maintenances", destination: "/maintenances" },
      { name: "Deleted Assets", destination: "/hardware/deleted" },
    ],
  },
  {
    name: "Source codes",
    destination: "/source-code",
    icon: <SourceOutlinedIcon />,
    hasChild: false,
  },
  {
    name: "Digital contents",
    destination: "/digital-content",
    icon: <MemoryOutlinedIcon />,
    hasChild: false,
  },
  {
    name: "Licenses",
    destination: "/licenses",
    icon: <ArticleOutlinedIcon />,
    hasChild: false,
  },
  {
    name: "People",
    destination: "/users",
    icon: <PersonOutlineOutlinedIcon />,
    hasChild: false,
  },
  {
    name: "Import",
    icon: <ImportExportOutlinedIcon />,
    hasChild: true,
    menuList: [
      { name: "Assets", destination: "/import/asset" },
      { name: "Users", destination: "/import/user" },
    ],
  },
  {
    name: "Inventory",
    destination: "/inventory",
    icon: <InventoryOutlinedIcon />,
    hasChild: false,
  },
  {
    name: "Settings",
    icon: <SettingsOutlinedIcon />,
    hasChild: true,
    menuList: [
      { name: "Statuses", destination: "/statuses" },
      { name: "Asset Models", destination: "/models" },
      { name: "Categories", destination: "/categories" },
      { name: "Manufacturers", destination: "/manufacturers" },
      { name: "Suppliers", destination: "/suppliers" },
      { name: "Departments", destination: "/departments" },
      { name: "Locations", destination: "/locations" },
      { name: "Deprecations", destination: "/deprecations" },
    ],
  },
];

export default pages;
