import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Typography, TextField, Grid, CardContent, CardActions, IconButton, Box } from "@mui/material";
import { UilPlus, UilTimes, UilEye, UilFileAlt, UilCalendarAlt, UilTrashAlt, UilEdit } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { templateform } from '../../features/templateFormSlice.js';
import axios from 'axios';
import { format } from 'date-fns';
import ToastMessage from '../ToastMessage.jsx';

const TemplateManagement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [newTemplateName, setNewTemplateName] = useState("");
    const [newTemplateDescription, setNewTemplateDescription] = useState("");
    const userInfo = useSelector(state => state.auth.user);
    const [showModalForm, setShowModalForm] = useState(false);
    const [fileContent, setFileContent] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    const handleAction = (message) => {
        setToastMessage(message);
        setToastType('success');
        setToastOpen(true);
    };

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    const openModalForm = async (pathname) => {
        try {
            const response = await axios.get(`http://localhost:5003/api/v1/media/file?rf=${pathname}`);
            console.log(response.data);
            setFileContent(response.data.content);
            setShowModalForm(true);
        } catch (error) {
            console.error('Failed to read file:', error);
        }
    };

    const closeModalForm = () => {
        setShowModalForm(false);
    };

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`http://localhost:5002/api/v1/forms/${userInfo.user.identity_id}`);
            const fileNames = response.data.map(file => ({
                id: file.form_id,
                pathname: file.filepath,
                name: file.formname,
                createdAt: file.createdAt
            }));
            setTemplates(fileNames);
        } catch (error) {
            console.error('Failed to fetch files:', error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const addTemplate = () => {
        const newTemplate = {
            id: Math.random().toString(36).substring(7),
            name: newTemplateName,
            description: newTemplateDescription
        };
        const formname = newTemplate.name;
        dispatch(templateform({ "formname": formname }));
        navigate('/dynamicform?action=create');
        setTemplates([...templates, newTemplate]);
        setNewTemplateName("");
        setNewTemplateDescription("");
        closeModal();
    };

    const deleteForm = (key) => {
        axios.delete(`http://localhost:5003/api/v1/media/files?rf=${key}`)
            .then(() => {
                axios.delete(`http://localhost:5002/api/v1/forms?key=${key}`);
                fetchFiles();
                handleAction("Xóa biểu mẫu thành công!");
            })
    };

    const editForm = (pathname, templatename) => {
        navigate(`/dynamicform?tname=${templatename}&&fname=${pathname}&&action=edit`);
    };

    return (
        <Box style={{ marginTop: "16px", marginBottom: "16px" }}>
            <Typography variant="h5" gutterBottom>Quản lý hồ sơ mẫu</Typography>
            <Button variant="contained" startIcon={<UilPlus />} onClick={openModal} style={{ marginBottom: '20px' }}>Tạo mẫu mới</Button>
            <Grid container spacing={2}>
                {templates.map((template, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card elevation={3}>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <UilFileAlt size="40" />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5" component="div" >
                                            {template.name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Box mt={2}>
                                    <Typography variant="body1" color="textSecondary">
                                        Mã mẫu: {template.id}
                                    </Typography>
                                </Box>
                                <Box mt={2} display="flex" alignItems="center">
                                    <UilCalendarAlt size="20" />
                                    <Typography variant="body1" color="textSecondary" ml={1}>
                                        {format(new Date(template.createdAt), 'dd/MM/yyyy HH:mm')}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => openModalForm(template.pathname)}>
                                    <UilEye />
                                </IconButton>
                                <IconButton onClick={() => editForm(template.pathname, template.name)}>
                                    <UilEdit />
                                </IconButton>
                                <IconButton onClick={() => deleteForm(template.pathname)}>
                                    <UilTrashAlt />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Modal open={showModalForm} onClose={closeModalForm}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                    <Typography variant="h6" gutterBottom>Xem nội dung mẫu</Typography>
                    <Typography variant="body1"><div dangerouslySetInnerHTML={{ __html: fileContent }} /></Typography>
                    <Button variant="contained" onClick={closeModalForm}>Đóng</Button>
                </div>
            </Modal>
            <Modal open={showModal} onClose={closeModalForm} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="modal" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                    <IconButton className="modal-close" onClick={closeModal}><UilTimes /></IconButton>
                    <TextField label="Tên mẫu" variant="outlined" fullWidth value={newTemplateName} onChange={(e) => setNewTemplateName(e.target.value)} style={{ marginBottom: '10px' }} />
                    <Button variant="contained" onClick={addTemplate} style={{ backgroundColor: '#2196f3', color: 'white' }}>Tạo ngay</Button>
                </div>
            </Modal>
            <ToastMessage
                open={toastOpen}
                message={toastMessage}
                handleClose={handleCloseToast}
                type={toastType}
            />
        </Box>
    );
};

export default TemplateManagement;
