import React from "react";
import Doctor from "../Assets/doctor-group.png";
import SolutionStep from "./SolutionStep";
import "../Styles/About.css";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>Giới thiệu</span>
        </h3>
        <p className="about-description">
          Chào mừng bạn đến HealthHub, đối tác đáng tin cậy của bạn cho dịch vụ chăm sóc sức khỏe dễ dàng tiếp cận và được cá nhân hóa.
          Đội ngũ bác sĩ chuyên gia của chúng tôi cung cấp dịch vụ tư vấn trực tuyến và các dịch
          vụ chuyên khoa, ưu tiên cho sức khỏe tổng thể của bạn. Hãy tham gia cùng chúng tôi trên hành trình này để hướng tới một bạn khỏe mạnh hơn.
        </p>

        <h4 className="about-text-title">Những giải pháp cho bạn</h4>

        <SolutionStep
          title="Chọn chuyên gia"
          description="Tìm bác sĩ chuyên khoa phù hợp của bạn và dễ dàng đặt lịch hẹn tại HealthHub. Đội ngũ bác sĩ chuyên gia ưu tiên sức khỏe của bạn, cung cấp dịch vụ chăm sóc được thiết kế riêng."
        />

        <SolutionStep
          title="Lập lịch trình"
          description="Lựa chọn ngày và giờ phù hợp nhất với bạn, đội ngũ chuyên gia y tế tận tâm của chúng tôi sẽ đảm bảo sức khỏe của bạn thông qua dịch vụ chăm sóc cá nhân hóa."
        />

        <SolutionStep
          title="Tìm giải pháp"
          description="Đội ngũ bác sĩ và chuyên gia giàu kinh nghiệm của chúng tôi luôn sẵn sàng cung cấp tư vấn chuyên môn và phác đồ điều trị cá nhân hóa, giúp bạn đạt được sức khỏe tốt nhất có thể."
        />
      </div>
    </div>
  );
}

export default About;
