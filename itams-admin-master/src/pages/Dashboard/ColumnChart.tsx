import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Chart } from "../../components/Chart";

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme.palette.primary.main,
      alpha(theme.palette.primary.main, 0.25),
    ],
    dataLabels: {
      enabled: true,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: "#F2F4F7",
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "40px",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    xaxis: {
      axisBorder: {
        color: "#F2F4F7",
        show: true,
      },
      axisTicks: {
        color: "#F2F4F7",
        show: true,
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: "#6C737F",
        },
      },
    },
    yaxis: {
      labels: {
        offsetX: -10,
        style: {
          colors: "#6C737F",
        },
      },
    },
  };
};

export const ColumnChart = (props: any) => {
  const { chartSeries, sx } = props;
  const chartOptions = useChartOptions();

  return (
    <Card sx={sx}>
      <CardHeader title="Asset and Source code to user" />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};
