import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Info() {
  return (
    <section className="info-section py-5 container" id="services">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h3 className="info-title mb-4">
              <span className="info-title-text">Sứ mệnh của chúng tôi</span>
            </h3>
            <p className="info-description lead">
              Chúng tôi mang đến dịch vụ chăm sóc sức khỏe tiện lợi, cung cấp đầy đủ các dịch vụ y tế theo yêu cầu, phù hợp với nhu cầu của bạn. Nền tảng của chúng tôi cho phép bạn kết nối với các bác sĩ trực tuyến giàu kinh nghiệm, những người sẽ tư vấn y tế chuyên môn, kê đơn thuốc điện tử nhanh chóng bất cứ khi nào bạn cần.
            </p>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .info-section {
          background-color: #1a9dff;
          border-radius: 8px;
        }
        .info-title {
          font-family: serif;
          font-weight: bold;
          font-size: 1.75rem;
          color: #fff;
        }
        .info-title-text {
          background-color: #1485dc;
          border-radius: 4px;
          padding: 5px 10px;
        }
        .info-description {
          font-family: serif;
          color: #fff;
          font-size: 1.125rem;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}

export default Info;
