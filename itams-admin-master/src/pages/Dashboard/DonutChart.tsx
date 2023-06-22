import ComputerDesktopIcon from "@heroicons/react/24/solid/ComputerDesktopIcon";
import DeviceTabletIcon from "@heroicons/react/24/solid/DeviceTabletIcon";
import PhoneIcon from "@heroicons/react/24/solid/PhoneIcon";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";

import { AssetModel } from "../../interface/interface";
import { Chart } from "../../components/Chart";

const useChartOptions = (labels: any) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
    ],
    dataLabels: {
      enabled: true,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

const iconMap: { [key: string]: React.ReactElement } = {
  Desktop: (
    <SvgIcon>
      <ComputerDesktopIcon />
    </SvgIcon>
  ),
  Tablet: (
    <SvgIcon>
      <DeviceTabletIcon />
    </SvgIcon>
  ),
  Phone: (
    <SvgIcon>
      <PhoneIcon />
    </SvgIcon>
  ),
};

export const DonutChart = (props: any) => {
  const { data, sx } = props; // Destructure the correct props

  const chartSeries = data.map(
    (assetModel: AssetModel) => assetModel.numOfAssets
  );
  const labels = data.map((assetModel: AssetModel) => assetModel.name);
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="Asset By Asset Model" />
      <CardContent>
        <Chart
          height={300}
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {labels.map(
            (
              label: string,
              index: number // Iterate over labels array
            ) => (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    backgroundColor: chartOptions.colors[index],
                    borderRadius: "50%",
                    display: "inline-block",
                    height: "8px",
                    width: "8px",
                    marginRight: "10px",
                  }}
                />
                {iconMap[label]}
                <Typography sx={{ my: 1, fontSize: "16px" }} variant="h6">
                  {label}
                </Typography>
              </Box>
            )
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
