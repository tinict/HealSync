import {
    Link,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const TableProcessing = ({ refunds }: { refunds: any }) => {
    // const authState = useSelector((state) => state.auth);
    // console.log(authState);

    const statusMap = {
        1: { text: "Yêu cầu hoàn tiền", color: "primary" },
        2: { text: "Đã hoàn tiền", color: "success" },
        3: { text: "Chờ xử lý hoàn tiền", color: "danger" },
        4: { text: "Yêu cầu thất bại", color: "danger" },
    };
    const [isEditing, setIsEditing] = useState(false);
    const [refundModal, setRefundModal] = useState(null);
    const APIUpdateRefund = (refund: any, status: any) => {
        axios.put('http://localhost:5002/api/v1/refunds', {
            refund_id: refund.refund_id,
            status
        })
    };

    const handleEdit = (refund: any) => {
        setRefundModal(refund);
        setIsEditing(true);
    };

    const handleConfirm = () => {
        setIsEditing(false);
        APIUpdateRefund(refundModal, 2);
    };

    const handleCancel = () => {
        setIsEditing(false);
        APIUpdateRefund(refundModal, 4);
    };

    const EditModal = ({ refund, onClose }: { refund: any, onClose: any }) => {
        const handleClose = () => {
            setIsEditing(false);
        };

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
                <div className="bg-white w-full md:w-1/2 lg:w-1/2 xl:w-1/2 rounded-lg shadow-lg p-6 relative">
                    <h2 className="text-lg font-bold mb-4">Thông báo</h2>
                    <p>
                        Bạn có chắc chắn muốn xử lý yêu cầu cho người dùng này ?
                    </p>
                    <div className="flex justify-end mt-4">
                        <div className="flex justify-end mt-4">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={handleCancel}>Không xử lý</button>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={handleConfirm}>Đã hoàn tiền</button>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={handleClose}>Hủy</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div className="w-full flex flex-col gap-4">
            <Table>
                <TableHeader>
                    <TableColumn>Trạng thái</TableColumn>
                    <TableColumn>Ngày yêu cầu hoàn tiền</TableColumn>
                    <TableColumn>Số tiền hoàn</TableColumn>
                    <TableColumn>Mã hóa đơn</TableColumn>
                    <TableColumn>Ngày tạo hóa đơn</TableColumn>
                    <TableColumn>Ngày thanh toán</TableColumn>
                    <TableColumn>Mã đặt khám</TableColumn>
                    <TableColumn>Mã hồ sơ khám</TableColumn>
                    <TableColumn>Họ đệm</TableColumn>
                    <TableColumn>Tên</TableColumn>
                    <TableColumn>Lý do khám</TableColumn>
                    <TableColumn>Thời gian bắt đầu</TableColumn>
                    <TableColumn>Thời gian kết thúc</TableColumn>
                    <TableColumn>Vị trí khám</TableColumn>
                    <TableColumn>Họ đệm bác sĩ</TableColumn>
                    <TableColumn>Tên bác sĩ</TableColumn>
                    <TableColumn>Chuyên khoa</TableColumn>
                    <TableColumn>Nơi làm việc</TableColumn>
                    <TableColumn>Hành động</TableColumn>
                </TableHeader>
                <TableBody>
                    {
                        refunds.filter((refund: any) => refund.status === 3).map((refund: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <span>
                                        {statusMap[refund.status]?.text}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {refund.created_at}
                                </TableCell>
                                <TableCell>
                                    {refund.refund_amount}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.invoice_id}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.create_at}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.due_at}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.appointmentEntity.appointment_id}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.appointmentEntity.examinationRecordEntity.examination_record_id}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.appointmentEntity.examinationRecordEntity.firstname}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.appointmentEntity.examinationRecordEntity.lastname}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.appointmentEntity.examinationRecordEntity.reasonForConsultation}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.appointmentEntity.timeSlotEntity.starttime}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.appointmentEntity.timeSlotEntity.endtime}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.appointmentEntity.timeSlotEntity.localtion}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.firstname}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.lastname}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.specialty}
                                </TableCell>
                                <TableCell>
                                    {refund.invoiceEntity.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.workspace}
                                </TableCell>
                                <TableCell>
                                    <FontAwesomeIcon icon={faEye} className="text-green-500 cursor-pointer" onClick={() => handleEdit(refund)} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            {isEditing && <EditModal onClose={() => setIsEditing(false)} />}
        </div>
    )
};
