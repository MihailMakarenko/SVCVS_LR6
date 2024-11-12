import Footer from "../../Components/footer/footer";
import Header from "../../Components/header/header";
import "./UserPage.css";
import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import OrderCard from "../../Components/OrderCard/OrderCard";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PeopleIcon from "@mui/icons-material/People";

export default function UserPage() {
  const [value, setValue] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4; // Количество элементов на странице
  const navigate = useNavigate();

  // Функция для перехода на другую страницу
  const handleNavigate = (newValue) => {
    if (newValue === 2) {
      navigate("/");
    } else {
      setValue(newValue);
      setCurrentPage(1); // Сбрасываем страницу при смене вкладки
    }
  };

  // Фильтрация поездок по статусу
  const ongoingTrips = trips.filter(
    (trip) => trip.status === "В пути" || trip.status === "Заказан"
  );
  const completedTrips = trips.filter(
    (trip) => trip.status === "Завершён" || trip.status === "Отменен"
  );

  // Определяем текущие поездки для страницы
  const currentTrips = value === 0 ? completedTrips : ongoingTrips;
  const totalPages = Math.ceil(currentTrips.length / itemsPerPage); // Общее количество страниц

  // Вычисляем поездки для текущей страницы
  const displayedTrips = currentTrips.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Header />
      <main>
        {value === 0 && ( // Если выбрана "История"
          <>
            <h2>История</h2>
            <div className="card-container-userPage">
              {displayedTrips.map((trip, index) => (
                <OrderCard
                  key={index}
                  startCity={trip.startCity}
                  finishCity={trip.finishCity}
                  startTime={trip.startTime}
                  finishTime={trip.finishTime}
                  dateDeparture={trip.dateDeparture}
                  carrier={trip.carrier}
                  busNumber={trip.busNumber}
                  places={trip.places}
                  status={trip.status}
                />
              ))}
            </div>
          </>
        )}

        {value === 1 && ( // Если выбрана "Активные"
          <>
            <h2>Активные</h2>
            <div className="card-container-userPage">
              {displayedTrips.map((trip, index) => (
                <OrderCard
                  key={index}
                  startCity={trip.startCity}
                  finishCity={trip.finishCity}
                  startTime={trip.startTime}
                  finishTime={trip.finishTime}
                  dateDeparture={trip.dateDeparture}
                  carrier={trip.carrier}
                  busNumber={trip.busNumber}
                  places={trip.places}
                  status={trip.status}
                />
              ))}
            </div>
          </>
        )}

        <div className="pagination-container">
          <Pagination
            count={totalPages}
            variant="outlined"
            color="primary"
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)} // Обновляем текущую страницу
          />
        </div>
      </main>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => handleNavigate(newValue)}
        >
          <BottomNavigationAction label="История" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Активные" icon={<AccessTimeIcon />} />
          <BottomNavigationAction label="Заказать" icon={<AddCircleIcon />} />
          <BottomNavigationAction label="Пассажиры" icon={<PeopleIcon />} />
        </BottomNavigation>
      </Paper>
      <Footer />
    </Box>
  );
}

const trips = [
  {
    startCity: "Чаусы",
    finishCity: "Могилев",
    startTime: "10:20",
    finishTime: "13:20",
    dateDeparture: "2024-08-24",
    carrier: "МогилевОблАвтотранс",
    busNumber: "2341 AB-6",
    places: [25, 26, 54],
    status: "Заказан",
  },
  {
    startCity: "Минск",
    finishCity: "Гомель",
    startTime: "09:00",
    finishTime: "11:30",
    dateDeparture: "2024-08-25",
    carrier: "ГомельАвто",
    busNumber: "1234 XY-7",
    places: [1, 2, 3],
    status: "В пути",
  },
  {
    startCity: "Витебск",
    finishCity: "Брест",
    startTime: "15:00",
    finishTime: "17:45",
    dateDeparture: "2024-08-26",
    carrier: "ВитебскТранс",
    busNumber: "5678 CD-9",
    places: [10, 11],
    status: "Отменен",
  },
  {
    startCity: "Гродно",
    finishCity: "Минск",
    startTime: "08:00",
    finishTime: "10:30",
    dateDeparture: "2024-08-27",
    carrier: "ГродноАвто",
    busNumber: "9012 EF-5",
    places: [12, 13, 14, 15],
    status: "Завершён",
  },
  {
    startCity: "Могилев",
    finishCity: "Брест",
    startTime: "18:00",
    finishTime: "20:45",
    dateDeparture: "2024-08-28",
    carrier: "БрестАвто",
    busNumber: "3456 GH-8",
    places: [20, 21],
    status: "Заказан",
  },
  {
    startCity: "Минск",
    finishCity: "Витебск",
    startTime: "16:00",
    finishTime: "18:30",
    dateDeparture: "2024-08-29",
    carrier: "МинскТранс",
    busNumber: "7890 IJ-4",
    places: [5, 6, 7],
    status: "В пути",
  },
  {
    startCity: "Брест",
    finishCity: "Гродно",
    startTime: "14:15",
    finishTime: "16:50",
    dateDeparture: "2024-08-30",
    carrier: "БрестАвто",
    busNumber: "1357 KL-2",
    places: [30, 31],
    status: "Завершён",
  },
  {
    startCity: "Гомель",
    finishCity: "Чаусы",
    startTime: "11:00",
    finishTime: "13:00",
    dateDeparture: "2024-08-31",
    carrier: "ГомельАвто",
    busNumber: "2468 MN-3",
    places: [8, 9, 10],
    status: "Отменен",
  },
  // Добавленные элементы
  {
    startCity: "Минск",
    finishCity: "Пинск",
    startTime: "12:00",
    finishTime: "14:00",
    dateDeparture: "2024-09-01",
    carrier: "МинскПасс",
    busNumber: "1111 AA-1",
    places: [4, 5],
    status: "Заказан",
  },
  {
    startCity: "Гродно",
    finishCity: "Гомель",
    startTime: "09:30",
    finishTime: "12:00",
    dateDeparture: "2024-09-02",
    carrier: "ГродноТранс",
    busNumber: "2222 BB-2",
    places: [16, 17],
    status: "В пути",
  },
  {
    startCity: "Брест",
    finishCity: "Минск",
    startTime: "08:45",
    finishTime: "11:00",
    dateDeparture: "2024-09-03",
    carrier: "БрестЭкспресс",
    busNumber: "3333 CC-3",
    places: [18, 19],
    status: "Завершён",
  },
  {
    startCity: "Витебск",
    finishCity: "Могилев",
    startTime: "13:15",
    finishTime: "15:30",
    dateDeparture: "2024-09-04",
    carrier: "ВитебскСервис",
    busNumber: "4444 DD-4",
    places: [22, 23],
    status: "Отменен",
  },
  {
    startCity: "Чаусы",
    finishCity: "Кобрин",
    startTime: "10:00",
    finishTime: "12:30",
    dateDeparture: "2024-09-05",
    carrier: "ЧаусыАвто",
    busNumber: "5555 EE-5",
    places: [24],
    status: "Заказан",
  },
  {
    startCity: "Могилев",
    finishCity: "Витебск",
    startTime: "19:00",
    finishTime: "21:15",
    dateDeparture: "2024-09-06",
    carrier: "МогилевТранс",
    busNumber: "6666 FF-6",
    places: [32, 33],
    status: "В пути",
  },
  {
    startCity: "Гомель",
    finishCity: "Минск",
    startTime: "07:30",
    finishTime: "09:50",
    dateDeparture: "2024-09-07",
    carrier: "ГомельАвто",
    busNumber: "7777 GG-7",
    places: [34, 35],
    status: "Завершён",
  },
  {
    startCity: "Пинск",
    finishCity: "Брест",
    startTime: "15:30",
    finishTime: "17:00",
    dateDeparture: "2024-09-08",
    carrier: "ПинскТранс",
    busNumber: "8888 HH-8",
    places: [36],
    status: "Отменен",
  },
  {
    startCity: "Гродно",
    finishCity: "Витебск",
    startTime: "11:15",
    finishTime: "14:00",
    dateDeparture: "2024-09-09",
    carrier: "ГродноЭкспресс",
    busNumber: "9999 II-9",
    places: [37, 38],
    status: "Заказан",
  },
  {
    startCity: "Минск",
    finishCity: "Гродно",
    startTime: "14:45",
    finishTime: "17:00",
    dateDeparture: "2024-09-10",
    carrier: "МинскАвто",
    busNumber: "1010 JJ-10",
    places: [39, 40],
    status: "В пути",
  },
  {
    startCity: "Брест",
    finishCity: "Могилев",
    startTime: "09:00",
    finishTime: "11:15",
    dateDeparture: "2024-09-11",
    carrier: "БрестТранс",
    busNumber: "1212 KK-11",
    places: [41, 42],
    status: "Завершён",
  },
  {
    startCity: "Витебск",
    finishCity: "Чаусы",
    startTime: "17:00",
    finishTime: "19:30",
    dateDeparture: "2024-09-12",
    carrier: "ВитебскАвто",
    busNumber: "1313 LL-12",
    places: [43],
    status: "Отменен",
  },
  {
    startCity: "Гомель",
    finishCity: "Брест",
    startTime: "20:00",
    finishTime: "22:30",
    dateDeparture: "2024-09-13",
    carrier: "ГомельЭкспресс",
    busNumber: "1414 MM-13",
    places: [44, 45],
    status: "Заказан",
  },
  {
    startCity: "Чаусы",
    finishCity: "Минск",
    startTime: "06:30",
    finishTime: "09:00",
    dateDeparture: "2024-09-14",
    carrier: "ЧаусыТранс",
    busNumber: "1515 NN-14",
    places: [46, 47],
    status: "В пути",
  },
  {
    startCity: "Гродно",
    finishCity: "Пинск",
    startTime: "13:00",
    finishTime: "15:30",
    dateDeparture: "2024-09-15",
    carrier: "ГродноАвто",
    busNumber: "1616 OO-15",
    places: [48],
    status: "Завершён",
  },
  {
    startCity: "Минск",
    finishCity: "Гомель",
    startTime: "10:00",
    finishTime: "12:30",
    dateDeparture: "2024-09-16",
    carrier: "МинскПасс",
    busNumber: "1717 PP-16",
    places: [49, 50],
    status: "Отменен",
  },
  {
    startCity: "Брест",
    finishCity: "Витебск",
    startTime: "16:00",
    finishTime: "18:30",
    dateDeparture: "2024-09-17",
    carrier: "БрестАвто",
    busNumber: "1818 QQ-17",
    places: [51],
    status: "Заказан",
  },
  {
    startCity: "Гомель",
    finishCity: "Гродно",
    startTime: "12:15",
    finishTime: "14:45",
    dateDeparture: "2024-09-18",
    carrier: "ГомельТранс",
    busNumber: "1919 RR-18",
    places: [52, 53],
    status: "В пути",
  },
  {
    startCity: "Витебск",
    finishCity: "Чаусы",
    startTime: "15:30",
    finishTime: "18:00",
    dateDeparture: "2024-09-19",
    carrier: "ВитебскЭкспресс",
    busNumber: "2020 SS-19",
    places: [54, 55],
    status: "Завершён",
  },
  {
    startCity: "Могилев",
    finishCity: "Минск",
    startTime: "09:15",
    finishTime: "11:30",
    dateDeparture: "2024-09-20",
    carrier: "МогилевАвто",
    busNumber: "2121 TT-20",
    places: [56],
    status: "Отменен",
  },
];
