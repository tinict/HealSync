import React from "react";
import Doctor from "../Assets/doctor-book-appointment.png";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function BookAppointment() {
  const navigate = useNavigate();

  const handleBookAppointmentClick = () => {
    navigate("/doctors");
  };

  return (
    <div className="ba-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="ba-text-content">
            <h3 className="ba-title">
              <span>Tại sao lựa chọn HealthHub</span>
            </h3>
            <p className="ba-description">
              Khám phá những lý do lựa chọn Health Plus cho các nhu cầu chăm sóc sức khỏe của bạn.
              Trải nghiệm dịch vụ chăm sóc chuyên nghiệp, tiện lợi và các giải pháp cá nhân hóa, biến việc chăm sóc sức khỏe tổng thể của bạn thành ưu tiên hàng đầu của chúng tôi.
              Hãy cùng chúng tôi bước vào hành trình hướng tới sức khỏe tốt hơn và một cuộc sống hạnh phúc hơn.
            </p>

            <ul className="ba-checks" style={{ listStyleType: 'none', padding: 0 }}>
              <li>
                <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Bác sĩ hàng đầu
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Hỗ trợ 24/7
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Nhánh chóng tiện lợi
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Hỗ trợ trí tuệ nhân tạo
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Hỗ trợ khám trực tuyến
              </li>
            </ul>

            <Button variant="primary" className="text-appointment-btn" onClick={handleBookAppointmentClick}>
              <FontAwesomeIcon icon={faCalendarCheck} /> Đặt lịch ngay
            </Button>
          </Col>
          <Col md={6} className="ba-image-content">
            <img src={Doctor} alt="Doctor Group" className="ba-image1 img-fluid" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BookAppointment;
