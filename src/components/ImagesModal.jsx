import { IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const ImagesModal = ({ modalOpen, handleCloseModal, selectedProduct }) => {
  return (
    <Modal open={modalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          maxHeight: "80%",
          bgcolor: "white",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#90caf9",
            borderRadius: "10px",
          },
        }}
      >
        <IconButton
          onClick={handleCloseModal}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Product Images
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {selectedProduct?.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${selectedProduct.title} - ${index + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                marginBottom: "10px",
              }}
            />
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default ImagesModal;
