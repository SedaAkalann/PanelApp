// Redux/dashboardSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    section: "welcome",
  },
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
    },
  },
});

// handleImageUpload fonksiyonunu buraya ekleyin
export const handleImageUpload = (event, productForm, setProductForm) => {
  const files = event.target.files;
  if (files) {
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setProductForm((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  }
};

export const { setSection } = dashboardSlice.actions;

export default dashboardSlice.reducer;
