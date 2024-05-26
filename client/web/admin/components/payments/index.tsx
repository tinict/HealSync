"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { useDispatch, useSelector } from 'react-redux';
import { TablePending } from './table-pending';
import axios from 'axios';
import { TableProcessing } from "./table-processing";
import { TableRefunded } from "./table-reunfunded";
import { TableFailed } from "./table-failed";

export const Payments = () => {
    // const authState = useSelector((state) => state.auth);
    // console.log(authState);

    const [activeTab, setActiveTab] = useState(0);
    const [payments, setPayments] = useState([]);

    const APIPayments = () => {
        axios.get("http://localhost:5002/api/v1/refund-all")
            .then((res) => {
                setPayments(res.data);
            })
    };

    useEffect(() => {
        APIPayments();
    }, []);

    const tabs = [
        { title: 'Yêu cầu hoàn tiền', content: <TablePending refunds={payments} /> },
        { title: 'Đang xử lý yêu cầu hoàn tiền', content: <TableProcessing refunds={payments}/> },
        { title: 'Đã xử lý', content: <TableRefunded refunds={payments} /> },
        { title: 'Yêu cầu không duyệt', content: <TableFailed refunds={payments} /> },
    ];

    return (
        <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <ul className="flex">
                <li className="flex gap-2">
                    <HouseIcon />
                    <Link href={"/"}>
                        <span>Trang chủ</span>
                    </Link>
                    <span> / </span>{" "}
                </li>

                <li className="flex gap-2">
                    <UsersIcon />
                    <span>Xử lý thanh toán</span>
                </li>
            </ul>

            <h3 className="text-xl font-semibold">Xử lý hoàn tiền</h3>
            <div className="max-w-[95rem] mx-auto w-full">
                <ul className="flex border-b border-gray-200">
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            className={`-mb-px mr-1 flex justify-center items-center ${index === activeTab
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200'
                                }`}
                            onClick={() => setActiveTab(index)}
                        >
                            <a
                                className="inline-block py-2 px-4"
                                href="#"
                                onClick={(e) => e.preventDefault()}
                            >
                                {tab.title}
                            </a>
                        </li>
                    ))}
                </ul>
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`${index === activeTab ? '' : 'hidden'}`}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
};
