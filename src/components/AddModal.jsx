import {
  Button,
  IconButton,
  Input,
  List,
  ListItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const AddModal = ({
  addModalOpen,
  handleCloseAddModal,
  newProduct,
  setNewProduct,
  handleAddProduct,
  handleImageUpload,
}) => {
  const { title, description, images, category, size, color, fileNames } =
    newProduct;
  return (
    <Modal open={addModalOpen} onClose={handleCloseAddModal}>
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
          onClick={handleCloseAddModal}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Add Product
        </Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <TextField
          label="Category"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />
        <TextField
          label="Size (Separate with commas)"
          fullWidth
          margin="normal"
          value={size.join(", ")}
          helperText="Please separate sizes with commas."
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              size: e.target.value.split(",").map((s) => Number(s.trim())),
            })
          }
        />
        <TextField
          label="Color (Separate with commas)"
          fullWidth
          margin="normal"
          value={color.join(", ")}
          helperText="Please separate colors with commas."
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              color: e.target.value.split(",").map((c) => c.trim()),
            })
          }
        />
        <Input
          type="file"
          inputProps={{ multiple: true }}
          onChange={(e) => handleImageUpload(e, newProduct, setNewProduct)}
          sx={{
            display: "none",
          }}
          id="upload-button"
        />
        <label htmlFor="upload-button">
          <Button
            variant="contained"
            component="span"
            sx={{
              mb: 2,
              backgroundColor: "#90caf9",
              border: "none",
              "&:hover": { backgroundColor: "#64b5f6" },
            }}
          >
            Dosya Seç
          </Button>
        </label>
        <List>
          {fileNames.map((fileName, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography sx={{ color: "#90caf9", marginRight: 1 }}>
                •
              </Typography>
              <Typography>{fileName}</Typography>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            backgroundColor: "#90caf9",
            border: "none",
            "&:hover": { backgroundColor: "#64b5f6" },
          }}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Box>
    </Modal>
  );
};

export default AddModal;
