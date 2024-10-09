import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const SizeModal = ({ sizeModalOpen, setSizeModalOpen, selectedProduct }) => {
  return (
    <div>
      <Modal open={sizeModalOpen} onClose={() => setSizeModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350, // Modalın genişliği
            maxHeight: "80vh", // Modalın maksimum yüksekliği, ekran boyutuna göre ayarlanır
            overflowY: "auto", // İçerik fazla olduğunda kaydırma çubuğu göster
            bgcolor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Available Sizes
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1, // Butonlar arasındaki boşluk
            }}
          >
            {Array.from({ length: 13 }, (_, i) => i + 32).map((s) => {
              const isAvailable = selectedProduct?.size?.includes(s);

              return (
                <Button
                  key={s}
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "8px 16px", // Buton iç paddingi
                    margin: "4px", // Butonlar arasındaki boşluk
                    backgroundColor: isAvailable
                      ? "#90caf9" // Uygun olan butonlar için renk
                      : "#f5f5f5", // Uygun olmayan butonlar için renk
                    color: isAvailable
                      ? "#000" // Uygun olan butonlar için yazı rengi
                      : "#b0b0b0", // Uygun olmayan butonlar için yazı rengi
                    textDecoration: isAvailable ? "none" : "line-through", // Üzerinde çizili butonlar
                    opacity: isAvailable ? 1 : 0.5, // Uygun olmayan butonlar için opasite
                    "&:hover": {
                      backgroundColor: isAvailable
                        ? "#64b5f6" // Uygun olan butonlar için hover rengi
                        : "#e0e0e0", // Uygun olmayan butonlar için hover rengi
                      color: isAvailable
                        ? "#000" // Uygun olan butonlar için hover yazı rengi
                        : "#a0a0a0", // Uygun olmayan butonlar için hover yazı rengi
                    },
                    "&:disabled": {
                      opacity: 1,
                      cursor: "default",
                    },
                    fontSize: "0.875rem", // Buton yazı font boyutu
                    minWidth: "40px", // Butonların minimum genişliği
                    height: "40px", // Butonların yüksekliği
                  }}
                  disabled={!isAvailable} // Uygun olmayan butonları devre dışı bırak
                >
                  {s}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SizeModal;
