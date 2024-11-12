import React, { useState } from "react";
import "./AssignBus.css";
import Header from "../../Components/header/header";
import Footer from "../../Components/footer/footer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function AssignBus() {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filters, setFilters] = useState({
    route: "",
    time: "",
    date: "",
    carrier: "",
    busNumber: "",
    countPlace: "",
  });

  const [openModal, setOpenModal] = useState(false); // Состояние для модального окна
  const [selectedBus, setSelectedBus] = useState(null); // Состояние для выбранного автобуса
  const [rows, setRows] = useState([
    {
      id: 1,
      route: "Минск-Брест",
      time: "08.00-12.00",
      date: "25.05.2024",
      carrier: "Автосервис Минск",
      busNumber: "4567 AB-2",
      countPlace: "30",
    },
    {
      id: 2,
      route: "Чаусы-Могилев",
      time: "13.14-17.15",
      date: "26.05.2024",
      carrier: "МогилевОблАвтотранс",
      busNumber: "1352 AB-5",
      countPlace: "23",
    },
    {
      id: 3,
      route: "Гомель-Гродно",
      time: "09.30-13.30",
      date: "27.05.2024",
      carrier: "ГомельАвтобус",
      busNumber: "7890 AB-3",
      countPlace: "40",
    },
    {
      id: 4,
      route: "Минск-Витебск",
      time: "10.15-12.45",
      date: "28.05.2024",
      carrier: "ВитебскТранс",
      busNumber: "1234 AB-1",
      countPlace: "35",
    },
    {
      id: 5,
      route: "Брест-Лида",
      time: "14.00-16.30",
      date: "29.05.2024",
      carrier: "БрестАвто",
      busNumber: "5678 AB-4",
      countPlace: "28",
    },
    {
      id: 6,
      route: "Могилев-Гомель",
      time: "15.00-19.00",
      date: "30.05.2024",
      carrier: "ГомельОблАвтотранс",
      busNumber: "1357 AB-6",
      countPlace: "22",
    },
    {
      id: 7,
      route: "Витебск-Барановичи",
      time: "12.00-14.30",
      date: "31.05.2024",
      carrier: "ВитебскАвто",
      busNumber: "2468 AB-7",
      countPlace: "36",
    },
    {
      id: 8,
      route: "Лида-Минск",
      time: "11.15-13.45",
      date: "01.06.2024",
      carrier: "ЛидаТранс",
      busNumber: "1359 AB-8",
      countPlace: "24",
    },
    {
      id: 9,
      route: "Слуцк-Гродно",
      time: "16.00-18.30",
      date: "02.06.2024",
      carrier: "СлуцкАвто",
      busNumber: "7531 AB-9",
      countPlace: "20",
    },
    {
      id: 10,
      route: "Барановичи-Гомель",
      time: "09.45-12.15",
      date: "03.06.2024",
      carrier: "БарановичиАвто",
      busNumber: "8642 AB-10",
      countPlace: "32",
    },
    {
      id: 11,
      route: "Могилев-Минск",
      time: "07.30-10.00",
      date: "04.06.2024",
      carrier: "МогилевТранс",
      busNumber: "9753 AB-11",
      countPlace: "26",
    },
    {
      id: 12,
      route: "Гродно-Витебск",
      time: "10.45-13.15",
      date: "05.06.2024",
      carrier: "ГродноАвто",
      busNumber: "8643 AB-12",
      countPlace: "29",
    },
    {
      id: 13,
      route: "Минск-Солигорск",
      time: "14.30-17.00",
      date: "06.06.2024",
      carrier: "МинскАвто",
      busNumber: "7534 AB-13",
      countPlace: "34",
    },
    {
      id: 14,
      route: "Брест-Гомель",
      time: "15.15-17.45",
      date: "07.06.2024",
      carrier: "БрестТранс",
      busNumber: "1596 AB-14",
      countPlace: "21",
    },
    {
      id: 15,
      route: "Витебск-Лида",
      time: "09.00-11.30",
      date: "08.06.2024",
      carrier: "ВитебскАвтобус",
      busNumber: "7532 AB-15",
      countPlace: "27",
    },
    {
      id: 16,
      route: "Гродно-Минск",
      time: "12.15-14.45",
      date: "09.06.2024",
      carrier: "ГродноТранс",
      busNumber: "1350 AB-16",
      countPlace: "25",
    },
    {
      id: 17,
      route: "Слуцк-Чаусы",
      time: "11.00-13.30",
      date: "10.06.2024",
      carrier: "СлуцкАвтобус",
      busNumber: "2460 AB-17",
      countPlace: "22",
    },
    {
      id: 18,
      route: "Барановичи-Витебск",
      time: "13.45-16.15",
      date: "11.06.2024",
      carrier: "БарановичиТранс",
      busNumber: "9876 AB-18",
      countPlace: "30",
    },
    {
      id: 19,
      route: "Гомель-Чаусы",
      time: "14.30-17.00",
      date: "12.06.2024",
      carrier: "ГомельТранс",
      busNumber: "5432 AB-19",
      countPlace: "28",
    },
    {
      id: 20,
      route: "Минск-Барановичи",
      time: "09.30-12.00",
      date: "13.06.2024",
      carrier: "МинскАвтобус",
      busNumber: "1354 AB-20",
      countPlace: "33",
    },
  ]);

  const handleRowClick = (id) => {
    setSelectedRowId(id);
  };

  const handleOpenModal = () => {
    const selectedRow = rows.find((row) => row.id === selectedRowId);
    if (selectedRow) {
      setSelectedBus({
        busNumber: selectedRow.busNumber,
        countPlace: selectedRow.countPlace,
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBus(null); // Сброс выбранного автобуса при закрытии
  };

  const NewBus = () => {
    if (selectedRowId) {
      handleOpenModal(); // Открываем модальное окно
    } else {
      console.log("Выберите запись для изменения");
    }
  };

  const handleBusSelect = (event, value) => {
    setSelectedBus(value); // Устанавливаем выбранный автобус
  };

  const confirmSelection = () => {
    if (selectedBus && selectedRowId !== null) {
      // Обновляем данные в строке таблицы
      const updatedRows = rows.map((row) => {
        if (row.id === selectedRowId) {
          return {
            ...row,
            busNumber: selectedBus.busNumber,
            countPlace: selectedBus.countPlace,
          };
        }
        return row;
      });
      setRows(updatedRows); // Обновляем состояние строк
      handleCloseModal(); // Закрываем модальное окно
    }
  };

  const buses = [
    { busNumber: "4567 AB-2", countPlace: 30 },
    { busNumber: "1352 AB-5", countPlace: 23 },
    { busNumber: "7890 AB-3", countPlace: 40 },
    { busNumber: "1234 AB-1", countPlace: 50 },
    { busNumber: "5678 AB-4", countPlace: 35 },
    { busNumber: "9101 AB-6", countPlace: 20 },
  ];

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key].toString();
    const bValue = b[sortConfig.key].toString();

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredRows = sortedRows.filter((row) => {
    return Object.keys(filters).every((key) => {
      return row[key]
        .toString()
        .toLowerCase()
        .includes(filters[key].toLowerCase());
    });
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Header />
      <main>
        {/* Фильтрация */}
        <div className="filters">
          <input
            type="text"
            placeholder="Фильтр по маршруту"
            name="route"
            value={filters.route}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            placeholder="Фильтр по времени"
            name="time"
            value={filters.time}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            placeholder="Фильтр по дате"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            placeholder="Фильтр по перевозчику"
            name="carrier"
            value={filters.carrier}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            placeholder="Фильтр по номеру автобуса"
            name="busNumber"
            value={filters.busNumber}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            placeholder="Фильтр по количеству мест"
            name="countPlace"
            value={filters.countPlace}
            onChange={handleFilterChange}
          />
        </div>

        {/* Таблица */}
        <div className="table-container">
          <div
            className="table-container"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <table className="bus-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th onClick={() => handleSort("route")}>Маршрут</th>
                  <th onClick={() => handleSort("time")}>
                    Прибытие/Отправление
                  </th>
                  <th onClick={() => handleSort("date")}>Дата</th>
                  <th onClick={() => handleSort("carrier")}>Перевозчик</th>
                  <th onClick={() => handleSort("busNumber")}>
                    Номер автобуса
                  </th>
                  <th onClick={() => handleSort("countPlace")}>Кол-во мест</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className={selectedRowId === row.id ? "selected" : ""}
                    onClick={() => handleRowClick(row.id)}
                  >
                    <td>{row.id}</td>
                    <td>{row.route}</td>
                    <td>{row.time}</td>
                    <td>{row.date}</td>
                    <td>{row.carrier}</td>
                    <td>{row.busNumber}</td>
                    <td>{row.countPlace}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Кнопка действия */}
        <Button sx={{ margin: 1 }} className="action-button" onClick={NewBus}>
          Изменить
        </Button>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={style}>
            <h2>Выберите автобус</h2>
            <Autocomplete
              disablePortal
              options={buses} // Используем массив автобусов
              getOptionLabel={(option) =>
                `${option.busNumber} - ${option.countPlace} мест`
              } // Формат отображения
              value={selectedBus} // Устанавливаем текущее значение
              onChange={handleBusSelect} // Обработчик выбора автобуса
              sx={{ width: 300, margin: "auto" }}
              renderInput={(params) => (
                <TextField {...params} label="Автобус/Места" />
              )}
            />
            <Button
              sx={{ display: "block", margin: "auto", marginTop: 1 }}
              className="button-agree"
              onClick={confirmSelection}
            >
              Подтвердить
            </Button>
          </Box>
        </Modal>
      </main>
      <Footer />
    </div>
  );
}

export default AssignBus;
