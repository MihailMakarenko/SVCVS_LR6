import "./AutorizationModal.css";
import React, { useState } from "react";
import Form from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Label from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";

function AutorizationModal() {
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
      <form onSubmit={handleSubmit}>
        <h2>Авторизация</h2>
        <div>
          <EmailIcon
            sx={{ verticalAlign: "middle", paddingRight: 1 }}
          ></EmailIcon>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label>Электронная почта</Label>
        </div>
        <div>
          <KeyIcon sx={{ verticalAlign: "middle", paddingRight: 1 }}></KeyIcon>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Label>Пароль</Label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="button-enter">
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginBottom: 2,
              backgroundColor: "#28a745",
              color: "white",
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
          >
            Войти
          </Button>
        </div>
        <Button
          variant="text"
          // sx={{
          //   ":hover": {
          //     Color: "white",
          //   },
          // }}
        >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
}

export default AutorizationModal;
