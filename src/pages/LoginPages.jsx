import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RainAnimation from "../components/RainAnimation";

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
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password"), null], "Şifreler eşleşmelidir")
  //   .required("Şifre tekrarı gereklidir"),
  terms: Yup.bool().oneOf([true], "Şartları kabul etmeniz gerekmektedir"),
});

const LoginPages = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = React.useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;

      try {
        const response = await axios.get("http://localhost:3000/users");
        const users = response.data;

        // Kullanıcıları kontrol et
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          navigate("/dashboard");
        } else {
          setLoginError(
            "Kaydınız bulunmamaktadır, lütfen kayıt seçeneklerinden birini kullanarak kayıt olunuz."
          );
        }
      } catch (error) {
        setLoginError("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    },
  });

  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      <RainAnimation />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          position: "relative",
          zIndex: 1, // Particles arka planda kalacak
        }}
      >
        <Box
          sx={{
            width: "35%",
            bgcolor: "rgba(255, 255, 255, 0.9)",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Giriş Yap
          </Typography>
          <form onSubmit={formik.handleSubmit}>
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
            {/* <TextField
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
            /> */}
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
            {loginError && (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                {loginError}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Giriş Yap
            </Button>
            <Box
              sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/signup/individual")}
              >
                Bireysel Kayıt
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/signup/corporate")}
              >
                Kurumsal Kayıt
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPages;
