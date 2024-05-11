import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import HomeIcon from '@mui/icons-material/Home';
import { useAuth } from '../context/AuthContext'; // Импортируем useAuth для получения роли пользователя

const drawerWidth = 240;

const Sidebar = () => {
  let navigate = useNavigate();
  const { user } = useAuth(); // Получаем информацию о пользователе

  const menuItems = [

  ];


  if (user?.role === 'admin' || user?.role === 'user') {
    menuItems.push({ text: 'Личный кабинет', icon: <HomeIcon />, path: '/profile' });
    menuItems.push({ text: 'Заказы', icon: <InboxIcon />, path: '/orders' });
    menuItems.push({ text: 'Склад', icon: <StoreIcon />, path: '/stocks'  });
  }

  if (user?.role === 'admin') {
    menuItems.push({ text: 'Пользователи', icon: <PeopleIcon />, path: '/users' });
  }

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