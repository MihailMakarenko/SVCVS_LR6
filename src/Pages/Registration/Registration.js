import React, { useState } from "react";
import InputMask from "react-input-mask";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Registration.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const phonePattern = /^\+375\s?(25|29|33|44)\s?\d{3}\s?\d{2}\s?\d{2}$/; // Шаблон для номера РБ

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "Имя обязательно";
    if (!formData.lastName) newErrors.lastName = "Фамилия обязательна";
    if (!formData.email) newErrors.email = "Почта обязательна";
    if (!formData.phone) {
      newErrors.phone = "Номер телефона обязателен";
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone =
        "Введите корректный номер телефона (например, +375 29 XXX XXXX)";
    }
    if (!formData.password) newErrors.password = "Пароль обязателен";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Пароли не совпадают";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Отправка данных на сервер
      console.log("Данные отправлены:", formData);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="registration-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="Имя"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="lastName"
            placeholder="Фамилия"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Почта"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <InputMask
            mask="+375 99 999 99 99"
            name="phone"
            placeholder="Номер телефона (например, +375 29 XXX XX XX)"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Подтверждение пароля"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <React.Fragment>
          <button
            className="button-open-dialog"
            variant="outlined"
            onClick={handleClickOpen}
          >
            Open alert dialog
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Модальное окно что бы было"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Это окно необходимо что бы сдать 3 лабу
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button onClick={handleClose}>Несогласн</button>
              <button onClick={handleClose} autoFocus>
                Согласен
              </button>
            </DialogActions>
          </Dialog>
        </React.Fragment>

        <button type="submit" className="submit-button">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
