import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAppointment } from '../Features/appointmentSlice.js';
import { useNavigate } from 'react-router-dom';
import SearchComponent from "./SearchComponent.js";
import { ListGroupItem, Form, ButtonGroup, ToggleButton, Card, Button, Row, Col, Modal, ListGroup, Image, Breadcrumb, Alert } from 'react-bootstrap';
import { FaCommentAlt } from 'react-icons/fa';
import SubFilter from "./SubFilter.js";

const List = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const getDoctors = useSelector(state => state.doctors);
  const [timeslots, setTimeSlots] = useState([]);
  const [generalAppointment, setGeneralAppointment] = useState({});
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const vnTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
  const currentDate = new Date(vnTime);
  const navigate = useNavigate();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [doctor_id, setDoctorid] = useState(null);
  const [typeSchedule, setTypeScheduleid] = useState('1');
  const [datework, setDatework] = useState(currentDate.toLocaleDateString('fr-CA'));
  const customerProfile = useSelector(state => state.customer);
  const dispatch = useDispatch();
  // const appointment = useSelector((state) => state.appointment);
  // const dateScheduleDoctor = useSelector((state) => state.dateScheduleDoctor);
  const [feedbackContent, setFeedbackContent] = useState('');
  const [isReplyFeedback, setReplyFeedback] = useState(false);
  const [selectedReplyFeedback, setSelectedReplyFeedback] = useState("");
  const [selectedValue, setSelectedValue] = useState('1');
  const [isOnline, setOnline] = useState(true);
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (datework && generalAppointment?.cost) {
      dispatch(setAppointment({
        date: datework,
        time: selectedTimeSlot,
        cost: generalAppointment?.cost,
        doctor_id: selectedDoctor?.doctorEntity.doctor_id,
        doctor_name: selectedDoctor?.doctorEntity?.firstname + " " + selectedDoctor?.doctorEntity?.lastname,
        location: selectedDoctor?.doctorEntity?.workspace,
        url_picture: selectedDoctor?.doctorEntity?.url_picture,
        typeSchedule: typeSchedule
      }));
    }
  }, [datework, generalAppointment?.cost, selectedTimeSlot]);

  const apiFeeback = async (doctor_id) => {
    await axios.get(`http://localhost:5002/api/v1/feedbacks/${doctor_id}`)
      .then((res) => {
        setFeedbacks(res.data);
      });
  };

  const handleTimeSlotChange = (event) => {
    const selectedValue = event.target.value;
    const [starttime, endtime, timeslot_id] = selectedValue.split('-');
    const timeSlotObject = { starttime, endtime, timeslot_id, doctor_id, datework };
    APIQueryPeroid(timeSlotObject);
    setSelectedTimeSlot(event.target.value);
  };

  const handleTypeScheduleChange = (event) => {
    const typeSchedule = event.target.value;
    setSelectedValue(event.target.value);
    setTypeScheduleid(typeSchedule);
    setOnline(false);
    APIQueryTypeSchedule({ doctor_id, typeSchedule, datework });
  };

  const handleDateChange = (event) => {
    const schedule_date = event.target.value;
    const check_schedule_date = new Date(schedule_date);
    const current_date = new Date();

    if (check_schedule_date < current_date) {
      alert("Hiện tại các lịch khám sau ngày hiện tại đã khám, bạn không thể đăng ký khám. Vui lòng đăng ký khám từ ngày hiện tại trở về sau.");
    } else {
      setDatework(schedule_date);
      APIQueryTypeSchedule({ doctor_id, typeSchedule, datework: schedule_date });
    }
  };

  function APIQueryTypeSchedule(query) {
    axios.get('http://localhost:5002/api/v1/timeslots/schedule-type', { params: query })
      .then((res) => {
        setGeneralAppointment(res.data[0]);
        setTimeSlots(res.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  };

  function APIQueryPeroid(query) {
    axios.get('http://localhost:5002/api/v1/timeslots/peroid', { params: query })
      .then((res) => {
        setGeneralAppointment(res.data[0]);
      })
      .catch(error => {
        console.error('Error fetching time slots:', error);
      });
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    const query = { doctor_id: doctor.doctorEntity.doctor_id, datework, typeSchedule };
    console.log(doctor.doctorEntity.doctor_id);
    setDoctorid(doctor.doctorEntity.doctor_id);
    dispatch(setAppointment({
      date: datework,
      time: selectedTimeSlot,
      cost: generalAppointment?.cost,
      doctor_id: doctor.doctorEntity.doctor_id,
      doctor_name: doctor.doctorEntity.firstname + " " + doctor.doctorEntity.lastname,
      location: doctor.doctorEntity.location,
      url_picture: doctor.doctorEntity.url_picture,
      typeSchedule: typeSchedule
    }));

    axios.get('http://localhost:5002/api/v1/timeslots', { params: query })
      .then((res) => {
        setTimeSlots(res.data);
        setGeneralAppointment(res.data[0]);
      })
      .catch(error => {
        console.error('Error fetching time slots:', error);
      });
  };

  const handleProfileDoctor = (doctor_id) => {
    navigate(`/doctors/profile/${doctor_id}`);
  };

  const handleFeedbackModal = (doctor_id) => {
    apiFeeback(doctor_id);
    setShowFeedbackModal(!showFeedbackModal);
  };

  const apiReplyFeedback = (doctor_id, feedback_id) => {
    axios.get(`http://localhost:5002/api/v1/reply-feedbacks/${doctor_id}?reply_id=${feedback_id}`)
      .then((res) => {
        setFeedbacks(res.data);
      })
  };

  const sendFeedback = () => {
    console.log(selectedDoctor);
    axios.get(`http://localhost:5002/api/v1/appointment/check-feedback/${customerProfile.customer_id}?doctor_id=${doctor_id}`)
      .then((res) => {
        if (res.data.isCheck && isLoggedIn) {
          if (!isReplyFeedback) {
            axios.post("http://localhost:5002/api/v1/send-feedbacks", {
              content_feedback: feedbackContent,
              doctor_id: selectedDoctor.doctorEntity.doctor_id,
              customer_id: customerProfile.customer_id
            })
              .then(() => {
                apiFeeback(selectedDoctor.doctorEntity.doctor_id);
              })
          } else {
            axios.post("http://localhost:5002/api/v1/send-feedbacks", {
              content_feedback: feedbackContent,
              doctor_id: selectedDoctor.doctorEntity.doctor_id,
              customer_id: customerProfile.customer_id,
              parent_feedback_id: selectedReplyFeedback
            })
              .then(() => {
                apiReplyFeedback(selectedDoctor.doctorEntity.doctor_id, selectedReplyFeedback);
              })
          }
          setFeedbackContent("");
        } else if (!isLoggedIn) {
          alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để đánh giá bác sĩ.");
        } else {
          setShowFeedbackModal(!showFeedbackModal);
          alert("Bạn chưa khám bác sĩ này. Bạn không được phép đánh giá. Xin cảm ơn!");
        }
      })
  };

  const feedbackReply = (doctor_id, feedback_id) => {
    setReplyFeedback(true);
    setSelectedReplyFeedback(feedback_id)
    axios.get(`http://localhost:5002/api/v1/reply-feedbacks/${doctor_id}?reply_id=${feedback_id}`)
      .then((res) => {
        setFeedbacks(res.data);
      })
  };

  return (
    <>
      <div className="container">
        <nav aria-label="breadcrumb" style={{ backgroundColor: '#fff', padding: '20px 0', borderRadius: '5px' }}>
          <Breadcrumb>
            <Breadcrumb.Item href="/" style={{ fontSize: '16px', color: '#007bff' }}>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item active style={{ fontSize: '16px', color: '#6c757d' }}>Đặt lịch hẹn khám</Breadcrumb.Item>
          </Breadcrumb>
        </nav>
        <div class="d-flex">
          <SearchComponent data={getDoctors} />
          <SubFilter />
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="list-group">
              {getDoctors.doctors.length > 0 ? (
                getDoctors.doctors.map((doctor, index) => (
                  <Card
                    className="mb-3 shadow-sm border-primary rounded"
                    onClick={() => handleSelectDoctor(doctor)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col xs="auto">
                          <img
                            src={doctor?.doctorEntity?.url_picture}
                            alt="Bác sĩ"
                            className="rounded-circle"
                            style={{ width: '80px', height: '80px', border: '2px solid #007bff' }}
                          />
                        </Col>
                        <Col>
                          <h5 className="mb-1">
                            {doctor?.doctorEntity?.degree} Bác sĩ {doctor?.doctorEntity?.firstname} {doctor?.doctorEntity?.lastname}
                          </h5>
                          <p className="mb-1 text-muted">Chuyên khoa: {doctor?.doctorEntity?.specialty}</p>
                          <p className="mb-1 text-muted">Chức danh: {doctor?.doctorEntity?.position}</p>
                          <p className="mb-1 text-muted">Đơn vị công tác: {doctor?.doctorEntity?.workspace}</p>
                          <div className="d-flex align-items-center mt-2">
                            <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); handleProfileDoctor(doctor?.doctorEntity?.doctor_id); }}>
                              Thông tin về bác sĩ
                            </Button>
                            <Button variant="link" className="text-primary ml-3 p-0" onClick={(e) => { handleFeedbackModal(doctor?.doctorEntity?.doctor_id); }}>
                              <FaCommentAlt className="mr-1" /> Phản hồi
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))

              ) : (
                <div className="alert alert-info text-center" role="alert" style={{ fontSize: '18px', backgroundColor: '#d1ecf1', color: '#0c5460', fontWeight: 'bold', padding: '20px' }}>
                  Không có bác sĩ nào khám. Xin vui lòng bạn chọn ngày khác. <br></br>
                  Xin chân thành cảm ơn !
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            {showFeedbackModal &&
              <Modal show={showFeedbackModal} onHide={handleFeedbackModal} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Đánh giá bác sĩ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ListGroup className="feedback-list mb-3">
                    {feedbacks.map((feedback, index) => (
                      <ListGroup.Item key={index} className="d-flex align-items-start">
                        <Image
                          width={35}
                          height={35}
                          className="mr-3 rounded-circle"
                          src={feedback.customerEntity.url_picture}
                          alt={`${feedback.customerEntity.firstname}'s profile`}
                        />
                        <div>
                          <h6 className="mb-1">{feedback.customerEntity.firstname}</h6>
                          <p className="text-muted">{feedback.createdAt}</p>
                          <p className={feedback.isMine ? "my-feedback mb-1" : "other-feedback mb-1"}>{feedback.content_feedback}</p>
                          <Button variant="link" size="sm" className="p-0" onClick={() => feedbackReply(selectedDoctor.doctorEntity.doctor_id, feedback.feedback_id)}>
                            <FaCommentAlt className="mr-1" /> Phản hồi
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={feedbackContent}
                      onChange={(e) => setFeedbackContent(e.target.value)}
                      placeholder="Viết phản hồi của bạn..."
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={() => sendFeedback()}>
                    Gửi phản hồi
                  </Button>
                </Modal.Body>
              </Modal>
            }
            {selectedDoctor && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Thời gian và hình thức đặt lịch khám</h5>
                  <div className="form-group mb-3">
                    <label htmlFor="appointmentDate" className="form-label">Ngày khám:</label>
                    <input
                      type="date"
                      id="appointmentDate"
                      className="form-control"
                      value={datework}
                      onChange={handleDateChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="appointmentType" className="form-label">Hình thức khám:</label>
                    <select
                      id="appointmentType"
                      className="form-select"
                      onChange={handleTypeScheduleChange}
                      value={selectedValue}
                    >
                      <option value="1">Khám trực tiếp tại cơ sở y tế</option>
                      <option value="2">Tư vấn trực tuyến</option>
                    </select>
                    {selectedValue === '1' ?
                      <p className="text-danger">*Lưu ý: Để tránh trường hợp người dùng đặt lịch cố tình đặt rồi hủy. Chúng tôi xin phép tiến hành thu phí đặt cọc và phí này được trừ vào tiền khám.</p> :
                      <p className="text-danger">*Lưu ý: Bác sĩ chỉ đưa ra chẩn đoán về bệnh lý cho bệnh nhân khi gặp trực tiếp bệnh nhân tại cơ
                        sở khám chữa bệnh, không được chẩn đoán hay đưa ra những khuyến cáo mang tính chất “khám
                        bệnh trực tuyến” là sai quy định theo “ Luật khám bệnh”</p>
                    }
                  </div>
                  {
                    generalAppointment !== undefined && (
                      <div>
                        <div className="form-group mb-3">
                          <label className="form-label">Giờ khám:</label>
                          <div>
                            {timeslots.map((timeslot, index) => (
                              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                                <div className="custom-radio" style={{ marginTop: '10px' }}>
                                  <Form.Check
                                    type="radio"
                                    id={"timeslot" + index}
                                    name="timeSlot"
                                    className="timeslot-input"
                                    value={`${timeslot.starttime}-${timeslot.endtime}-${timeslot.timeslot_id}`}
                                    onChange={handleTimeSlotChange}
                                    style={{ display: 'none' }}
                                  />
                                  <Form.Label
                                    htmlFor={"timeslot" + index}
                                    className="timeslot-box"
                                    style={{
                                      display: 'block',
                                      width: 'auto',
                                      padding: '10px',
                                      border: '1px solid #ddd',
                                      borderRadius: '5px',
                                      textAlign: 'center',
                                      cursor: 'pointer',
                                      backgroundColor: '#f8f9fa',
                                      transition: 'background-color 0.3s ease, border-color 0.3s ease',
                                      color: '#333'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e6ea'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                  >
                                    {timeslot.starttime} - {timeslot.endtime}
                                  </Form.Label>
                                </div>
                              </Col>
                            ))}
                          </div>
                        </div>
                        {
                          isOnline && (
                            generalAppointment.localtion !== undefined && (
                              <p className="card-text"><strong>Địa chỉ khám:</strong> {generalAppointment.localtion}</p>
                            )
                          )
                        }
                        {
                          generalAppointment.cost !== undefined && typeSchedule !== '2' && (
                            <p className="card-text"><strong>Giá tiền khám:</strong> {Number(generalAppointment.cost).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                          )
                        }
                        {
                          generalAppointment.cost !== undefined && (
                            <button className="btn btn-primary">
                              <Link to={`/appointment`} style={{ color: 'white', textDecoration: 'none' }}>Đặt lịch hẹn khám</Link>
                            </button>
                          )
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            )}
            {
              !selectedDoctor && (
                <Alert style={{ backgroundColor: 'lightblue' }}>
                  <b>*Lưu ý:</b><br></br>
                  1. Lịch sẽ được đóng khi đã đến ngày khám, yêu cầu khách hàng phải đặt trước lịch trước ngày khám<br></br>
                  2. Vui lòng chọn bác sĩ mà mình muốn để tiến hàng đặt lịch hẹn
                </Alert>
              )
            }
          </div>
        </div>
      </div >
    </>
  );
};

export default List;
