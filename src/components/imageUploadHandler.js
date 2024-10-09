// import React, { useState } from "react";

// export default function ProductList() {
//   const [product, setProduct] = useState({ images: [] });

//   const handleFileChange = (event) => {
//     handleImageUpload(event.target.files);
//   };

//   const handleImageUpload = (files) => {
//     if (!files) {
//       console.error("No files provided.");
//       return;
//     }

//     const fileArray = Array.from(files);
//     const newImageUrls = fileArray.map((file) => URL.createObjectURL(file));

//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       images: [...prevProduct.images, ...newImageUrls],
//     }));
//   };

//   return (
//     <div>
//       <input type="file" multiple onChange={handleFileChange} />
//       <div>
//         {product.images.map((image, index) => (
//           <img key={index} src={image} alt={`Uploaded ${index}`} />
//         ))}
//       </div>
//     </div>
//   );
// }

// incele sonra
