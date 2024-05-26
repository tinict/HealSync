"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { TableCustomer } from "./table-customer";
import { TableDoctor } from "./table-doctor";
import CreateAccountDoctor from "./register-doctor";

export const Accounts = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: 'Tài khoản bệnh nhân', content: <TableCustomer /> },
    { title: 'Tài khoản bác sĩ', content: <TableDoctor /> },
    { title: 'Cấp tài khoản', content: <CreateAccountDoctor /> },
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
          <span>Người dùng</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Quản lý người dùng</h3>
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
