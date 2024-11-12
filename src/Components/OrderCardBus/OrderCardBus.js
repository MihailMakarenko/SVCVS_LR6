import "./OrderCardBus.css";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import Button from "@mui/material/Button";

function OrderCardBus(props) {
  return (
    <div className="Order-card-bus">
      <div className="dateDeparture-conatiner">
        <span>{props.dateDeparture}</span>
      </div>
      <hr style={{ border: "1px solid gray" }} />
      <div>
        <p>
          {props.startTime} <CircleOutlinedIcon></CircleOutlinedIcon>
          {props.startCity}
        </p>
        <p>
          {props.finishTime} <CircleTwoToneIcon></CircleTwoToneIcon>
          {props.finishCity}
        </p>
        <hr style={{ border: "1px solid gray" }} />
      </div>
      <p className="carrier-class">Перевозчик: {props.carrier}</p>
      <p>Свободных мест: {props.freePlace}</p>
      <div className="price-container">
        <span>
          цена: <strong>{props.price} BYN</strong>
        </span>
      </div>
      <div class="vl"></div>
      <hr style={{ border: "1px solid gray" }} />
      <Button variant="contained">Заказать</Button>
    </div>
  );
}

export default OrderCardBus;
