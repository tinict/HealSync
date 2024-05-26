import * as React from "react";
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SlidebarAccount() {
    const [open, setOpen] = React.useState(true);

    React.useEffect(() => {
        setOpen(true);
    }, []);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <IconButton onClick={toggleDrawer} sx={{ position: 'absolute', left: 0, top: 0, zIndex: 999 }}>
                Menu
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer}
                position="fixed"
            >
                <List>
                    <ListItem>
                        <Link to="/setting/account/avatar">
                            <ListItemText primary="Cập nhật ảnh đại diện" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/setting/account/profile">
                            <ListItemText primary="Cập nhật thông tin cá nhân" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/update-account">
                            <ListItemText primary="Cập nhật tài khoản" />
                        </Link>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};
