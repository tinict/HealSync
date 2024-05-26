import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Info() {
  return (
    <section className="info-section py-5" id="services">
      <Container style={{ backgroundColor: '#1a9dff', borderRadius: '8px', padding: '2rem' }}>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h3 className="info-title mb-4">
              <span style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: '1.75rem', color: '#fff' }}>
                Sứ mệnh của chúng tôi
              </span>
            </h3>
            <p className="info-description lead" style={{ fontFamily: 'serif', color: '#fff', fontSize: '1.125rem', lineHeight: '1.6' }}>
              Chúng tôi mang đến dịch vụ chăm sóc sức khỏe tiện lợi, cung cấp đầy đủ các dịch vụ y tế theo yêu cầu, phù hợp với nhu cầu của bạn.
              Nền tảng của chúng tôi cho phép bạn kết nối với các bác sĩ trực tuyến giàu kinh nghiệm, những người sẽ tư vấn y tế chuyên môn,
              kê đơn thuốc điện tử nhanh chóng bất cứ khi nào bạn cần.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Info;
