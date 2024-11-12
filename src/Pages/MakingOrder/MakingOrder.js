import Footer from "../../Components/footer/footer";
import "./MakingOrder.css";
import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete"; // Убедитесь, что вы импортировали Autocomplete
import TextField from "@mui/material/TextField";
import Label from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import OrderCard from "../../Components/OrderCard/OrderCard";

function MakingOrder() {
  return (
    <div>
      <main>
        <form>
          <h2 className="title-order">Оформление заказа</h2>
          <InformAboutRoute
            startCity={"Чаусы"}
            finishCity={"Могилев"}
            dateDeparture={"12.03.2024"}
            timeDeparture={"13.10"}
          ></InformAboutRoute>
          <div className="informAboutRoute-container">
            <RenderPassenger countSeats={2}></RenderPassenger>
          </div>
          <div className="promocode-container">
            <TextField
              id="outlined-basic"
              label="Промокод"
              variant="outlined"
            ></TextField>
            <button className="button-promocode">Активировать</button>
          </div>
          <Button variant="contained" type="submit">
            заказать
          </Button>
        </form>

        <OrderCard></OrderCard>
      </main>
    </div>
  );
}

function InformAboutRoute(props) {
  return (
    <div className="informAboutRoute-container">
      <p>{`Маршрут: ${props.startCity}-${props.finishCity}`}</p>
      <p>{`Дата отправления: ${props.dateDeparture}`}</p>
      <p>{`Время отправления: ${props.timeDeparture}`}</p>
    </div>
  );
}

function RenderPassenger({ countSeats, initialPassengers }) {
  // Убедитесь, что initialPassengers — это массив
  const [passengerNames, setPassengerNames] = useState(initialPassengers || []);

  const handlePassengerChange = (index, value) => {
    const newPassengerNames = [...passengerNames];
    newPassengerNames[index] = value;
    setPassengerNames(newPassengerNames);
  };

  const passengerInputs = [];
  for (let i = 0; i < countSeats; i++) {
    passengerInputs.push(
      <div className="seats-container" key={i}>
        <Label className="seats-inform">
          <strong> {`Место № ${i + 1}`}</strong>
        </Label>
        <Autocomplete
          disablePortal
          options={passengerNames} // Убедитесь, что это массив
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label={`Пассажир ${i + 1}`} />
          )}
          onChange={(event, value) => handlePassengerChange(i, value)}
        />
      </div>
    );
  }

  return <div>{passengerInputs}</div>;
}

export default MakingOrder;
