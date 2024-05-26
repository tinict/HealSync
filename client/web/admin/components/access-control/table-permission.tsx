import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TablePermission = () => {
    const [permissions, setPermissions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const fetchAPIPermission = () => {
        axios.get("http://localhost:5001/api/v1/permissions")
            .then((res) => setPermissions(res.data));
    };
    const [formData, setFormData] = useState({
        permission_name: '',
        permission_id: ''
    });

    useEffect(() => {
        fetchAPIPermission();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const fetchAPISavePermission = () => {
        axios.post("http://localhost:5001/api/v1/permissions", formData)
            .then(() => {
                fetchAPIPermission();
                setIsModalOpen(false);
            });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Quyền người dùng</h2>
            <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-sm text-sm rounded"
            >
                Tạo quyền mới
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Tạo quyền mới</h2>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Tên quyền
                            </label>
                            <input
                                type="text"
                                name="permission_name"
                                id="name"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder="Nhập tên quyền"
                                value={formData.permission_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button onClick={closeModal} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                HỦY
                            </button>
                            <button onClick={fetchAPISavePermission} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Tạo quyền
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Trạng thái</th>
                            <th className="px-4 py-2">Tên quyền</th>
                            <th className="px-4 py-2">Ngày tạo quyền</th>
                            <th className="px-4 py-2">Ngày cập nhật quyền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map((permission: any, index: number) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{permission.isActive ? "Hoạt động" : "Khóa"}</td>
                                <td className="border px-4 py-2">{permission.permission_name}</td>
                                <td className="border px-4 py-2">{permission.create_at}</td>
                                <td className="border px-4 py-2">{permission.update_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TablePermission;
