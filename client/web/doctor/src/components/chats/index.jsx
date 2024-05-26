import { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Modal, TextField, Box, Paper, IconButton } from '@mui/material';
import { FaComment, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const modalStyles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
    },
    header: {
        marginBottom: '24px',
    },
    input: {
        marginBottom: '16px',
    },
    button: {
        marginTop: '16px',
    },
};

const listItemStyles = {
    listItem: {
        marginBottom: '16px',
        padding: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    avatar: {
        width: '50px',
        height: '50px',
        marginRight: '16px',
    },
    replyButton: {
        marginRight: '8px',
    },
    commentBox: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '8px',
    },
    commentIcon: {
        marginRight: '4px',
    },
};

const ThreadsChat = () => {
    const userInfo = useSelector(state => state.auth.user);
    const [showModal, setShowModal] = useState(false);
    const [threads, setThreads] = useState([]);
    const [groupType, setGroupType] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const APIThreads = () => {
        axios.get('http://localhost:5006/api/v1/threads')
            .then((res) => {
                const dataArray = Object.entries(res.data["0"]).map(([index, value]) => {
                    return [index, value];
                });
                setThreads(dataArray);
            })
    };

    useEffect(() => {
        APIThreads();
    }, []);

    const handleCreateQuestion = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleQuestionSubmit = () => {
        axios.post("http://localhost:5006/api/v1/thread", {
            group_type: groupType,
            content: content,
            creator: {
                user_id: userInfo.user.identity_id,
                user_name: userInfo.user.username
            }
        })
            .then(() => {
                APIThreads();
            })
            .catch((error) => {
                console.error("Error creating thread: ", error);
            });

        setShowModal(false);
    };

    const ThreadItem = ({ thread }) => {
        const formatDate = (timestamp) => {
            const date = new Date(timestamp);
            return date.toLocaleString();
        };

        const handleReply = () => {
            navigate(`chat/${thread[0]}`);
        };

        return (
            <Paper variant="outlined" sx={listItemStyles.listItem}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        {thread[1].creator.avatar ? (
                            <Avatar alt="Avatar" src={thread[1].creator.avatar} sx={listItemStyles.avatar} />
                        ) : (
                            <Avatar sx={{ backgroundColor: '#007bff', color: '#fff' }}>{thread[1].creator.username.charAt(0).toUpperCase()}</Avatar>
                        )}
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1">{thread[1].creator.username}</Typography>
                                <Typography variant="caption">{formatDate(thread[1].timestamp)}</Typography>
                            </Box>
                        }
                        secondary={
                            <span dangerouslySetInnerHTML={{ __html: thread[1].content }} />
                        }
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '8px' }}>
                        <Button variant="contained" size="small" onClick={() => handleReply(thread[1].content)} sx={listItemStyles.replyButton}>Tham gia</Button>
                    </Box>
                </ListItem>
            </Paper>
        );
    };

    const headerStyles = {
        container: {
            marginBottom: '24px',
            textAlign: 'left',
        },
        button: {
            marginTop: '16px',
        },
    };


    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={headerStyles.container}>
                    <Typography variant="h5" component="div">Thảo luận cộng đồng</Typography>
                    <Button onClick={handleCreateQuestion} variant="contained" color="primary" sx={headerStyles.button}>Tạo cuộc thảo luận</Button>
                </Grid>
                <Grid item xs={12}>
                    <List sx={modalStyles.threadContainer}>
                        {threads.map((threadId) => (
                            <ThreadItem key={threadId} thread={threadId} />
                        ))}
                    </List>
                </Grid>
            </Grid>
            <Modal open={showModal} onClose={handleCloseModal}>
                <Box sx={modalStyles.modal}>
                    <Typography variant="h6" sx={modalStyles.header}>Nội dung cuộc thảo luận</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="groupType"
                        label="Chuyên khoa"
                        name="groupType"
                        value={groupType}
                        onChange={(e) => setGroupType(e.target.value)}
                        sx={modalStyles.input}
                    />
                    <CKEditor
                        editor={ClassicEditor}
                        data=""
                        onReady={editor => {
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log(data);
                            setContent(data)
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={handleQuestionSubmit} sx={modalStyles.button}>Đăng bài</Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default ThreadsChat;
