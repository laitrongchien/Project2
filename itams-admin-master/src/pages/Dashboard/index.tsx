import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { getAllAssets } from "../../api/asset";
import { getAllAssetModels } from "../../api/assetModel";
import { getAllDigitalContents } from "../../api/digitalContent";
import { getAllLicenses } from "../../api/license";
import { getAllSourceCodes } from "../../api/sourceCode";
import { getAllStatuses } from "../../api/status";
import { getAllUsers } from "../../api/user";
import Analytic from "../../components/Analytic";

import PageHeader from "../../components/PageHeader";
import ComputerIcon from "@mui/icons-material/Computer";
import SourceIcon from "@mui/icons-material/Source";
import MemoryIcon from "@mui/icons-material/Memory";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

import {
  Asset,
  SourceCode,
  DigitalContent,
  License,
  User,
  Status,
  AssetModel,
} from "../../interface/interface";
import DepartmentTable from "./DepartmentTable";
import { PieChart } from "./PieChart";
import { DonutChart } from "./DonutChart";
import { ColumnChart } from "./ColumnChart";

function Dashboard() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assetModels, setAssetModels] = useState<AssetModel[]>([]);
  const [sourceCodes, setSourceCodes] = useState<SourceCode[]>([]);
  const [digitalContents, setDigitalContents] = useState<DigitalContent[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getData = async () => {
    setIsLoading(true);
    try {
      const assets = await getAllAssets();
      const assetModels = await getAllAssetModels();
      const sourceCodes = await getAllSourceCodes();
      const digitalContents = await getAllDigitalContents();
      const licenses = await getAllLicenses();
      const users = await getAllUsers();
      const statuses = await getAllStatuses();
      setAssets(assets);
      setAssetModels(assetModels);
      setSourceCodes(sourceCodes);
      setDigitalContents(digitalContents);
      setLicenses(licenses);
      setUsers(users);
      setStatuses(statuses);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box>
      <PageHeader name="Dashboard" noButton />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: "24px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <Analytic
          type="asset"
          quantity={assets.length}
          destination="/hardware"
          icon={<ComputerIcon />}
        />
        <Analytic
          type="asset model"
          quantity={assetModels.length}
          destination="/models"
          icon={<SmartphoneIcon />}
        />
        <Analytic
          type="source code"
          quantity={sourceCodes.length}
          destination="/source-code"
          icon={<SourceIcon />}
        />
        <Analytic
          type="digital content"
          quantity={digitalContents.length}
          destination="/digital-content"
          icon={<MemoryIcon />}
        />
        <Analytic
          type="license"
          quantity={licenses.length}
          destination="/licenses"
          icon={<ArticleIcon />}
        />
        <Analytic
          type="user"
          quantity={users.length}
          destination="/users"
          icon={<PeopleAltIcon />}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "start",
          gap: "24px",
        }}
      >
        <DepartmentTable />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        {!isLoading && (
          <PieChart
            data={statuses}
            sx={{
              height: "100%",
              minHeight: "450px",
              width: { xs: "100%", md: "48%" },
            }}
          />
        )}
        {!isLoading && (
          <DonutChart
            data={assetModels}
            sx={{
              height: "100%",
              minHeight: "450px",
              width: { xs: "100%", md: "48%" },
            }}
          />
        )}
      </Box>
      <Box>
        {!isLoading && (
          <ColumnChart
            chartSeries={[
              {
                name: "This year",
                data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
              },
              {
                name: "Last year",
                data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
              },
            ]}
            sx={{ height: "100%" }}
          />
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
