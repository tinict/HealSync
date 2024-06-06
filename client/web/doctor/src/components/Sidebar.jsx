import React, { useState } from "react";
import { SidebarData } from "../data/Data";
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import zIndex from "@mui/material/styles/zIndex";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setExpanded(open);
  };

  return (
    <>
      <List style={{ width: "100%" }}>
        {SidebarData.map((item, index) => (
          <Tooltip title={item.heading} key={index}>
            <ListItem
              button
              key={index}
              selected={selected === index}
              onClick={() => setSelected(index)}
              component={Link}
              to={item.path}
              sx={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', marginBottom: '12px', marginTop: '12px' }}
            >
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <item.icon style={{ color: '#ffffff' }} />
              </ListItemIcon>
            </ListItem>
          </Tooltip>
        ))}
      </List >
    </>
  );
};

export default Sidebar;
