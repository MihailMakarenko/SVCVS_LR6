import React, { useEffect, useState } from "react";
import Footer from "../../Components/footer/footer";
import Header from "../../Components/header/header";
import "./AvailableBus.css";
import CardBus from "../../Components/cardBus/cardBus";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Label from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation
import { addRoute, deleteRoute, updateRoute } from "../../store/slice/busSlice";

const ModalWindow = ({ onClose, record }) => (
  <div className="modal">
    <div className="modal-content-bus-info">
      <span className="close-button" onClick={onClose}>
        &times;
      </span>
      <CardBus {...record} />
    </div>
  </div>
);

function AvailableBus() {
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const BusRoutes = useSelector((state) => state.BusRoute);
  const dispatch = useDispatch();

  useEffect(() => {
    // Оставляем только BusRoutes как источник истины для карточек
  }, [BusRoutes]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleDisplayAlert = (route) => {
    setSelectedRecord(route);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  const handleCreateRouteSuccess = (message) => {
    setNotification({
      open: true,
      message,
      severity: "success",
    });
  };

  const handleCreateRouteError = (message) => {
    setNotification({
      open: true,
      message,
      severity: "error",
    });
  };

  const formik = useFormik({
    initialValues: {
      startCity: "",
      finishCity: "",
      startTime: "",
      finishTime: "",
      price: "",
      platformNumber: "",
      carrier: "",
      DefaultBusNumber: "", // Поле для номера автобуса
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    validationSchema: Yup.object({
      startCity: Yup.string().required("Начальный город обязателен"),
      finishCity: Yup.string().required("Конечный город обязателен"),
      startTime: Yup.string().required("Время отправления обязательно"),
      finishTime: Yup.string().required("Время прибытия обязательно"),
      price: Yup.number().required("Цена обязательна"),
      platformNumber: Yup.number().required("Номер платформы обязателен"),
      DefaultBusNumber: Yup.string().required("Номер автобуса обязателен"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editIndex !== null) {
        dispatch(updateRoute({ id: values.id, ...values }));
        handleCreateRouteSuccess("Запись успешно обновлена!");
        setEditIndex(null);
      } else {
        dispatch(addRoute({ id: BusRoutes.length + 1, ...values }));
        handleCreateRouteSuccess("Запись успешно добавлена!");
      }
      resetForm();
    },
  });

  const handleEdit = (index) => {
    const routeToEdit = BusRoutes[index];
    setEditIndex(index);
    formik.setValues(routeToEdit);
  };

  const handleDelete = (index) => {
    const routeToDelete = BusRoutes[index];
    dispatch(deleteRoute({ id: routeToDelete.id }));
    setNotification({
      open: true,
      message: "Запись успешно удалена!",
      severity: "error",
    });
  };

  const filteredRoutes = BusRoutes.filter(
    (route) =>
      route.startCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.finishCity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    const aValue = a[sortConfig.key].toLowerCase();
    const bValue = b[sortConfig.key].toLowerCase();
    return aValue < bValue
      ? sortConfig.direction === "asc"
        ? -1
        : 1
      : sortConfig.direction === "asc"
      ? 1
      : -1;
  });

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div className="App">
      <Header />

      <div className="DivDisplayFlex AvailableBus-class">
        <div>
          <h2>Таблица маршрутов</h2>
          <input
            className="Search-input"
            type="text"
            placeholder="Поиск по таблице..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="TableContainer">
            <table className="TableClass">
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort("startCity")}
                    style={{ cursor: "pointer" }}
                  >
                    Город отправления
                  </th>
                  <th
                    onClick={() => handleSort("finishCity")}
                    style={{ cursor: "pointer" }}
                  >
                    Город прибытия
                  </th>
                  <th
                    onClick={() => handleSort("startTime")}
                    style={{ cursor: "pointer" }}
                  >
                    Время отправления
                  </th>
                  <th
                    onClick={() => handleSort("finishTime")}
                    style={{ cursor: "pointer" }}
                  >
                    Время прибытия
                  </th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {sortedRoutes.map((route, index) => (
                  <tr key={index}>
                    <td>{route.startCity}</td>
                    <td>{route.finishCity}</td>
                    <td>{route.startTime}</td>
                    <td>{route.finishTime}</td>
                    <td>
                      <button
                        className="buttonTableClass"
                        onClick={() => handleEdit(index)}
                      >
                        Изменить
                      </button>
                      <button
                        className="buttonTableClass"
                        onClick={() => handleDelete(index)}
                      >
                        Удалить
                      </button>
                      <button
                        className="buttonTableClass"
                        onClick={() => handleDisplayAlert(route)}
                      >
                        Информация
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <form className="FormAddRoute" onSubmit={formik.handleSubmit}>
          <h2>
            {editIndex !== null ? "Редактировать поездку" : "Добавить поездку"}
          </h2>

          <Autocomplete
            options={["Чаусы-Могилев", "Чаусы-Могилев 2", "Чаусы-Могилев 3"]}
            value={`${formik.values.startCity}-${formik.values.finishCity}`}
            onChange={(event, newValue) => {
              if (newValue) {
                const [startCity, finishCity] = newValue.split("-");
                formik.setFieldValue("startCity", startCity);
                formik.setFieldValue("finishCity", finishCity);
              } else {
                // Если newValue null, очищаем значения полей
                formik.setFieldValue("startCity", "");
                formik.setFieldValue("finishCity", "");
              }
            }}
            renderInput={(params) => <TextField {...params} label="Маршрут" />}
          />

          <div className="DivDisplayFlex">
            <Label>Время отправления:</Label>
            <Input
              type="time"
              name="startTime"
              value={formik.values.startTime}
              onChange={formik.handleChange}
              required
            />
          </div>

          <div className="DivDisplayFlex">
            <Label>Время прибытия:</Label>
            <Input
              type="time"
              name="finishTime"
              value={formik.values.finishTime}
              onChange={formik.handleChange}
              required
            />
          </div>

          <div className="DivDisplayFlex">
            <Label>
              Цена:
              <Input
                sx={{ maxWidth: 70 }}
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                required
              />
              {" p."}
            </Label>
          </div>

          <div className="DivDisplayFlex">
            <Label>Номер платформы:</Label>
            <Input
              sx={{ maxWidth: 60 }}
              type="number"
              name="platformNumber"
              value={formik.values.platformNumber}
              onChange={formik.handleChange}
              required
            />
          </div>

          <Autocomplete
            sx={{ marginTop: 3 }}
            options={["Перевозчик 1", "Перевозчик 2", "Перевозчик 3"]}
            value={formik.values.carrier}
            onChange={(event, newValue) =>
              formik.setFieldValue("carrier", newValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Перевозчик" />
            )}
          />

          <Autocomplete
            sx={{ marginTop: 3 }}
            options={["№ 101", "№ 102", "№ 103", "№ 104"]}
            value={formik.values.DefaultBusNumber}
            onChange={(event, newValue) =>
              formik.setFieldValue("DefaultBusNumber", newValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Номер автобуса" />
            )}
          />

          <div className="table-container-weekdays">
            <table className="WeekdaysTable">
              <thead>
                <tr>
                  <th>Пн</th>
                  <th>Вт</th>
                  <th>Ср</th>
                  <th>Чт</th>
                  <th>Пт</th>
                  <th>Сб</th>
                  <th>Вс</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {[
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday",
                  ].map((day) => (
                    <td key={day}>
                      <input
                        type="checkbox"
                        checked={formik.values[day]}
                        onChange={() =>
                          formik.setFieldValue(day, !formik.values[day])
                        }
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <Button sx={{ marginTop: 2 }} type="submit">
            {editIndex !== null ? "Сохранить изменения" : "Добавить поездку"}
          </Button>
        </form>
      </div>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {showModal && selectedRecord && (
        <ModalWindow onClose={closeModal} record={selectedRecord} />
      )}

      <Footer />
    </div>
  );
}

export default AvailableBus;
