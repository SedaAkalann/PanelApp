import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Geri butonu ikonu
import RainAnimation from "../components/RainAnimation"; // Animasyon bileşeni

// Validasyon şeması
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Geçerli bir email girin")
    .required("Email gereklidir"),
  password: Yup.string()
    .required("Şifre gereklidir")
    .matches(/[a-z]/, "En az bir küçük harf içermelidir")
    .matches(/[A-Z]/, "En az bir büyük harf içermelidir")
    .matches(/.{8,}/, "En az 8 karakter olmalıdır")
    .matches(/\d/, "En az bir sayı içermelidir"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifreler eşleşmelidir")
    .required("Şifre tekrarı gereklidir"),
  name: Yup.string().required("Ad gereklidir"),
  surname: Yup.string().required("Soyad gereklidir"),
  phoneNumber: Yup.string().required("Telefon numarası gereklidir"),
  address: Yup.string().required("Adres gereklidir"),
});

const IndividualSignupPage = () => {
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = React.useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      surname: "",
      phoneNumber: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        await axios.post("http://localhost:3000/users", {
          email,
          password,
        });
        navigate("/"); // Kayıttan sonra ana sayfaya yönlendir
      } catch (error) {
        setSignUpError(
          "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin."
        );
      }
    },
  });

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RainAnimation />
      <Container
        maxWidth="sm"
        disableGutters
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.9)",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          zIndex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh", // Formun ekranın ortasında kalması için minimum yüksekliği belirledik
          marginTop: "5vh", // Üstten boşluk ekledik
        }}
      >
        <IconButton
          onClick={() => navigate("/")}
          sx={{ position: "absolute", top: 16, left: 16 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" align="center" gutterBottom>
          Bireysel Kayıt
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name="password"
            label="Şifre"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            name="confirmPassword"
            label="Şifre Tekrarı"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <TextField
            name="name"
            label="Ad"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            name="surname"
            label="Soyad"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.surname}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
          />
          <TextField
            name="phoneNumber"
            label="Telefon Numarası"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <TextField
            name="address"
            label="Adres"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Kayıt Ol
          </Button>
          {signUpError && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {signUpError}
            </Typography>
          )}
        </form>
      </Container>
    </Box>
  );
};

export default IndividualSignupPage;
