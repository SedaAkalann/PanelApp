import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Logo from "../assets/logodegisik-removebg-preview.png";
import ProductList from "./ProductList";

function RightPart() {
  const section = useSelector((store) => store.dashboard.section);

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(to bottom, #ffffff, #bbdefb)", // Gradient yukarıdan aşağıya
        backgroundSize: "cover", // Arka planın tüm alanı kaplamasını sağlar
        backgroundAttachment: "fixed", // Arka planın sabit kalmasını sağlar
        minHeight: "100vh", // Ekran yüksekliğine göre minimum yüksekliği ayarlar
        overflowY: "auto", // İçeriğin taşması durumunda kaydırmayı sağlar
      }}
    >
      {/* Logo Sağ Üst Köşede */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          width: "120px",
          height: "auto",
        }}
      >
        <img src={Logo} alt="Logo" style={{ width: "100%", height: "auto" }} />
      </Box>

      {section === "welcome" && (
        <>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#0288d1",
              mb: 2,
              textAlign: "center",
              mt: 8, // Başlık üstünde biraz boşluk
            }}
          >
            Panele Hoş Geldiniz
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#555", textAlign: "center" }}
          >
            Yapmak istediğiniz işlemleri sol taraftaki menüden seçebilirsiniz.
          </Typography>
        </>
      )}

      {section === "products" && <ProductList />}
    </Box>
  );
}

export default RightPart;
