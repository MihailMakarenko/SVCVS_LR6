import Footer from "../../Components/footer/footer";
import Header from "../../Components/header/header";
import React, { useState } from "react";
import Form from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Label from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

function Autorization() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Простейшая валидация
    if (!email || !password) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    // Здесь можно добавить логику для отправки данных на сервер
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div>
      <Header></Header>
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
        <h2>Авторизация</h2>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>
              Электронная почта:
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Label>
          </div>
          <div>
            <Label>
              Пароль:
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Label>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#28a745",
              color: "white",
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
          >
            Войти
          </Button>
        </Form>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Autorization;
