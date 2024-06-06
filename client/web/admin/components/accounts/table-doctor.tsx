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

export const TableDoctor = () => {
    const authState = useSelector((state: any) => state.auth);
    console.log(authState);
    const [doctors, setDoctor] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);

    const handleEdit = (doctor: any) => {
        setEditingDoctor(doctor);
        setIsEditing(true);
    };

    const fetchAPIDoctor = () => {
        axios.get('http://localhost:5002/api/v1/doctors')
            .then((res) => {
                console.log(res.data);
                setDoctor(res.data);
            });
    };

    const fetchAPIUpdateDoctor = (doctor_id: string, isActive: boolean) => {
        axios.put('http://localhost:5002/api/v1/doctor/profile', {
            doctor_id,
            isActive: !isActive
        })
            .then(() => {
                fetchAPIDoctor();
            })
    };

    useEffect(() => {
        fetchAPIDoctor();
    }, []);

    const handleToggle = (doctor_id: string, isActive: boolean) => {
        fetchAPIUpdateDoctor(doctor_id, isActive);
    };

    const EditModal = ({ doctor, onClose }: { doctor: any, onClose: any }) => {
        const [editedDoctor, setEditedDoctor] = useState(doctor);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setEditedDoctor((prevState: any) => ({
                ...prevState,
                [name]: value
            }));
        };

        const handleSave = () => {
            axios.put(`http://localhost:5002/api/v1/doctor/profile`, {
                ...editedDoctor
            })
                .then(() => {
                    fetchAPIDoctor();
                    onClose();
                })
                .catch(error => {
                    console.error("Error updating Doctor:", error);
                });
        };

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
                <div className="bg-white w-full md:w-1/2 lg:w-1/2 xl:w-1/2 rounded-lg shadow-lg p-6">
                    <h2 className="text-lg font-bold mb-4">Chỉnh sửa thông tin bác sĩ</h2>
                    <form className="flex">
                        <div className="mb-4">
                            <label className="block mb-2">Họ đệm:
                                <input type="text" name="lastname" value={editedDoctor.lastname} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                            </label>
                            <label className="block mb-2">Tên:
                                <input type="text" name="firstname" value={editedDoctor.firstname} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                            </label>
                            <label className="block mb-2">Ngày sinh:
                                <input type="date" name="dob" value={editedDoctor.dob} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                            </label>
                            <label className="block mb-2">Email:
                                <input type="email" name="email" value={editedDoctor.email} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                            </label>
                            <label className="block mb-2">Giới tính:
                                <select name="gender" value={editedDoctor.gender} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1">
                                    <option value="">Chọn giới tính</option>
                                    <option value="1">Nam</option>
                                    <option value="2">Nữ</option>
                                    <option value="3">Khác</option>
                                </select>
                            </label>
                            <label className="block mb-2">Số điện thoại:
                                <input type="text" name="phone" value={editedDoctor.phone} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Chuyên ngành:
                                <input type="text" name="speciality" value={editedDoctor.speciality} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                            </label>
                            <label className="block mb-2">Chuyên môn:
                                <input type="text" name="qualification" value={editedDoctor.qualification} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                            </label>
                            <label className="block mb-2">Vị trí:
                                <input type="text" name="position" value={editedDoctor.position} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                            </label>
                            <label className="block mb-2">Học vị:
                                <input type="text" name="degree" value={editedDoctor.degree} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                            </label>
                            <label className="block mb-2">Nơi làm việc:
                                <input type="text" name="workspace" value={editedDoctor.workspace} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                            </label>
                            <label className="block mb-2">Nơi ở:
                                <input type="text" name="location" value={editedDoctor.location} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1" />
                            </label>
                        </div>
                    </form>
                    <div className="flex justify-between">
                        <button type="button" onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">Cập nhật thông tin</button>
                        <button type="button" onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md">Đóng</button>
                    </div>
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
                    <TableColumn>Chuyên ngành</TableColumn>
                    <TableColumn>Chuyên môn</TableColumn>
                    <TableColumn>Vị trí</TableColumn>
                    <TableColumn>Học vị</TableColumn>
                    <TableColumn>Nơi làm việc</TableColumn>
                    <TableColumn>Nơi ở</TableColumn>
                    <TableColumn>Ngày tạo</TableColumn>
                    <TableColumn>Ngày cập nhật</TableColumn>
                    <TableColumn>Trạng thái</TableColumn>
                    <TableColumn>Hành động</TableColumn>
                </TableHeader>
                <TableBody>
                    {doctors.map((row: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{row.doctor_id}</TableCell>
                            <TableCell>{row.firstname}</TableCell>
                            <TableCell>{row.lastname}</TableCell>
                            <TableCell>{row.dob}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.gender === 1 ? "Nam" : "Nữ"}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>{row.speciality}</TableCell>
                            <TableCell>{row.qualification}</TableCell>
                            <TableCell>{row.position}</TableCell>
                            <TableCell>{row.degree}</TableCell>
                            <TableCell>{row.workspace}</TableCell>
                            <TableCell>{row.location}</TableCell>
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
                                                onChange={() => handleToggle(row.doctor_id, row.isActive)}
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
            {isEditing && <EditModal doctor={editingDoctor} onClose={() => setIsEditing(false)} />}
        </div>
    );
};
