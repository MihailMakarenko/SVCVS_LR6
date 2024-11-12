import Logo from "./logo/logo.js";
import "./header.css";
import Location from "./location/location.js";
import Messengers from "./messengers/messengers.js";
import Profile from "./profile/profile.js";
import "./headerMedia.css";

function Header() {
  return (
    <header className="header-class">
      <Logo className="logotip"></Logo>
      <Location></Location>
      <Messengers></Messengers>
      <div className="phone-number">
        <p>Звонок по РБ беслпатно</p>
        <h3>+375(23)000-00-00</h3>
      </div>
      <Profile className="profile"></Profile>
    </header>
  );
}

export default Header;
