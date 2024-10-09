import React from "react";
import { Box, Drawer, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSection } from "../Redux/dashboardSlice";
import { useNavigate } from "react-router-dom";

function LeftPart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductsClick = () => {
    dispatch(setSection("products"));
  };

  const handleLogoutClick = () => {
    // dispatch(setSection("logout"));
    navigate("/");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 300,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 300,
          boxSizing: "border-box",
          backgroundColor: "#b3e5fc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "16px",
          overflow: "hidden", // Overflow'u gizle
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%", // Yüksekliği %100 yaparak ortalamayı sağlar
        }}
      >
        <Typography
          onClick={handleProductsClick}
          component="div"
          sx={{
            py: 2,
            textAlign: "center",
            width: "100%",
            backgroundColor: "#e1f5fe",
            color: "#0288d1",
            cursor: "pointer",
            "&:hover": {
              color: "#0d47a1",
              fontWeight: "bold",
              transform: "scale(1.02)",
            },
            transition: "all 0.3s ease",
            borderBottom: "1px solid #ddd",
          }}
        >
          Ürünler
        </Typography>
        <Typography
          onClick={handleLogoutClick}
          component="div"
          sx={{
            py: 2,
            textAlign: "center",
            width: "100%",
            backgroundColor: "#e1f5fe",
            color: "#0288d1",
            cursor: "pointer",
            "&:hover": {
              color: "#0d47a1",
              fontWeight: "bold",
              transform: "scale(1.02)",
            },
            transition: "all 0.3s ease",
            borderBottom: "1px solid #ddd",
          }}
        >
          Çıkış Yap
        </Typography>
      </Box>
    </Drawer>
  );
}

export default LeftPart;
