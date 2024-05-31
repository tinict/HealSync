import React, { useState, useEffect } from 'react';
import '../Styles/AppointmentForm.css';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setExamination } from '../Features/examinationSlice';

const AppointmentForm = () => {
  const dispatch = useDispatch();
  const appointment = useSelector((state) => state.appointment);
  const customer = useSelector((state) => state.customer);
  const appointmentCustomer = useSelector((state) => state.appointment);
  const navigate = useNavigate();
  const examination = useSelector((state) => state.examination);
  const [formDataAppointment, setFormDataAppointment] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Nam',
    address: '',
    idCardNumber: '',
    guardianName: '',
    medicalHistory: '',
    reasonForConsultation: '',
    nation: '',
    career: '',
    guardian_phone_number: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formDataAppointment.firstname) newErrors.firstname = "Họ đệm người bệnh là bắt buộc.";
    if (!formDataAppointment.lastname) newErrors.lastname = "Tên người bệnh là bắt buộc.";
    if (!formDataAppointment.email) newErrors.email = "Email là bắt buộc.";
    if (!formDataAppointment.phone) newErrors.phone = "Số điện thoại là bắt buộc.";
    if (!formDataAppointment.dob) newErrors.dob = "Ngày sinh là bắt buộc.";
    if (!formDataAppointment.gender) newErrors.gender = "Giới tính là bắt buộc.";
    if (!formDataAppointment.address) newErrors.address = "Địa chỉ là bắt buộc.";
    if (!formDataAppointment.nation) newErrors.nation = "Dân tộc là bắt buộc.";
    if (!formDataAppointment.career) newErrors.career = "Nghề nghiệp là bắt buộc.";
    if (!formDataAppointment.idCardNumber) newErrors.idCardNumber = "Số CMND là bắt buộc.";
    if (!formDataAppointment.guardianName) newErrors.guardianName = "Họ và tên của người giám hộ là bắt buộc.";
    if (!formDataAppointment.guardian_phone_number) newErrors.guardian_phone_number = "Số điện thoại của người giám hộ là bắt buộc.";
    if (!formDataAppointment.medicalHistory) newErrors.medicalHistory = "Mô tả tiểu sử người bệnh là bắt buộc.";
    if (!formDataAppointment.reasonForConsultation) newErrors.reasonForConsultation = "Lý do khám là bắt buộc.";
    return newErrors;
  };

  async function APIPostFormAppointment() {
    if (!appointmentCustomer || !appointmentCustomer.time) {
      console.error('Customer or customer time is not defined');
      return;
    }

    await axios.post('http://localhost:5002/api/v1/appointments', {
      examination_record: formDataAppointment,
      cost: appointment.cost,
      timeslot_id: appointmentCustomer.time.split('-')[2],
      customer_id: customer.customer_id,
    })
      .then((res) => {
        dispatch(setExamination({
          firstname: formDataAppointment.firstname,
          lastname: formDataAppointment.lastname,
          email: formDataAppointment.email,
          phone: formDataAppointment.phone,
          dob: formDataAppointment.dob,
          gender: formDataAppointment.gender,
          datetime: appointment.date,
          timeslot: appointmentCustomer.time,
          doctor: appointment.doctor_name,
          cost: appointment.cost,
          location: appointment.location || "",
          appointment_id: res.data.appointmentEnity.appointment_id,
          nation: appointment.nation,
          career: appointment.career,
          guardian_phone_number: appointment.guardian_phone_number
        }));
      })
  };

  async function getPaymentUrl() {
    const API_VNPAY = 'http://localhost:5007/api/v1/vnpay';

    let vnp_IpAddr = '';

    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      vnp_IpAddr = response.data.ip;
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      const response = await axios.get(
        API_VNPAY,
        {
          params: {
            user_id: customer.customer_id,
            vnp_Amount: appointment.cost,
            vnp_IpAddr: vnp_IpAddr,
            vnp_OrderInfo: appointment.doctor_id,
            appointment_id: examination.appointment_id
          }
        }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async () => {
    const formErrors = validate();

    const isEmpty = (obj) => {
      return Object.keys(obj).length === 0;
    };

    if (!isEmpty(formErrors)) {
      alert('Bạn chưa điền đầy đủ thông tin của form hồ sơ khám điện tử');
    } else {
      try {
        await APIPostFormAppointment();
        await getPaymentUrl();
      } catch (error) {
        console.error('Error during payment process', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormDataAppointment({
      ...formDataAppointment,
      [e.target.name]: e.target.value
    });
  };

  const handleBlur = (e) => {
    setFormDataAppointment({
      ...formDataAppointment,
      [e.target.name]: e.target.value
    });
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    return navigate('/');
  };

  useEffect(() => {
    const handlePopState = (event) => {
      if (window.location.pathname === '/') {
        const confirmationMessage = 'Bạn có chắc muốn rời khỏi trang này? Dữ liệu chưa được lưu.';
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div>
                      <h4 className="card-title">Hồ sơ khám điện tử</h4>
                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group card-label">
                            <label>Họ đệm người bệnh</label>
                            <input className="form-control" type="text" name='firstname' value={formDataAppointment.firstname} onChange={handleChange} onBlur={handleBlur} />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group card-label">
                            <label>Tên người bệnh</label>
                            <input className="form-control" type="text" name='lastname' value={formDataAppointment.lastname} onChange={handleChange} onBlur={handleBlur} />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group card-label">
                            <label>Email người bệnh</label>
                            <input className="form-control" type="email" name='email' value={formDataAppointment.email} onChange={handleChange} onBlur={handleBlur} />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group card-label">
                            <label>Số điện thoại người bệnh</label>
                            <input className="form-control" type="text" name='phone' value={formDataAppointment.phone} onChange={handleChange} onBlur={handleBlur} />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group card-label">
                            <label>Ngày sinh người bệnh</label>
                            <input className="form-control" type="date" name='dob' value={formDataAppointment.dob} onChange={handleChange} onBlur={handleBlur} />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group card-label">
                            <label>Giới tính người bệnh</label>
                            <select className="form-control" name='gender' value={formDataAppointment.gender} onChange={handleChange} onBlur={handleBlur}>
                              <option>Chọn giới tính</option>
                              <option value={'1'}>Nam</option>
                              <option value={'2'}>Nữ</option>
                              <option value={'3'}>Khác</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group card-label">
                            <label>Địa chỉ hiện tại</label>
                            <input className="form-control" type="text" name='address' value={formDataAppointment.address} onChange={handleChange} onBlur={handleBlur} placeholder='Địa chỉ / Phường / Xã  / Quận / Huyện / Thành phố' />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group card-label">
                            <label>Dân tộc</label>
                            <input className="form-control" type="text" name='nation' value={formDataAppointment.nation} onChange={handleChange} onBlur={handleBlur} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group card-label">
                            <label>Nghề nghiệp</label>
                            <input className="form-control" type="text" name='career' value={formDataAppointment.career} onChange={handleChange} onBlur={handleBlur} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group card-label">
                            <label>Số CMND</label>
                            <input className="form-control" type="text" name='idCardNumber' value={formDataAppointment.idCardNumber} onChange={handleChange} onBlur={handleBlur} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group card-label">
                            <label>Họ và tên của người giám hộ</label>
                            <input className="form-control" type="text" name='guardianName' value={formDataAppointment.guardianName} onChange={handleChange} onBlur={handleBlur} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group card-label">
                            <label>Số điện thoại của người giám hộ</label>
                            <input className="form-control" type="text" name='guardian_phone_number' value={formDataAppointment.guardian_phone_number} onChange={handleChange} onBlur={handleBlur} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group card-label">
                            <label>Mô tả tiểu sử người bệnh</label>
                            <input className="form-control" type="text" placeholder='Mô tả bị dị ứng thuốc hoặc các kích thích' name='medicalHistory' value={formDataAppointment.medicalHistory} onChange={handleChange} onBlur={handleBlur} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group card-label">
                            <label>Lý do khám</label>
                            <input className="form-control" type="text" name='reasonForConsultation' value={formDataAppointment.reasonForConsultation} onChange={handleChange} onBlur={handleBlur} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-lg-4 theiaStickySidebar">
              <div className="card booking-card">
                <div className="card-header">
                  <h4 className="card-title">Thông tin đặt khám</h4>
                </div>
                <div className="card-body">
                  <div className="booking-doc-info">
                    <a className="booking-doc-img">
                      <img
                        src={appointment.url_picture}
                        alt="Bác sĩ"
                        className="rounded-circle"
                        style={{ width: '80px', height: '80px', border: '2px solid #007bff', marginRight: '10px' }}
                      />
                    </a>
                    <div className="booking-info">
                      <h4>Dr. {appointment.doctor_name}</h4>
                      <div className="clinic-details">
                        <p className="doc-location"><i className="fas fa-map-marker-alt"></i> {appointment.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="booking-summary">
                    <div className="booking-item-wrap">
                      <ul className="booking-date">
                        <li>Ngày khám: <span>{appointment.date}</span></li>
                        <li>Thời gian khám: <span>{appointment.time}</span></li>
                      </ul>
                      {
                        appointment.schedule_type_id !== "2" && (
                          <ul className="booking-fee">
                            <li>Giá tiền đặt khám: <span>{appointment.cost} VND</span></li>
                          </ul>
                        )
                      }
                      {
                        appointment.schedule_type_id !== "2" && (
                          <div className="booking-total">
                            <ul className="booking-total-list">
                              <li>
                                <span>Tổng tiền</span>
                                <span className="total-cost">{appointment.cost}</span>
                              </li>
                            </ul>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
                <Button as="input" type="button" value="Thanh toán" onClick={handleSubmit} />
                <Modal show={showModal} onHide={handleCloseModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Chú ý</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Vui lòng kiểm tra email của bạn khi, để xác nhận thông tin và lịch khám !</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                      Đóng
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
