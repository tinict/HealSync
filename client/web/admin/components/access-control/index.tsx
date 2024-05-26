"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import ModelRole from "./model-role";
import RolePermission from "./role-permission";
import ModelPermission from "./model-permission";
import TablePermission from "./table-permission";
import TableFuntionality from "./table-functionality";

export const AccessControl = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { title: 'Quản lý quyền', content: <TablePermission/> },
        { title: 'Quản lý chức năng', content: <TableFuntionality /> },
        { title: 'Quản lý đối tượng', content: <ModelRole /> },
        { title: 'Quản lý vai trò có quyền', content: <RolePermission /> },
        { title: 'Quản lý phạm vi chức năng', content: <ModelPermission/> }
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
                    <span></span>{" "}
                    <span>Phân quyền</span>
                </li>
            </ul>

            <h3 className="text-xl font-semibold">Quản lý phân quyền người dùng</h3>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
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
                    <div className="mt-8">
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
            </div>
        </div>
    );
};
