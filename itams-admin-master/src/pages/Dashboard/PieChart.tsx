import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { Status } from "../../interface/interface";
import { Chart } from "../../components/Chart";

const useChartOptions = (labels: any) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    // colors: [
    //   theme.palette.primary.main,
    //   theme.palette.success.main,
    //   theme.palette.warning.main,
    // ],
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

export const PieChart = (props: any) => {
  const { data, sx } = props; // Destructure the correct props

  const chartSeries = data.map((status: Status) => status.numOfAssets);
  const labels = data.map((status: Status) => status.name);
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="Asset By Status" />
      <CardContent>
        <Chart
          height={300}
          options={chartOptions}
          series={chartSeries}
          type="pie"
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
                {/* <Typography sx={{ my: 1, fontSize: "16px" }} variant="h6">
                  {label}
                </Typography> */}
              </Box>
            )
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
