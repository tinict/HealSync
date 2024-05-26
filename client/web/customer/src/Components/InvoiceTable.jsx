import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Col, Container, Form, Modal, Row, Table, Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

function InvoiceTable() {
  const [invoices, setInvoices] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const customerProfile = useSelector(state => state.customer);
  Moment.locale('vn');
  console.log(customerProfile);

  function filterDate(array, startDate, endDate) {
    return array.filter(function (item) {
      const invoiceDate = Moment(item.create_at);
      return invoiceDate.isBetween(startDate, endDate, 'day', '[]');
    });
  }

  function getInvoices() {
    axios.get(`http://localhost:5002/api/v1/invoices/${customerProfile.customer_id}`)
      .then((res) => {
        console.log(res.data);
        setInvoices(res.data);
      });
  }

  const handleQueryClick = () => {
    axios.get(`http://localhost:5002/api/v1/invoices/${customerProfile.customer_id}`)
      .then((res) => {
        const filteredInvoices = filterDate(res.data, startDate, endDate);
        setInvoices(filteredInvoices);
      });
  };

  const handleViewClick = (invoice) => {
    console.log(invoice);
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className="container">
      <Container fluid className="invoice-container">
        <nav aria-label="breadcrumb" style={{ backgroundColor: '#fff', padding: '20px 0', borderRadius: '5px' }}>
          <Breadcrumb>
            <Breadcrumb.Item href="/" style={{ fontSize: '16px', color: '#007bff' }}>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item active style={{ fontSize: '16px', color: '#6c757d' }}>Danh sách biên lai</Breadcrumb.Item>
          </Breadcrumb>
        </nav>
        <Row className="mb-3">
          <Col md={2}>
            <Form.Group>
              <Form.Label htmlFor="startDate">Ngày bắt đầu</Form.Label>
              <DatePicker id="startDate" className="form-control" selected={startDate} onChange={date => setStartDate(date)} />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label htmlFor="endDate">Ngày kết thúc</Form.Label>
              <DatePicker id="endDate" className="form-control" selected={endDate} onChange={date => setEndDate(date)} />
            </Form.Group>
          </Col>
          <Col md={6} className="align-self-end">
            <Button variant="primary" type="button" onClick={handleQueryClick}>
              Truy vấn
            </Button>
          </Col>
        </Row>
      </Container>
      <div className="table-responsive">
        <Table striped bordered hover className="table">
          <thead className="thead-dark">
            <tr>
              <th>STT</th>
              <th>Mã biên lai</th>
              <th>Họ và tên</th>
              <th>Thời điểm lập</th>
              <th>Thời điểm thanh toán</th>
              <th>Số tiền</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{invoice.invoice_id}</td>
                <td>{invoice.customerEntity.family_name + ' ' + invoice.customerEntity.name}</td>
                <td>{Moment(invoice.create_at).format('D MMM YYYY')}</td>
                <td>{Moment(invoice.due_date).format('D MMM YYYY')}</td>
                <td>{invoice.appointmentEntity?.timeSlotEntity?.cost}</td>
                <td>{invoice.status}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleViewClick(invoice)}>
                    <i className="far fa-eye"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết hóa đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvoice && (
            <Row>
              <Col className="invoice-details">
                <p><strong>Mã biên lai</strong></p>
                <p><strong>Họ và tên</strong></p>
                <p><strong>Mã BN</strong></p>
                <p><strong>Số tiền</strong></p>
                <p><strong>Ngày thanh toán</strong></p>
                <p><strong>Bác sĩ khám</strong></p>
                <p><strong>Nơi khám</strong></p>
                <p><strong>Chuyên khoa</strong></p>
                <p><strong>Trạng thái</strong></p>
                <p><strong>Hình thức thanh toán</strong></p>
              </Col>
              <Col className="invoice-details">
                <p>{selectedInvoice.invoice_id}</p>
                <p>{selectedInvoice.customerEntity.family_name} {selectedInvoice.customerEntity.name}</p>
                <p>{selectedInvoice.appointmentEntity?.examinationRecordEntity.examination_record_id}</p>
                <p>{selectedInvoice.appointmentEntity?.timeSlotEntity?.cost}</p>
                <p>{Moment(selectedInvoice.due_date).format('DD MMMM YYYY')}</p>
                <p>{selectedInvoice.appointmentEntity?.timeSlotEntity?.scheduleEntity?.doctorEntity?.firstname} {selectedInvoice.appointmentEntity?.timeSlotEntity?.scheduleEntity?.doctorEntity?.lastname}</p>
                <p>{selectedInvoice.appointmentEntity?.timeSlotEntity?.scheduleEntity?.doctorEntity?.specialty}</p>
                <p>{selectedInvoice.appointmentEntity?.timeSlotEntity?.localtion}</p>
                <p>{selectedInvoice.status ? "Đã thanh toán" : "Chưa thanh toán"}</p>
                <p>Thanh toán trực tuyến</p>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InvoiceTable;
