import React from "react";
import Doctor from "../Assets/doctor-book-appointment.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Styles/BookAppointment.css";

function BookAppointment() {
  const navigate = useNavigate();

  const handleBookAppointmentClick = () => {
    navigate("/doctors");
  };

  return (
    <div className="ba-section">
      <div className="ba-image-content">
        <img src={Doctor} alt="Doctor Group" className="ba-image1" />
      </div>

      <div className="ba-text-content">
        <h3 className="ba-title">
          <span>Tại sao lựa chọn HealthHub</span>
        </h3>
        <p className="ba-description">
          Khám phá những lý do lựa chọn Health Plus cho các nhu cầu chăm sóc sức khỏe của bạn.
          Trải nghiệm dịch vụ chăm sóc chuyên nghiệp, tiện lợi và các giải pháp cá nhân hóa, biến việc chăm sóc sức khỏe tổng thể của bạn thành ưu tiên hàng đầu của chúng tôi.
          Hãy cùng chúng tôi bước vào hành trình hướng tới sức khỏe tốt hơn và một cuộc sống hạnh phúc hơn.
        </p>

        <p className="ba-checks ba-check-first">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Bác sĩ hàng đầu
        </p>
        <p className="ba-checks">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Hộ trợ 24/7
        </p>
        <p className="ba-checks ba-check-last">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Nhánh chóng tiện lợi
        </p>
        <p className="ba-checks ba-check-last">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Hỗ trợ trí tuệ nhân tạo
        </p>
        <p className="ba-checks ba-check-last">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Hỗ trợ khám trực tuyến
        </p>

        <button
          className="text-appointment-btn"
          type="button"
          onClick={handleBookAppointmentClick}
        >
          <FontAwesomeIcon icon={faCalendarCheck} /> Đặt lịch ngay
        </button>
      </div>
    </div>
  );
}

export default BookAppointment;
