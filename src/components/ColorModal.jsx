import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "../css/productList.css";

const ColorModal = ({ colorModalOpen, setColorModalOpen, selectedProduct }) => {
  const colors = [
    "pink",
    "black",
    "gray",
    "purple",
    "brown",
    "gold",
    "red",
    "blue",
    "white",
  ];
  return (
    <>
      <Modal open={colorModalOpen} onClose={() => setColorModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Product Colors
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {colors.map((color) => (
              <Box key={color} sx={{ textAlign: "center", width: 80 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: `4px solid ${
                      selectedProduct?.color?.includes(color) ? color : "#ddd"
                    }`, // Dış sınır
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1, // Yazı ile daire arasına boşluk
                    cursor: selectedProduct?.color?.includes(color)
                      ? "pointer"
                      : "not-allowed",
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      bgcolor: color, // İç daire rengi
                      position: "absolute",
                      zIndex: 1,
                      opacity: selectedProduct?.color?.includes(color)
                        ? 1
                        : 0.1, // Renk opaklığı
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: selectedProduct?.color?.includes(color)
                      ? "#000"
                      : "#888",
                    mt: 1, // Dairenin altına biraz boşluk ekleyin
                    fontWeight: selectedProduct?.color?.includes(color)
                      ? "bold"
                      : "normal", // Mevcut renkler bold
                    ml: -4, // Yazıyı dairenin soluna hizalayın
                    display: "block", // Yazının tam ortalanmasını sağlar
                    position: "relative",
                  }}
                >
                  {color}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ColorModal;
