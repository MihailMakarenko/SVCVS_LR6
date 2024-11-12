import "./profile.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import AutorizationModal from "../../AutorizationModal/AutorizationModal";
import { useState } from "react";

function Profile() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Отключаем прокрутку
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Включаем прокрутку
  };

  const handleOverlayClick = (event) => {
    // Закрываем модальное окно только если кликнули на затемненную область
    if (event.target.className === "modal-overlay-autorization") {
      handleCloseModal();
    }
  };
  return (
    <div className="profile">
      {/* <button onClick={() => navigate("/available-bus")}> */}
      <button className="button-profile" onClick={handleOpenModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="35"
          viewBox="0 0 32 35"
          fill="none"
        >
          <path
            d="M15.9999 17.117C20.6782 17.117 24.471 13.2853 24.471 8.55855C24.471 3.83173 23.2258 0 15.9999 0C8.774 0 7.52851 3.83173 7.52851 8.55855C7.52851 13.2853 11.3214 17.117 15.9999 17.117Z"
            fill="white"
          />
          <path
            d="M31.9821 29.8398C31.8252 21.6057 30.5323 19.2595 20.639 17.7743C20.639 17.7743 19.2463 19.2504 16.0004 19.2504C12.7544 19.2504 11.3615 17.7743 11.3615 17.7743C1.5761 19.2433 0.204616 21.5547 0.0242846 29.5723C0.00949743 30.227 0.00264487 30.2614 0 30.1854C0.000601106 30.3278 0.00132217 30.5912 0.00132217 31.0505C0.00132217 31.0505 2.35669 35 16.0004 35C29.6438 35 31.9994 31.0505 31.9994 31.0505C31.9994 30.7554 31.9996 30.5502 32 30.4106C31.9974 30.4576 31.9921 30.3665 31.9821 29.8398Z"
            fill="white"
          />
        </svg>
      </button>
      <p>Профиль</p>

      {isModalOpen && (
        <div
          className="modal-overlay-autorization"
          onClick={handleOverlayClick}
        >
          <AutorizationModal onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
}

export default Profile;
