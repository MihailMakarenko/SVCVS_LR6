import Header from "../../Components/header/header.js";
import Footer from "../../Components/footer/footer.js";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// // import DatePicker from "@mui/material";
// import DatePicker from "@mui/material/Dat"
import DatePicker from "react-datepicker";

import "./MainPage.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import AutorizationModal from "../../Components/AutorizationModal/AutorizationModal.js";
import PlaceInBus from "../../Components/PlaceInBus/PlaceInBus.js";
import OrderCard from "../../Components/OrderCard/OrderCard.js";
import OrderCardBus from "../../Components/OrderCardBus/OrderCardBus.js";

function MainPage() {
  const testData = {
    dateDeparture: "23.10.2024",
    startTime: "08:13",
    startCity: "Чаусы",
    finishTime: "09:00",
    finishCity: "Могилев",
  };

  const navigate = useNavigate();
  return (
    <div className="MainPage">
      <Header></Header>
      <main>
        <h1>
          УДОБНЫЙ ЗАКАЗ <br /> АВТОБУСНЫХ БИЛЕТОВ
        </h1>

        <form className="form-search-ticet">
          <div class="text-field">
            <label class="text-field__label" for="login">
              Начальный пункт
            </label>
            <Autocomplete
              disablePortal
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Выберите город" />
              )}
            />
          </div>

          <div class="text-field">
            <label class="text-field__label" for="login">
              Конечный пункт
            </label>
            <Autocomplete
              disablePortal
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Выберите город" />
              )}
            />
          </div>
          <input className="date-departure" type="date" />
          <input type="submit" value={"Найти"} />
        </form>

        {/* <AutorizationModal></AutorizationModal> */}

        {/* <PlaceInBus countOfSeat={17}></PlaceInBus> */}

        <div className="Container-bus">
          <OrderCardBus
            carrier="МогилевОблАвтотранс"
            dateDeparture={testData.dateDeparture}
            startTime={testData.startTime}
            startCity={testData.startCity}
            finishTime={testData.finishTime}
            finishCity={testData.finishCity}
            platformNumber={7}
            price={1}
            freePlace={1}
          />

          <OrderCardBus
            carrier="МогилевОблАвтотранс"
            dateDeparture={testData.dateDeparture}
            startTime={testData.startTime}
            startCity={testData.startCity}
            finishTime={testData.finishTime}
            finishCity={testData.finishCity}
            platformNumber={7}
            price={10}
            freePlace={3}
          />

          <OrderCardBus
            carrier="МогилевОблАвтотранс"
            dateDeparture={testData.dateDeparture}
            startTime={testData.startTime}
            startCity={testData.startCity}
            finishTime={testData.finishTime}
            finishCity={testData.finishCity}
            platformNumber={7}
            price={10}
            freePlace={54}
          />

          <OrderCardBus
            carrier="МогилевОблАвтотранс"
            dateDeparture={testData.dateDeparture}
            startTime={testData.startTime}
            startCity={testData.startCity}
            finishTime={testData.finishTime}
            finishCity={testData.finishCity}
            platformNumber={7}
            price={10}
            freePlace={23}
          />

          <OrderCardBus
            carrier="МогилевОблАвтотранс"
            dateDeparture={testData.dateDeparture}
            startTime={testData.startTime}
            startCity={testData.startCity}
            finishTime={testData.finishTime}
            finishCity={testData.finishCity}
            platformNumber={7}
            price={2}
            freePlace={3}
          />
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default MainPage;
