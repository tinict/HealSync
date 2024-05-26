"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "@/features/auth/authSlice";
import { useRouter } from 'next/navigation';

export const UserDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state?.auth.user);
  const token = useSelector((state: any) => state?.auth.token);
  const router = useRouter();

  const APILogout = () => {
    axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
    axios.post(`http://localhost:5001/api/v1/auth/revoke`, { access_token: token });
    dispatch(logout());
    router.push('/login');
  };


  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem key="logout" color="danger" className="text-danger " onClick={APILogout}>
          Đăng xuất
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
