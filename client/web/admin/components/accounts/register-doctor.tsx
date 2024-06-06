"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const CreateAccountDoctor = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        phone: '',
        password: uuidv4(),
        model: {
            model_id: '',
            model_type: ''
        }
    });
    const [models, setModels] = useState([]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const APISendmail = () => {
        axios.post(
            'http://localhost:5009/api/v1/mailer/sendmail',
            {
                to: formData.email,
                subject: 'HealthHub | Cấp tài khoản sử dụng thuộc hệ sinh thái HealthHub',
                data: formData,
                template: 'info_account'
            }
        )
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post('http://localhost:5001/api/v1/auth/register', {
                ...formData,
                model_id: formData.model?.model_id
            })
                .then(() => {
                    alert("Bạn đã cấp tài khoản thành công!");
                    APISendmail();
                    console.log('Registration successful:', formData);
                })
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const fetchApiGetAllRole = async () => {
        axios.get('http://localhost:5001/api/v1/models')
            .then((res) => {
                setModels(res.data);
            })
    };

    useEffect(() => {
        fetchApiGetAllRole();
    }, []);

    return (
        <div className="w-full mx-auto my-8">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Họ đệm" required />
                </div>
                <div className="mb-4">
                    <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Tên" required />
                </div>
                <div className="mb-4">
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Tên tài khoản" required />
                </div>
                <div className="mb-4">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Email" required />
                </div>
                <div className="mb-4">
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Số điện thoại" required />
                </div>
                <div className="mb-4">
                    <input type="password" name="password" value={formData.password} disabled className="w-full p-2 border rounded-md bg-gray-100" />
                </div>
                <div className="mb-4">
                    <select name="model" value={formData.model.model_id} onChange={handleChange} className="w-full p-2 border rounded-md">
                        <option value="">Chọn đối tượng</option>
                        {models.map((model: any, index: number) => (
                            <option key={index} value={model.model_id}>{model.model_type}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Tạo tài khoản</button>
                </div>
            </form>
        </div>
    );
};

export default CreateAccountDoctor;
