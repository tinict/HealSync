import React, { useEffect, useState, useRef } from 'react';
import { Container, Col, Form, Button, ListGroup, Breadcrumb } from 'react-bootstrap';
import { Send, Image } from 'react-bootstrap-icons';
import io from 'socket.io-client';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export function ChatComponent({ thread }) {
    const socket = useRef(io('http://localhost:5006'));
    const [messages, setMessages] = useState([]);
    const [replyMessage, setReplyMessage] = useState('');
    const [sentImage, setSentImage] = useState(false);
    const messagesEndRef = useRef(null);
    const [imagePreview, setImagePreview] = useState('');
    const [file, setFile] = React.useState(null);
    const customerProfile = useSelector(state => state.customer);

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
                id: 201,
                sender: {
                    user_id: customerProfile.customer_id,
                    username: customerProfile.name
                }
            };
            socket.current.emit('send-message', newMessage);
        }

        if (replyMessage.trim() !== '') {
            const newMessage = {
                thread_id: thread[0],
                content: replyMessage,
                id: 201,
                sender: {
                    user_id: customerProfile.customer_id,
                    username: customerProfile.name
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

    const fileInput = useRef(null);

    const handleClick = () => {
        fileInput.current.click();
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

    const handleFileUpload = async () => {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', customerProfile.customer_id);
        formData.append('filename', `${customerProfile.customer_id + '_image_message'}`);

        return await axios.post(`http://localhost:5003/api/v1/media/upload/singlefile`, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        });
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 180px)" }}>
            
            <Col md={7}>
                <div style={{ maxHeight: 'calc(100vh - 270px)', overflowY: 'auto' }}>
                    <ListGroup>
                        {Array.isArray(messages) && messages.map(({ sender: { user_id, username }, content, timestamp }, index) => (
                            <ListGroup.Item
                                key={index}
                                className={"d-flex align-items-center mb-3"}
                                style={{ maxWidth: '100%', flexDirection: user_id === `${customerProfile.customer_id}` ? "row-reverse" : "row" }}
                            >
                                {renderAvatar(user_id, username)}
                                <div className={`p-2 rounded border border-primary"}`} style={{ wordWrap: 'break-word' }}>
                                    <div>
                                        <strong>{username}</strong>
                                        <span className="ml-2 text-muted">{formatDate(timestamp)}</span>
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
                                        <p>{content}</p>
                                    )}
                                </div>
                            </ListGroup.Item>
                        ))}
                        <div ref={messagesEndRef} />
                    </ListGroup>
                </div>
                <div className="d-flex mt-3">
                    <Form className="flex-grow-1 mr-2">
                        {!sentImage ? (
                            <Form.Group controlId="replyMessage" className="mb-0">
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tin nhắn"
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                />
                            </Form.Group>
                        ) : (
                            <div className="mb-0" style={{ position: 'relative', border: '1px solid #ced4da', borderRadius: '0.25rem', padding: '0.375rem 0.75rem', overflow: 'hidden' }}>
                                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                <div style={{ position: 'absolute', bottom: '5px', right: '5px' }}>
                                    <Button variant="danger" size="sm" onClick={() => { setImagePreview(''); setSentImage(false); }}>
                                        Xóa
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Form> 
                    <div>
                        <Button variant="primary" onClick={sendMessage}>
                            <Send />
                        </Button>
                        <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleFileInputChange} />
                        <Button variant="primary" onClick={handleClick}>
                            <Image />
                        </Button>
                    </div>
                </div>
            </Col>
        </Container>
    );
};
