import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ImageAvatar() {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar alt="" src="/static/images/avatar/3.jpg" />
        </Stack>
    );
}
