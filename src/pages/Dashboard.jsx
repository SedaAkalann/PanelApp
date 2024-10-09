import { Box } from "@mui/material";
import LeftPart from "../components/LeftPart";
import RightPart from "../components/RightPart";

function Dashboard() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden", // Overflow'yu gizle, scroll'u engelle
        backgroundColor: "#e3f2fd",
      }}
    >
      <LeftPart />
      <RightPart />
    </Box>
  );
}

export default Dashboard;
