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

const EditModal = ({
  handleSaveChanges,
  editModalOpen,
  handleCloseEditModal,
  editProduct,
  setEditProduct,
}) => {
  const handleImageUpload = (event, product, setProduct) => {
    const files = Array.from(event.target.files);
    const fileNames = files.map((file) => file.name);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ...imageUrls],
      fileNames: [...(prevProduct.fileNames || []), ...fileNames],
    }));
  };

  return (
    <Modal open={editModalOpen} onClose={handleCloseEditModal}>
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
          onClick={handleCloseEditModal}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Edit Product
        </Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={editProduct?.title || ""}
          onChange={(e) =>
            setEditProduct({ ...editProduct, title: e.target.value })
          }
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={editProduct?.description || ""}
          onChange={(e) =>
            setEditProduct({ ...editProduct, description: e.target.value })
          }
        />
        <TextField
          label="Category"
          fullWidth
          margin="normal"
          value={editProduct?.category || ""}
          onChange={(e) =>
            setEditProduct({ ...editProduct, category: e.target.value })
          }
        />
        <TextField
          label="Size (Separate with commas)"
          fullWidth
          margin="normal"
          value={editProduct?.size?.join(", ") || ""}
          helperText="Please separate sizes with commas."
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              size: e.target.value.split(",").map((s) => s.trim()),
            })
          }
        />
        <TextField
          label="Color (Separate with commas)"
          fullWidth
          margin="normal"
          value={editProduct?.color?.join(", ") || ""}
          helperText="Please separate colors with commas."
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              color: e.target.value.split(",").map((c) => c.trim()),
            })
          }
        />
        <Input
          type="file"
          inputProps={{ multiple: true }}
          onChange={(e) => handleImageUpload(e, editProduct, setEditProduct)}
          sx={{
            display: "none",
          }}
          id="upload-edit-button"
        />
        <label htmlFor="upload-edit-button">
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
          {editProduct?.fileNames?.map((fileName, index) => (
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
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
