import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Geri butonu ikonu
import axios from "axios"; // Axios eklenmiş

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
  firstName: Yup.string().required("İsim gereklidir"),
  lastName: Yup.string().required("Soyisim gereklidir"),
  phoneNumber: Yup.string().required("Telefon numarası gereklidir"),
  address: Yup.string().required("Adres gereklidir"),
  companyName: Yup.string().required("Şirket adı gereklidir"),
  terms: Yup.bool().oneOf([true], "Şartları kabul etmeniz gerekmektedir"),
});

const CorporateSignUpPage = () => {
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = React.useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      companyName: "",
      terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { email, password } = values;

      // Sadece email ve password'ü gönderiyoruz
      axios
        .post("http://localhost:3000/users", { email, password })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          setSignUpError(
            "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin."
          );
          console.log(error);
        });
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
          Kurumsal Kayıt
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
            name="firstName"
            label="İsim"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            name="lastName"
            label="Soyisim"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
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
          <TextField
            name="companyName"
            label="Şirket Adı"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyName}
            error={
              formik.touched.companyName && Boolean(formik.errors.companyName)
            }
            helperText={formik.touched.companyName && formik.errors.companyName}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="terms"
                color="primary"
                onChange={formik.handleChange}
                checked={formik.values.terms}
              />
            }
            label="Kullanım şartlarını kabul ediyorum"
          />
          {formik.touched.terms && formik.errors.terms && (
            <div style={{ color: "red" }}>{formik.errors.terms}</div>
          )}
          {signUpError && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {signUpError}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Kayıt Ol
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default CorporateSignUpPage;
