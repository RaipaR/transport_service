import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импорт useNavigate
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';

const drawerWidth = 240;

const Sidebar = () => {
  let navigate = useNavigate(); // Использование хука useNavigate

  const menuItems = [
    { text: 'Заказы', icon: <InboxIcon />, path: '/orders' },
    { text: 'Клиенты', icon: <PeopleIcon />, path: '/clients' },
    { text: 'Склад', icon: <StoreIcon />, path: '/warehouse' }
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
