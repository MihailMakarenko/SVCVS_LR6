import React, { useState } from "react";
import "./PlaceInBus.css";
import Button from "@mui/material/Button";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";

function PlaceInBus({ countOfSeat }) {
  return (
    <div className="place-container">
      <h2>Выберите места</h2>
      <RenderBusSeat numbersOfSeat={countOfSeat} />
      <button className="button-order">Заказать</button>
    </div>
  );
}

function RenderBusSeat({ numbersOfSeat }) {
  const [selectedSeats, setSelectedSeats] = useState([]); // Состояние для хранения выбранных мест

  const toggleSeat = (seatNumber) => {
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatNumber)) {
        // Если место уже выбрано, убираем его из выбранных
        return prevSelected.filter((seat) => seat !== seatNumber);
      } else {
        // Если место не выбрано, добавляем его
        return [...prevSelected, seatNumber];
      }
    });
  };

  const rows = []; // Массив для хранения строк мест

  for (let i = 1; i <= numbersOfSeat; i += 4) {
    const row = (
      <div className="row-container" key={i}>
        <div className="two-place-container">
          {i <= numbersOfSeat && (
            <div
              className={`place ${selectedSeats.includes(i) ? "selected" : ""}`}
              onClick={() => toggleSeat(i)}
            >
              <p>{i}</p>
            </div>
          )}
          {i + 1 <= numbersOfSeat && (
            <div
              className={`place ${
                selectedSeats.includes(i + 1) ? "selected" : ""
              }`}
              onClick={() => toggleSeat(i + 1)}
            >
              <p>{i + 1}</p>
              {/* <AirlineSeatReclineNormalIcon></AirlineSeatReclineNormalIcon> */}
            </div>
          )}
        </div>
        <div className="two-place-container">
          {i + 2 <= numbersOfSeat && (
            <div
              className={`place ${
                selectedSeats.includes(i + 2) ? "selected" : ""
              }`}
              onClick={() => toggleSeat(i + 2)}
            >
              <p>{i + 2}</p>
            </div>
          )}
          {i + 3 <= numbersOfSeat && (
            <div
              className={`place ${
                selectedSeats.includes(i + 3) ? "selected" : ""
              }`}
              onClick={() => toggleSeat(i + 3)}
            >
              <p>{i + 3}</p>
            </div>
          )}
        </div>
      </div>
    );

    rows.push(row); // Добавляем строку в массив
  }

  return <>{rows}</>; // Возвращаем массив с местами
}

export default PlaceInBus;
