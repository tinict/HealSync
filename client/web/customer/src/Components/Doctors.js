import React from "react";
import DoctorCard from "./DoctorCard";
import profile1 from "../Assets/profile-1.png";
import profile2 from "../Assets/profile-2.png";
import profile3 from "../Assets/profile-3.png";
import profile4 from "../Assets/profile-4.png";
import "../Styles/Doctors.css";

function Doctors() {
  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>Gặp gỡ đội ngũ bác sĩ của chúng tôi</span>
        </h3>

        <p className="dt-description">
          Hãy gặp gỡ đội ngũ bác sĩ chuyên khoa xuất sắc của chúng tôi, những người tận tâm cung cấp dịch vụ chăm sóc sức khỏe hàng đầu.
          Tin tưởng vào kiến thức và kinh nghiệm của họ để dẫn dắt bạn đến một cuộc sống khỏe mạnh và hạnh phúc hơn.
        </p>
      </div>

      <div className="dt-cards-content">
        <DoctorCard
          img={profile1}
          name="Dr. Kathryn Murphy"
          title="General Surgeons"
        />
        <DoctorCard
          img={profile2}
          name="Dr. Jacob Jones"
          title="Hematologists"
        />
        <DoctorCard
          img={profile3}
          name="Dr. Jenny Wilson"
          title="Endocrinologists"
        />
        <DoctorCard
          img={profile4}
          name="Dr. Albert Flores"
          title="Hematologists"
        />
      </div>
    </div>
  );
}

export default Doctors;
