import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableFuntionality = () => {
    const [integrations, setIntegrations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fetchAPIRole = () => {
        axios.get("http://localhost:5001/api/v1/integrations")
            .then((res) => setIntegrations(res.data));
    };
    const [formData, setFormData] = useState({
        intergration_type: '',
        uri: '',
    });

    useEffect(() => {
        fetchAPIRole();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const fetchAPISaveFunction = () => {
        axios.post("http://localhost:5001/api/v1/integrations", formData)
            .then(() => {
                fetchAPIRole();
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
            <h2 className="text-lg font-semibold mb-4">Quản lý chức năng</h2>
            <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-sm text-sm rounded"
            >
                Thêm chức năng
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Tạo vai chức năng mới</h2>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Loại chức năng
                            </label>
                            <input
                                type="text"
                                name="intergration_type"
                                id="name"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder="Nhập tên chức năng"
                                value={formData.intergration_type}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Loại chức năng
                            </label>
                            <input
                                type="text"
                                name="uri"
                                id="name"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder="Nhập URI"
                                value={formData.uri}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button onClick={closeModal} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                HỦY
                            </button>
                            <button onClick={fetchAPISaveFunction} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Tạo chức năng
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
                            <th className="px-4 py-2">Tên vai trò</th>
                            <th className="px-4 py-2">URI</th>
                            <th className="px-4 py-2">Ngày tạo vai trò</th>
                            <th className="px-4 py-2">Cập nhật vai trò</th>
                        </tr>
                    </thead>
                    <tbody>
                        {integrations.map((integration: any, index: number) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{integration.isActive? "Hoạt động" : "Khóa"}</td>
                                <td className="border px-4 py-2">{integration.intergration_type}</td>
                                <td className="border px-4 py-2">{integration.uri}</td>
                                <td className="border px-4 py-2">{integration.create_at}</td>
                                <td className="border px-4 py-2">{integration.update_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableFuntionality;
