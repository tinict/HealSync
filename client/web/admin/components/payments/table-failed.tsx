import {
    Link,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const TableFailed = ({ refunds }: { refunds: any }) => {
    // const authState = useSelector((state) => state.auth);
    // console.log(authState);

    const statusMap = {
        1: { text: "Yêu cầu hoàn tiền", color: "primary" },
        2: { text: "Đã hoàn tiền", color: "success" },
        3: { text: "Chờ xử lý hoàn tiền", color: "danger" },
        4: { text: "Yêu cầu thất bại", color: "danger" },
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
                </TableHeader>
                <TableBody>
                    {
                        refunds.filter((refund: any) => refund.status === 4).map((refund: any, index: number) => (
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
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};
