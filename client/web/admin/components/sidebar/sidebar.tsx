import React from "react";
import { Sidebar } from "./sidebar.styles";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { SidebarItem } from "./sidebar-item";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Trang chủ"
              icon={<HomeIcon />}
              isActive={pathname === "/home"}
              href="/home"
            />
            <SidebarItem
              isActive={pathname === "/home/accounts"}
              title="Quản lý người dùng"
              icon={<AccountsIcon />}
              href="/home/accounts"
            />
            <SidebarItem
              isActive={pathname === "/home/payments"}
              title="Quản lý thanh toán"
              icon={<PaymentsIcon />}
              href="/home/payments"
            />
            <SidebarItem
              isActive={pathname === "/home/access-control"}
              title="Phân quyền"
              icon={<CustomersIcon />}
              href="/home/access-control"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
