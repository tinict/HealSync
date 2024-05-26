import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import "../Styles/Hero.css";

const Hero = ({ handleBookAppointmentClick, scrollToTop, goUp }) => {
  return (
    <Container className="py-5 my-8">
      <Row className="hero-grid">
        <Col md={8} className="text-col">
          <p className="text-headline">❤️ Kết nối bệnh nhân và bác sĩ</p>
          <h2>Tìm kiếm và đặt lịch với bác sĩ</h2>
          <p className="text-description">
            Tham vấn bác sĩ trực tuyến và nhận tư vấn y tế, đơn thuốc điện tử và hồ sơ bệnh án chỉ trong vài phút. Dịch vụ chăm sóc sức khỏe theo yêu cầu ngay trong tầm tay bạn.
          </p>
          <Button
            variant="primary"
            className="text-appointment-btn"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> Đặt lịch khám ngay
          </Button>
        </Col>
        <Col md={4} className="text-col">
          <div className="text-stats mt-4">
            <div className="text-stats-container">
              <p>145k+</p>
              <p>Số bệnh nhân</p>
            </div>
            <div className="text-stats-container">
              <p>50+</p>
              <p>Chuyên gia y tế</p>
            </div>
          </div>
        </Col>
      </Row>
      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </Container>
  );
}

export default Hero;
