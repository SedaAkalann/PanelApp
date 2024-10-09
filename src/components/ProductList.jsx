import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../Redux/productSlice";
import { Button, IconButton, Box } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import PaletteIcon from "@mui/icons-material/Palette";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import { DataGrid } from "@mui/x-data-grid";
import "../css/productList.css";
import AddModal from "./AddModal";
import ImagesModal from "./ImagesModal";
import EditModal from "./EditModal";
import ColorModal from "./ColorModal";
import SizeModal from "./SizeModal";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    images: [],
    category: "",
    size: [],
    color: [],
    fileNames: [],
  });
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenEditModal = (product) => {
    setEditProduct(product);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditProduct(null);
  };

  const handleSaveChanges = () => {
    dispatch(updateProduct(editProduct));
    handleCloseEditModal();
  };

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    setNewProduct({
      title: "",
      description: "",
      images: [],
      category: "",
      size: [],
      color: [],
      fileNames: [],
    });
  };

  const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    handleCloseAddModal();
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

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

  const columns = [
    { field: "id", headerName: "Product ID", width: 150 },
    { field: "title", headerName: "Product Title", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "category", headerName: "Category", width: 150 },
    {
      field: "images",
      headerName: "View Images",
      width: 150,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleOpenModal(params.row)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <ZoomInIcon style={{ fontSize: "24px" }} />
        </IconButton>
      ),
    },
    {
      field: "colors",
      headerName: "Colors",
      width: 150,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            setSelectedProduct(params.row);
            setColorModalOpen(true);
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PaletteIcon style={{ fontSize: "24px" }} />
        </IconButton>
      ),
    },
    {
      field: "sizes",
      headerName: "Sizes",
      width: 150,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            setSelectedProduct(params.row);
            setSizeModalOpen(true);
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormatSizeIcon style={{ fontSize: "24px" }} />
        </IconButton>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            size="large"
            color="success"
            onClick={() => handleOpenEditModal(params.row)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            size="large"
            color="error"
            onClick={() => handleDeleteProduct(params.row.id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <Box
      sx={{
        marginTop: "30px",
        width: "100%",
        height: "calc(100vh - 100px)",
        "& .MuiDataGrid-root": {
          border: "none",
          "& .MuiDataGrid-virtualScroller": {
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#90caf9",
              borderRadius: "10px",
            },
          },
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "1px solid #ddd",
        },
      }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{
          mb: 2,
          backgroundColor: "#90caf9",
          border: "none",
          "&:hover": { backgroundColor: "#64b5f6" },
        }}
        onClick={handleOpenAddModal}
      >
        Add Product
      </Button>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid rows={products} columns={columns} pageSize={5} />
      </div>
      {/* Product Details Modal */}
      <ImagesModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        selectedProduct={selectedProduct}
      />

      {/* Add Product Modal */}
      <AddModal
        addModalOpen={addModalOpen}
        handleCloseAddModal={handleCloseAddModal}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleAddProduct={handleAddProduct}
        handleImageUpload={handleImageUpload}
      />

      {/* Edit Product Modal */}
      <EditModal
        handleSaveChanges={handleSaveChanges}
        editModalOpen={editModalOpen}
        handleCloseEditModal={handleCloseEditModal}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
      />

      {/* Color Modal */}
      <ColorModal
        colorModalOpen={colorModalOpen}
        setColorModalOpen={setColorModalOpen}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />

      {/* Size Modal */}
      <SizeModal
        sizeModalOpen={sizeModalOpen}
        setSizeModalOpen={setSizeModalOpen}
        selectedProduct={selectedProduct}
      />
    </Box>
  );
};

export default ProductList;
