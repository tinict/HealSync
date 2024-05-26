import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const RolePermission = () => {
    const [rolePermissions, setRolePermissions] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [formData, setFormData] = useState({
        role_name: '',
        permission_id: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchApiGetAlRolePermission();
        fetchApiGetAllPermission();
    }, []);

    const fetchApiGetAlRolePermission = () => {
        axios.get('http://localhost:5001/api/v1/role-permissions')
            .then((res: any) => {
                console.log(res.data);
                setRolePermissions(res.data);
            })
    };

    const fetchApiGetAllPermission = () => {
        axios.get('http://localhost:5001/api/v1/permissions')
            .then((res: any) => {
                console.log(res.data);
                setPermissions(res.data);
            })
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const saveRole = () => {
        try {
            axios.post('http://localhost:5001/api/v1/roles', formData)
            .then(() => {
                fetchApiGetAlRolePermission();
            })
            closeModal();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Quản lý vai trò</h2>
            <div className="overflow-x-auto">
                <button
                    onClick={openModal}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-sm text-sm rounded"
                >
                    Tạo mới vai trò
                </button>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full">
                            <h2 className="text-lg font-semibold mb-4">Tạo vai trò người dùng</h2>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Tên đối tượng
                                </label>
                                <input
                                    type="text"
                                    name="role_name"
                                    id="name"
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Loại đối tượng"
                                    value={formData.role_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                    Vai trò
                                </label>
                                <select
                                    id="permission"
                                    name="permission_id"
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    value={formData.permission_id}
                                    onChange={handleChange}
                                >
                                    {
                                        permissions.map((permission: any, index: number) => (
                                            <option key={index} value={permission.permission_id}>{permission.permission_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={closeModal} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    HỦY
                                </button>
                                <button onClick={saveRole} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    LƯU
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Trạng thái</th>
                            <th className="px-4 py-2">Vai trò</th>
                            <th className="px-4 py-2">Phạm vi quyền</th>
                            <th className="px-4 py-2">Thời gian tạo</th>
                            <th className="px-4 py-2">Thời gian cập nhật</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rolePermissions.map((rolePermission: any, index: number) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{rolePermission.isActive ? "Hoạt động" : "Khóa"}</td>
                                <td className="border px-4 py-2">{rolePermission.role_name}</td>
                                <td className="border px-4 py-2">{rolePermission.rolePermisstionEntity.permissionEntity.permission_name}</td>
                                <td className="border px-4 py-2">{rolePermission.create_at}</td>
                                <td className="border px-4 py-2">{rolePermission.update_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RolePermission;
