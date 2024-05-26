import * as React from "react";
import { Typography, Box, Button, Card, CardContent, Input, Grid } from "@mui/material";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function Avatar() {
    const [avatar, setAvatar] = React.useState(null);
    const [file, setFile] = React.useState(null);
    const userInfo = useSelector(state => state.auth.user);
    const [preview, setPreview] = React.useState(null);
    const [isChanged, setIsChanged] = React.useState(false);

    const handleFileUpload = () => {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', userInfo.user.identity_id);
        formData.append('filename', `${userInfo.user.identity_id + '_avatar'}`);
        setIsChanged(false);

        axios.post(`http://localhost:5003/api/v1/media/upload/singlefile`, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        })
            .then((res) => {
                axios.put(
                    "http://localhost:5002/api/v1/doctor/profile",
                    {
                        url_picture: `https://mediahealsyc.s3.ap-southeast-1.amazonaws.com/${res.data.file_path}`,
                        doctor_id: userInfo.user.identity_id
                    }
                )
            })
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result);
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    React.useEffect(() => {
        axios.get(`http://localhost:5002/api/v1/doctors/profile/${userInfo.user.identity_id}`)
            .then((res) => {
                setPreview(res.data.url_picture);
            })
    }, []);

    return (
        <Card sx={{ maxWidth: 250, margin: "auto", mt: 3, boxShadow: 3 }}>
            <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={3} margin="auto">
                    <input
                        accept="image/*"
                        id="avatar-upload"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="avatar-upload">
                        <Button
                            variant="contained"
                            component="span"
                            onClick={() => setIsChanged(true)}
                            sx={{
                                textTransform: 'none',
                                backgroundColor: '#1976d2',
                                '&:hover': { backgroundColor: '#115293' },
                                boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
                            }}
                        >
                            Thay đổi
                        </Button>
                    </label>
                    {
                        isChanged && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFileUpload}
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: '#388e3c',
                                    '&:hover': { backgroundColor: '#2e7d32' },
                                    boxShadow: '0 3px 5px 2px rgba(56, 142, 60, .3)',
                                }}
                            >
                                Cập nhật
                            </Button>
                        )
                    }
                </Box>
                <Grid container justifyContent="center">
                    <Grid item>
                        {(preview || avatar) && (
                            <img
                                src={preview || avatar}
                                alt="Preview"
                                style={{ maxWidth: "100%", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", marginTop: "20px" }}
                            />
                        )}
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    );
}
