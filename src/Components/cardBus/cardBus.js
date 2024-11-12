import "./cardBus.css";
import Button from "@mui/material/Button";
import Carddd from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function CardBus(props) {
  const getActiveDays = (props) => {
    const days = [];
    if (props.monday) days.push("Пнонедельник");
    if (props.tuesday) days.push("Вторник");
    if (props.wednesday) days.push("Среда");
    if (props.thursday) days.push("Четверг");
    if (props.friday) days.push("Пятницы");
    if (props.saturday) days.push("Субота");
    if (props.sunday) days.push("Воскресенье");
    return days;
  };

  const activeDays = getActiveDays(props);

  return (
    <div className="card">
      <h3>
        🚌 {props.startCity} - {props.finishCity}
      </h3>
      <div className="card-details">
        <p>
          <strong>Отправление:</strong> {props.startTime}
        </p>
        <p>
          <strong>Прибытие:</strong> {props.finishTime}
        </p>
        <p>
          <strong>Перевозчик:</strong> {props.carrier}
        </p>
        <p>
          <strong>Номер платформы:</strong>
          {props.platformNumber}
        </p>
        <div>
          <h3>Дни отправления:</h3>
          <p>
            {activeDays.length > 0
              ? activeDays.join(", ")
              : "Нет доступных дней"}
          </p>
        </div>
        <p>
          <strong>Номер автобуса: </strong>
          {props.DefaultBusNumber}
        </p>
      </div>
      <div className="card-price">Цена: {props.price}р.</div>
    </div>
  );
}

export default CardBus;
