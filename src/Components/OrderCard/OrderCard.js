import "./OrderCard.css";
import * as React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

function OrderCard(props) {
  const [value, setValue] = React.useState(0);
  const [ratingSubmitted, setRatingSubmitted] = React.useState(false); // Состояние для отслеживания выставленного рейтинга

  const {
    startCity,
    finishCity,
    startTime,
    finishTime,
    dateDeparture,
    carrier,
    busNumber,
    places = [], // Установка значения по умолчанию
    status,
  } = props;

  // Эффект для управления значением рейтинга в зависимости от статуса
  React.useEffect(() => {
    if (status !== "Завершён") {
      setValue(null); // Устанавливаем значение в null для незавершённых поездок
      setRatingSubmitted(false); // Сбрасываем состояние выставленного рейтинга
    } else {
      setValue(0); // Сбрасываем значение для завершённых поездок
    }
  }, [status]); // Запускаем эффект при изменении статуса

  return (
    <div className="card-container">
      <div className="route-card-container">
        <span>{startCity}</span>
        <ArrowForwardIcon />
        <span>{finishCity}</span>
      </div>
      <div className="time-container route-card-container">
        <span>
          <strong>{startTime}</strong>
        </span>
        <div style={{ display: "inline", width: "77%" }}>
          <span>{dateDeparture}</span>
          <hr style={{ border: "1px solid gray" }} />
        </div>
        <span>
          <strong>{finishTime}</strong>
        </span>
      </div>
      <div className="information-carrier-container">
        <span>Перевозчик: </span>
        <span>{carrier}</span>
        <p>Номер: {busNumber}</p>
        <hr style={{ border: "1px solid gray" }} />
        <span>Места: {places.join(", ")}</span>
        <hr style={{ border: "1px solid gray" }} />
      </div>
      <div className="route-card-container">
        <div className="button-container">
          <button>Отменить</button>
          <button>Скачать</button>
        </div>
        <div className="route-card-container">
          <span className="ticket-status">{status}</span>
        </div>
      </div>
      <hr style={{ border: "1px solid gray" }} />
      <div className="route-card-container">
        {status === "Завершён" ? (
          <>
            <Typography component="legend">
              {ratingSubmitted ? "Поездка оценена!" : "Оцените поездку!"}
            </Typography>
            <Rating
              name="simple-controlled"
              value={value}
              size="large"
              onChange={(event, newValue) => {
                setValue(newValue); // Установите новое значение
                setRatingSubmitted(true); // Устанавливаем, что рейтинг выставлен
              }}
            />
          </>
        ) : (
          <Typography component="legend">Оценка недоступна</Typography>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
