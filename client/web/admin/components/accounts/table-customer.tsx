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
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const TableCustomer = () => {
    const authState = useSelector((state: any) => state.auth);
    console.log(authState);
    const [customers, setCustomer] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

    const handleEdit = (customer: any) => {
        setEditingCustomer(customer);
        setIsEditing(true);
    };

    const fetchAPICustomer = () => {
        axios.get('http://localhost:5002/api/v1/customers')
            .then((res) => {
                console.log(res.data);
                setCustomer(res.data);
            });
    };

    const fetchAPIUpdateCustomer = (customer_id: string, isActive: boolean) => {
        axios.put('http://localhost:5002/api/v1/customer/me', {
            customer: {
                customer_id,
                isActive: !isActive
            }
        })
            .then(() => {
                fetchAPICustomer();
            })
    };

    useEffect(() => {
        fetchAPICustomer();
    }, []);

    const handleToggle = (customer_id: string, isActive: boolean) => {
        fetchAPIUpdateCustomer(customer_id, isActive);
    };

    const EditModal = ({ customer, onClose }: { customer: any, onClose: any }) => {
        const [editedCustomer, setEditedCustomer] = useState(customer);

        const handleChange = (e: any) => {
            const { name, value } = e.target;
            setEditedCustomer((prevState: any) => ({
                ...prevState,
                [name]: value
            }));
        };

        const handleSave = () => {
            axios.put('http://localhost:5002/api/v1/customer/me', {
                customer: editedCustomer
            })
                .then(() => {
                    onClose();
                })
                .catch(error => {
                    console.error("Error updating customer:", error);
                });
        };

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg shadow-lg p-6">
                    <h2 className="text-lg font-bold mb-4">Chỉnh sửa thông tin khách hàng</h2>
                    <form>
                        <label className="block mb-2">
                            Họ đệm:
                            <input type="text" name="family_name" value={editedCustomer.family_name} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                        </label>
                        <label className="block mb-2">
                            Tên:
                            <input type="text" name="name" value={editedCustomer.name} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                        </label>
                        <label className="block mb-2">
                            Ngày sinh:
                            <input type="date" name="dob" value={editedCustomer.dob} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                        </label>
                        <label className="block mb-2">
                            Email:
                            <input type="email" name="email" value={editedCustomer.email} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                        </label>
                        <label className="block mb-2">
                            Giới tính:
                            <select name="gender" value={editedCustomer.gender} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1">
                                <option value="">Chọn giới tính</option>
                                <option value="1">Nam</option>
                                <option value="2">Nữ</option>
                                <option value="3">Khác</option>
                            </select>
                        </label>
                        <label className="block mb-2">
                            Số điên thoại:
                            <input type="text" name="phone" value={editedCustomer.phone} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                        </label>
                        <button type="button" onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Cập nhật thông tin</button>
                        <button type="button" onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Đóng</button>
                    </form>
                </div>
            </div>
        );
    };


    return (
        <div className="w-full flex flex-col gap-4">
            <Table>
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Họ đệm</TableColumn>
                    <TableColumn>Tên</TableColumn>
                    <TableColumn>Ngày sinh</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Giới tính</TableColumn>
                    <TableColumn>Số điện thoại</TableColumn>
                    <TableColumn>Ngày tạo</TableColumn>
                    <TableColumn>Ngày cập nhật</TableColumn>
                    <TableColumn>Trạng thái</TableColumn>
                    <TableColumn>Hành động</TableColumn>
                </TableHeader>
                <TableBody>
                    {customers.map((row: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{row.customer_id}</TableCell>
                            <TableCell>{row.family_name}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.dob}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.gender === 1 ? "Nam" : "Nữ"}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>{row.create_at}</TableCell>
                            <TableCell>{row.update_at}</TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    <label className="flex items-center cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={row.isActive}
                                                onChange={() => handleToggle(row.customer_id, row.isActive)}
                                            />
                                            <div className={`toggle__line w-12 h-6 bg-gray-400 rounded-full shadow-inner ${row.isActive ? 'bg-red-500' : 'bg-gray-500'}`}></div>
                                            <div className={`toggle__dot absolute top-0 transform -translate-y-1/6 w-6 h-6 bg-blue-500 rounded-full shadow ${row.isActive ? 'right-0' : 'left-0'}`}></div>
                                        </div>
                                    </label>
                                </div>
                            </TableCell>

                            <TableCell>
                                <FontAwesomeIcon icon={faPencilAlt} className="text-green-500 cursor-pointer" onClick={() => handleEdit(row)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isEditing && <EditModal customer={editingCustomer} onClose={() => setIsEditing(false)} />}
        </div>
    );
};
