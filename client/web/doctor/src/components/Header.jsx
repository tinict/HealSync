import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../features/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notifications, setNotifications] = React.useState([]);
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };;

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const APINottification = () => {
        axios.get(`http://localhost:5011/api/v1/notification/${userInfo.user.identity_id}`)
            .then((res) => {
                setNotifications(res.data);
            })
    };

    const APILogout = () => {
        axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
        axios.post(`http://localhost:5001/api/v1/auth/revoke`, { access_token: token });
        dispatch(logout());
        navigate("/login");
    };

    const accountSetting = () => {
        navigate("/account/profile");
    };

    React.useEffect(() => {
        APINottification();
    }, []);

    return (
        <div maxWidth="xl" style={{ display: 'flex', justifyContent: 'center', background: "#001C38", width: '100%' }}>
            <Toolbar disableGutters style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginLeft: '32px', marginRight: '32px' }}>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'sans-serif',
                        fontWeight: 700,
                        color: 'yellow',
                        textDecoration: 'none',
                    }}
                >
                    HealthHub
                </Typography>

                <Box>
                    <Tooltip title="Notifications">
                        <IconButton color="inherit" onClick={handleClick} style={{ marginRight: '16px' }}>
                            <Badge>
                                <FontAwesomeIcon icon={faBell} style={{ color: "#fff" }} />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        {
                            notifications.map((notification, index) => (
                                <MenuItem key={index}>
                                    <Typography>{notification.message}</Typography>
                                </MenuItem>
                            ))
                        }
                    </Popover>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center" onClick={accountSetting}>Thông tin cá nhân</Typography>
                            <Typography textAlign="center" onClick={APILogout}>Đăng xuất</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </div>
    );
};

export default Header;
