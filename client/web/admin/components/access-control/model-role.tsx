import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModelRole = () => {
    const [models, setModels] = useState([]);
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
        model_type: '',
        role_id: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchApiGetAllModel();
        fetchApiGetAllRole();
    }, []);

    const fetchApiGetAllModel = () => {
        axios.get('http://localhost:5001/api/v1/models')
            .then((res: any) => {
                console.log(res.data);
                setModels(res.data);
            })
    };

    const fetchApiGetAllRole = () => {
        axios.get('http://localhost:5001/api/v1/roles')
            .then((res: any) => {
                console.log(res.data);
                setRoles(res.data);
            })
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const saveModel = () => {
        try {
            axios.post('http://localhost:5001/api/v1/models', formData)
            .then(() => {
                fetchApiGetAllModel();
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
            <h2 className="text-lg font-semibold mb-4">Quản lý đối tượng</h2>
            <div className="overflow-x-auto">
                <button
                    onClick={openModal}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-sm text-sm rounded"
                >
                    Tạo đối tượng
                </button>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full">
                            <h2 className="text-lg font-semibold mb-4">Tạo đối tượng</h2>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Tên đối tượng
                                </label>
                                <input
                                    type="text"
                                    name="model_type"
                                    id="name"
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Loại đối tượng"
                                    value={formData.model_type}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                    Vai trò
                                </label>
                                <select
                                    id="role"
                                    name="role_id"
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    value={formData.role_id}
                                    onChange={handleChange}
                                >
                                    <option>Chọn vai trò</option>
                                    {
                                        roles.map((model: any, index: number) => (
                                            <option key={index} value={model.role_id}>{model.role_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={closeModal} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    HỦY
                                </button>
                                <button onClick={saveModel} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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
                            <th className="px-4 py-2">Loại đối tượng</th>
                            <th className="px-4 py-2">Vai trò</th>
                            <th className="px-4 py-2">Thời gian tạo</th>
                            <th className="px-4 py-2">Thời gian cập nhật</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models.map((model: any, index: number) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{model.isActive ? "Hoạt động" : "Khóa"}</td>
                                <td className="border px-4 py-2">{model.model_type}</td>
                                <td className="border px-4 py-2">{model.role_name}</td>
                                <td className="border px-4 py-2">{model.create_at}</td>
                                <td className="border px-4 py-2">{model.update_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModelRole;
