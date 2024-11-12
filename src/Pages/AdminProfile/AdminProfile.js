import React, { useState } from "react";
import Counter from "../../Components/counterAddRemove/Counter";
import Header from "../../Components/header/header";
import "./AdminProfile.css";
import Footer from "../../Components/footer/footer";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid"; // Убедитесь, что импортирован DataGrid

function AdminProfile() {
  const [busNumber, setBusNumber] = useState("");

  const handleBusNumberChange = (e) => {
    const { value } = e.target;
    const cleanedValue = value.replace(/[^0-9A-Za-z -]/g, "");
    let formattedValue = "";
    const parts = cleanedValue.split(" - ");

    if (parts[0]) {
      const firstPart = parts[0].replace(/[^0-9A-Za-z]/g, "").slice(0, 6);
      if (firstPart.length > 4) {
        formattedValue = `${firstPart.slice(0, 4)} ${firstPart.slice(4, 6)}`;
      } else {
        formattedValue = firstPart;
      }
    }

    if (parts.length > 1) {
      const secondPart = parts[1].replace(/[^0-9]/g, "").slice(0, 1);
      if (secondPart >= "1" && secondPart <= "7") {
        formattedValue += ` - ${secondPart}`;
      }
    }

    setBusNumber(formattedValue.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(busNumber); // Логика для отправки данных
  };

  const rows = [
    { id: 1, startCity: "Чаусы", finishCity: "Могилев", distance: 35 },
    { id: 2, startCity: "Брест", finishCity: "Чаусы", distance: 42 },
    { id: 3, startCity: "Витебс", finishCity: "Чаусы", distance: 45 },
    { id: 4, startCity: "Горки", finishCity: "Чаусы", distance: 16 },
    { id: 5, startCity: "Гомель", finishCity: "Чаусы", distance: null },
    { id: 6, startCity: "Минск", finishCity: "Чаусы", distance: 150 },
    { id: 7, startCity: "Речица", finishCity: "Чаусы", distance: 44 },
    { id: 8, startCity: "Несвиж", finishCity: "Чаусы", distance: 36 },
    { id: 9, startCity: "Полоцк", finishCity: "Чаусы", distance: 65 },
  ];

  return (
    <div>
      <Header />
      <main>
        <div className="div-flex-container">
          <div className="form-container">
            <h2>Добавить автобус</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="bus-number">Номер автобуса</label>
                <Input
                  type="text"
                  id="bus-number"
                  name="bus-number"
                  value={busNumber}
                  onChange={handleBusNumberChange}
                  required
                  placeholder="1234 AB - 5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bus-model">Модель</label>
                <Input type="text" id="bus-model" name="bus-model" required />
              </div>
              <Counter countName={"Количество мест"} />
              <button className="add" type="submit">
                Добавить автобус
              </button>
            </form>
          </div>
          <div className="data-grid-route">
            <DataGridBuses></DataGridBuses>
          </div>
        </div>

        <div className="div-flex-container">
          <div className="form-container">
            <h2>Добавить маршрут</h2>
            <form>
              <div className="form-group">
                <label htmlFor="start-city">Начальный город</label>
                <Input type="text" id="start-city" name="start-city" required />
              </div>
              <div className="form-group">
                <label htmlFor="end-city">Конечный город</label>
                <Input type="text" id="end-city" name="end-city" required />
              </div>
              <Counter countName={"Расстояние (км)"} />
              <button className="add" type="submit">
                Добавить маршрут
              </button>
            </form>
          </div>

          <div className="data-grid-route">
            <DataGridRoutes rows={rows}></DataGridRoutes>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function DataGridRoutes(rows) {
  // Пример столбцов и строк для DataGrid
  const columns = [
    { field: "id", headerName: "Номер", width: 70 },
    { field: "startCity", headerName: "Начальный", width: 130 },
    { field: "finishCity", headerName: "Конечный", width: 130 },
    {
      field: "distance",
      headerName: "Расстояние",
      type: "number",
      width: 80,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          border: 0,
        }}
      />
    </Paper>
  );
}

function DataGridBuses() {
  // Пример столбцов и строк для DataGrid
  const columns = [
    { field: "id", headerName: "Номер", width: 70 },
    { field: "BusNumber", headerName: "Рег знак", width: 130 },
    { field: "BusModel", headerName: "Модель", width: 130 },
    {
      field: "counteSuite",
      headerName: "Кол мест",
      type: "number",
      width: 80,
    },
  ];

  const rows = [
    { id: 1, BusNumber: "2222 tt-5", BusModel: "ГАЗ211", counteSuite: 35 },
    { id: 2, BusNumber: "1234 qf-5", BusModel: "ГАЗ212", counteSuite: 42 },
    { id: 3, BusNumber: "2342 qw-6", BusModel: "ГАЗ281", counteSuite: 45 },
    { id: 4, BusNumber: "5321 wp-7", BusModel: "ГАЗ211", counteSuite: 16 },
    { id: 5, BusNumber: "1111 qf-1", BusModel: "ГАЗ271", counteSuite: 19 },
    { id: 6, BusNumber: "2222 rt-2", BusModel: "ГАЗ211", counteSuite: 150 },
    { id: 7, BusNumber: "3333 sr-5", BusModel: "ГАЗ261", counteSuite: 44 },
    { id: 8, BusNumber: "4444 wt-6", BusModel: "ГАЗ251", counteSuite: 36 },
    { id: 9, BusNumber: "5555 rt-8", BusModel: "ГАЗ211", counteSuite: 65 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default AdminProfile;
