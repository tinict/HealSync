import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ModelPermission = () => {
    const [rolePermissions, setRolePermissions] = useState([]);
    const [modelPermissions, setModelPermissions] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [tempPermissions, setTempPermissions] = useState<any[]>([]);
    const [models, setModels] = useState([]);
    const [selectPermission, setSelectPermission] = useState('');
    const [selectModel, setSelectModel] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [functions, setFunctions] = useState([]);
    const [modelPermissionIntegrations, setModelPermissionIntegrations] = useState([]);
    const [currentPermissionDetails, setCurrentPermissionDetails] = useState<any[]>([]);

    const fetchApiGetAllFunctions = () => {
        axios.get('http://localhost:5001/api/v1/integrations')
            .then((res: any) => {
                setFunctions(res.data);
            })
    }

    const fetchApiGetAllRole = async () => {
        return await axios.get('http://localhost:5001/api/v1/models');
    };

    const handlePermissionChange = (index: any, value: any) => {
        setSelectPermission(value);
    };

    const handleSelectedScope = (modelSelectPermission: any) => {
        setTempPermissions([...tempPermissions, modelSelectPermission]);
    };

    useEffect(() => {
        fetchApiGetAlRolePermission();
        fetchApiGetAllPermission();
        fetchApiGetAllFunctions();
        fetchModelPermissionIntegration();
    }, []);

    const fetchApiGetAlRolePermission = () => {
        axios.get('http://localhost:5001/api/v1/role-permissions')
            .then((res: any) => {
                setRolePermissions(res.data);
            })
    };

    const fetchApiGetAllPermission = () => {
        axios.get('http://localhost:5001/api/v1/permissions')
            .then((res: any) => {
                setPermissions(res.data);
            })
    };

    const fetchModelPermissionIntegration = () => {
        axios.get('http://localhost:5001/api/v1/model-permission-integrations')
            .then((res: any) => {
                setModelPermissionIntegrations(res.data);
            })
    }

    const saveModalPermission = (accessPermissions: any[]) => {
        try {
            axios.post("http://localhost:5001/api/v1/model-permissions", {
                accessPermissions
            });
            closeModal();
        } catch (error) {
            console.error('Error saving data:', error);
        }

        setTempPermissions([]);
    };

    const openModal = async () => {
        const roles = await fetchApiGetAllRole();
        setModels(roles.data);
        setIsModalOpen(true);
    };

    const openPermissionModal = (modelPermissionEntities: any[]) => {
        setCurrentPermissionDetails(modelPermissionEntities);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModelPermissions([]);
        setTempPermissions([]);
        setIsModalOpen(false);
    };

    const handleModelChange = async (e: any) => {
        setSelectModel(e);
    }

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Quản lý phạm vi chức năng</h2>
            <div className="overflow-x-auto">
                <button
                    onClick={openModal}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-sm text-sm"
                >
                    Thiết lập quyền
                </button>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
                        <div className="bg-white rounded-lg p-8 max-w-3xl w-full">
                            <h2 className="text-lg font-semibold mb-4">Thiết lập phạm vi chức năng đối tượng</h2>
                            <select
                                className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                onChange={(e) => handleModelChange(e.target.value)}
                            >
                                <option value="">Chọn đối tượng</option>
                                {models.map((model: any, index: number) => (
                                    <option key={index} value={model.model_id}>{model.model_type}</option>
                                ))}
                            </select>
                            <table className="w-full mb-4">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Chức năng</th>
                                        <th className="px-4 py-2">Phạm vi quyền hạn</th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {functions.map((func: any, index: number) => (
                                        <tr key={index}>
                                            <td className="border px-4 py-2">{func.intergration_type}</td>
                                            <td className="border px-4 py-2">
                                                <select
                                                    className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={selectPermission}
                                                    onChange={(e) => handlePermissionChange(index, e.target.value)}
                                                >
                                                    <option value="">Chọn quyền</option>
                                                    {permissions.map((permission: any, pIndex: number) => (
                                                        <option key={pIndex} value={permission.permission_id}>{permission.permission_name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                <button
                                                    onClick={() => handleSelectedScope({
                                                        permission_id: selectPermission,
                                                        integration_id: func.integration_id,
                                                        model_id: selectModel
                                                    })}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Cấp quyền
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-end">
                                <button onClick={closeModal} className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Hủy
                                </button>
                                <button onClick={() => saveModalPermission(tempPermissions)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Thiết lập
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <table className="table-auto w-full mt-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Đối tượng</th>
                            <th className="px-4 py-2">Phạm vi quyền</th>
                            <th className="px-4 py-2">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modelPermissionIntegrations.map((modelPermissionIntegration: any, index: number) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{modelPermissionIntegration.model_type}</td>
                                <td className="border px-4 py-2">{modelPermissionIntegration.modelPermisionEntities.map((entity: any) => entity.permissionEntity.permission_name).join(', ')}</td>
                                <td className="border px-4 py-2">{modelPermissionIntegration.modelPermisionEntities.map((entity: any) => entity.integrationEntity.intergration_type).join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModelPermission;
