import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faStethoscope, faExchangeAlt, faVideo, faRobot, faEnvelope, faCalendarAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary text-light py-5">
      <Container>
        <Row>
          <Col md={6}>
            <div className="footer-info">
              <h4 className="footer-title">HealthHub</h4>
              <p className="footer-description">
                Tham vấn bác sĩ trực tuyến và nhận tư vấn y tế, đơn thuốc điện tử,
                gia hạn đơn thuốc và hồ sơ bệnh án chỉ trong vài phút. Dịch vụ chăm sóc
                sức khỏe theo yêu cầu ngay trong tầm tay bạn.
              </p>
            </div>
          </Col>
          <Col md={6} className="d-flex flex-wrap justify-content-between">
            <div className="footer-column">
              <h4 className="footer-column-title">Dịch vụ</h4>
              <ul className="list-unstyled" style={{ paddingLeft: 0 }}>
                <li style={{ marginBottom: '10px' }}>
                  <Link to="#services" className="text-light">
                    <Fa icon={faStethoscope} /> Khám tổng quát
                  </Link>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Link to="#services" className="text-light">
                    <Fa icon={faExchangeAlt} /> Khám chuyển khoa
                  </Link>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Link to="#services" className="text-light">
                    <Fa icon={faVideo} /> Khám trực tuyến
                  </Link>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Link to="#services" className="text-light">
                    <Fa icon={faRobot} /> Tư vấn bằng trí tuệ nhân tạo
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">Liên hệ chúng tôi</h4>
              <ul className="list-unstyled" style={{ paddingLeft: 0 }}>
                <li style={{ marginBottom: '10px' }}>
                  <a href="mailto:support@healthhub.com" className="text-light">
                    <Fa icon={faEnvelope} /> support@healthhub.com
                  </a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="mailto:appointment@healthhub.com" className="text-light">
                    <Fa icon={faCalendarAlt} /> appointment@healthhub.com
                  </a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="tel:+02223266232" className="text-light">
                    <Fa icon={faPhone} /> +022 2326 6232
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
