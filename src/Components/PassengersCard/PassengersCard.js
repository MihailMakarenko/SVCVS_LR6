import "./PassengersCard.css";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./PassengerCard.css"; // Подключите свой файл стилей

const PassengerCard = ({ passenger, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Обязательное поле"),
    lastName: Yup.string().required("Обязательное поле"),
    middleName: Yup.string(),
    phone: Yup.string()
      .required("Обязательное поле")
      .matches(/^[0-9]{10}$/, "Неправильный номер телефона"),
  });

  const handleEdit = (values) => {
    onUpdate(values);
    setIsEditing(false);
  };

  return (
    <div className="passenger-card">
      {isEditing ? (
        <Formik
          initialValues={passenger}
          validationSchema={validationSchema}
          onSubmit={handleEdit}
        >
          {() => (
            <Form>
              <div className="form-group">
                <label htmlFor="firstName">Имя</label>
                <Field type="text" name="firstName" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Фамилия</label>
                <Field type="text" name="lastName" />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="middleName">Отчество</label>
                <Field type="text" name="middleName" />
                <ErrorMessage
                  name="middleName"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Номер телефона</label>
                <Field type="text" name="phone" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>

              <button type="submit">Сохранить</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Отменить
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div>
          <p>
            <strong>Имя:</strong> {passenger.firstName}
          </p>
          <p>
            <strong>Фамилия:</strong> {passenger.lastName}
          </p>
          <p>
            <strong>Отчество:</strong> {passenger.middleName}
          </p>
          <p>
            <strong>Номер телефона:</strong> {passenger.phone}
          </p>
          <button onClick={() => setIsEditing(true)}>Изменить</button>
          <button onClick={() => onDelete(passenger.id)}>Удалить</button>
        </div>
      )}
    </div>
  );
};

export default PassengerCard;
