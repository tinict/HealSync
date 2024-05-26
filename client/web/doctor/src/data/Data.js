import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilCalendarAlt,
  UilFileMedical,
  UilCommentAlt,
  UilStethoscope
} from "@iconscout/react-unicons";

export const SidebarData = [
  {
    path: "/",
    icon: UilEstate,
    heading: "Trang chủ"
  },
  {
    path: "/timetable",
    icon: UilCalendarAlt,
    heading: "Tạo lịch khám"
  },
  {
    path: "/managerform",
    icon: UilFileMedical,
    heading: "Tạo mẫu bệnh án"
  },
  {
    path: "/appointment-schedule",
    icon: UilStethoscope,
    heading: "Bệnh nhân đặt lịch"
  },
  {
    path: "/re-examination-schedules",
    icon: UilClipboardAlt,
    heading: "Lịch tái khám"
  },
  {
    path: "/patients",
    icon: UilUsersAlt,
    heading: "Danh sách bệnh nhân"
  },
  {
    path: "/community",
    icon: UilCommentAlt,
    heading: "Threads chat"
  }
];
