import { Box, Typography, Avatar, SvgIcon } from "@mui/material";
import ArrowCircleRightSharpIcon from "@mui/icons-material/ArrowCircleRightSharp";
import { useNavigate } from "react-router-dom";

export default function Analytic(props: any) {
  const { destination, quantity, type, icon } = props;
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        borderRadius: "5px",
        flexGrow: 1,
        alignSelf: "stretch",
        flexBasis: { xs: "100%", md: "30%" },
        maxWidth: { xs: "100%", md: "30%" },
        ":hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => navigate(destination)}
    >
      <Box
        sx={{
          padding: "24px 48px",
          display: "flex",
          justifyContent: "space-between",
          // alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "14px",
              color: "#8c8c8c",
              lineHeight: "24px",
              minHeight: "72px",
            }}
            variant="overline"
          >
            {`Total ${type}${quantity > 1 ? "s" : ""}`}
          </Typography>

          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "40px",
              color: "#000",
              display: "inline",
            }}
          >
            {quantity}
          </Typography>
        </Box>

        <Avatar
          sx={{
            backgroundColor: "#2496ff",
            height: 56,
            width: 56,
          }}
        >
          <SvgIcon>{icon}</SvgIcon>
        </Avatar>
      </Box>
      <Box
        sx={{
          borderRadius: "0px 0px 5px 5px",
          backgroundColor: "#ABD",
          py: "3px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: "16px",
            color: "#8c8c8c",
            marginRight: "6px",
          }}
        >
          View All
        </Typography>
        <ArrowCircleRightSharpIcon style={{ fill: "black" }} fontSize="small" />
      </Box>
    </Box>
  );
}
