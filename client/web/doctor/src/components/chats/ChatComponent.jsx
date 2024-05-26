import React, { useEffect, useState, useRef } from 'react';
import { Container, Grid, TextField, Button, List, ListItem, Typography, IconButton } from '@mui/material';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { Send, Image, Trash } from 'react-bootstrap-icons';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const ChatComponent = ({ thread }) => {
    const socket = useRef(io('http://localhost:5006'));
    const [messages, setMessages] = useState([]);
    const [replyMessage, setReplyMessage] = useState('');
    const messagesEndRef = useRef(null);
    const userInfo = useSelector(state => state.auth.user);
    const [sentImage, setSentImage] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [file, setFile] = React.useState(null);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    useEffect(() => {
        socket.current.emit('join-room', thread);
        socket.current.on("history-message", (data) => {
            setMessages(data);
            scrollToBottom();
            console.log("History-message: ", data);
        });

        return () => {
            socket.current.off('history-message');
        };
    }, []);

    useEffect(() => {
        socket.current.on("list-message", (data) => {
            setMessages(data);
            scrollToBottom();
            console.log("list-message ", data);
        });

        return () => {
            socket.current.off('list-message');
        };
    }, []);

    const handleFileUpload = async () => {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', userInfo.user.identity_id);
        formData.append('filename', `${userInfo.user.identity_id + '_' + uuid() + '_image_message'}`);

        return await axios.post(`http://localhost:5003/api/v1/media/upload/singlefile`, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        });
    };

    const sendMessage = async () => {
        setSentImage(false);

        if (sentImage) {
            const url_image = await handleFileUpload();
            console.log(url_image);

            const newMessage = {
                thread_id: thread[0],
                content: {
                    type: "img",
                    url_image: url_image.data.file_path
                },
                id: uuid(),
                sender: {
                    user_id: userInfo.user.identity_id,
                    username: userInfo.user.username
                }
            };
            socket.current.emit('send-message', newMessage);
        }

        if (replyMessage.trim() !== '') {
            const newMessage = {
                thread_id: thread[0],
                content: replyMessage,
                id: uuid(),
                sender: {
                    user_id: userInfo.user.identity_id,
                    username: userInfo.user.username
                }
            };
            socket.current.emit('send-message', newMessage);
            setReplyMessage('');
        }
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const renderAvatar = (username) => {
        const initials = username.charAt(0).toUpperCase();
        return (
            <div className="rounded-circle mr-3" style={{ width: '40px', height: '40px', backgroundColor: '#007bff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {initials}
            </div>
        );
    };

    const handleFileInputChange = (e) => {
        setSentImage(true);

        const file = e.target.files[0];
        setFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const fileInput = useRef(null);

    const handleClick = () => {
        fileInput.current.click();
    };

    return (
        <Container>
            <Grid container justifyContent="center" alignItems="center" style={{ width: "100%" }}>
                <Grid item xs={12} md={12}>
                    <div style={{ maxHeight: 'calc(100vh - 280px)', overflowY: 'auto' }}>
                        <List>
                            {Array.isArray(messages) && messages.map(({ sender: { user_id, username }, content, timestamp }, index) => (
                                <ListItem
                                    key={index}
                                    className={"d-flex align-items-center mb-3"}
                                    style={{ maxWidth: '100%', flexDirection: user_id === userInfo.user.identity_id ? "row-reverse" : "row" }}
                                >
                                    {renderAvatar(user_id, username)}
                                    <div className={`p-2 rounded border border-primary`} style={{ wordWrap: 'break-word', margin: "8px"}}>
                                        <div>
                                            <Typography variant="body1" component="strong">{username}</Typography>
                                            <Typography variant="body2" color="textSecondary" className="ml-2">{formatDate(timestamp)}</Typography>
                                        </div>
                                        {content.type === 'img' ? (
                                            <img src={`https://mediahealsyc.s3.ap-southeast-1.amazonaws.com/${content.url_image}`} alt="Message content" style={{
                                                maxHeight: 'calc(100vh - 270px)',
                                                overflowY: '300px',
                                                width: '300px',
                                                height: '350px',
                                                borderRadius: '10px'
                                            }} />
                                        ) : (
                                            <Typography variant="body2">{content}</Typography>
                                        )}
                                    </div>
                                </ListItem>
                            ))}
                            <div ref={messagesEndRef} />
                        </List>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
                        {!sentImage ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Nhập tin nhắn"
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                style={{ marginRight: '0.5rem' }}
                            />
                        ) : (
                            <div style={{ position: 'relative', border: '1px solid #ced4da', borderRadius: '4px', padding: '0.375rem 0.75rem', overflow: 'hidden', marginRight: '0.5rem', width: '100%' }}>
                                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                <div style={{ position: 'absolute', bottom: '5px', right: '5px' }}>
                                    <IconButton size="small" onClick={() => { setImagePreview(''); setSentImage(false); }} style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                                        <Trash />
                                    </IconButton>
                                </div>
                            </div>
                        )}
                        <Button variant="contained" color="primary" type="submit" style={{ marginRight: '0.5rem' }}>
                            <Send />
                        </Button>
                        <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleFileInputChange} />
                        <IconButton color="primary" onClick={handleClick}>
                            <Image />
                        </IconButton>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ChatComponent;
