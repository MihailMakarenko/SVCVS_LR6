import "./footerUP.css";

function FooterUP() {
  return (
    <div className="footer-up-container">
      <div className="section-information">
        <h3>Сервис</h3>
        <li>
          <ul>
            <a href="">Информацияо бронировании</a>
          </ul>
          <ul>
            <a href="">Оплата</a>
          </ul>
          <ul>
            <a href="">Контакты</a>
          </ul>
          <ul>
            <a href="">Реквизиты</a>
          </ul>
        </li>
      </div>
      <SectionInformation items={items2} title={"Наши услуги"} />
      <div className="section-information">
        <h3>Контакты</h3>
        <ul>
          <p>
            Телефон: <a href="telephone">+375(23)000-00-00</a>
          </p>
          <p>
            Почта: <a href="mail">info@sitename.ru</a>
          </p>
          <p>
            Могилевская область,
            <br />
            улица Ленинская, дом 93
          </p>
        </ul>
      </div>
    </div>
  );
}

function SectionInformation({ items, title }) {
  return (
    <div className="section-information">
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

const items1 = ["Информацияо бронировании", "Оплата", "Контакты", "Реквизиты"];
const items2 = [
  "Заказ удобного рейса",
  "Бронирование онлайн",
  "Выбор маршрута",
];
const items3 = [
  "Телефон: +375(23)000-00-00",
  "Почта: info@sitename.ru",
  "Адрес: Могилевская область, улица Ленинская, дом 93",
];
export default FooterUP;
