import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Switch } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PeopleIcon from '@mui/icons-material/People';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../context/AuthContext';
import CompanyLogo from './logovt.png';

const drawerWidth = 315;

const Sidebar = ({ setDarkMode, darkMode }) => {
  let navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [activeItem, setActiveItem] = useState(location.pathname);
  const [adminOpen, setAdminOpen] = useState(false);

  const handleAdminClick = () => {
    setAdminOpen(!adminOpen);
  };

  const handleItemClick = (path) => {
    navigate(path);
    setActiveItem(path);
  };

  const menuItems = [];

  if (user?.role === 'admin' || user?.role === 'user') {
    menuItems.push({ text: 'Личный кабинет', icon: <AccountBoxIcon />, path: '/profile' });
    menuItems.push({ text: 'Заказы', icon: <InboxIcon />, path: '/orders' });
    menuItems.push({ text: 'Склад', icon: <WarehouseIcon />, path: '/stocks' });
  }

  if (user?.role === 'admin') {
    menuItems.push({
      text: 'Администрирование',
      icon: <AdminPanelSettingsIcon />,
      onClick: handleAdminClick,
      isCollapse: true,
    });
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: darkMode ? '#333' : '#0260E8',
          padding: '40px 0px 0px 0px',
        },
        '& .MuiListItem-root': {
          color: 'white',
        },
        '& .MuiSvgIcon-root': {
          fill: 'white',
        },
        '& .MuiTypography-root': {
          fontSize: '1.3rem'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={CompanyLogo} alt="Company Logo" style={{ width: '80%', maxWidth: '150px' }} />
      </div>
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            {item.isCollapse ? (
              <>
                <ListItem
                  button
                  onClick={item.onClick}
                  sx={{
                    backgroundColor: activeItem === item.path ? darkMode ? '#949494' : '#9CC4FC' : 'transparent',
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {adminOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem
                      button
                      onClick={() => handleItemClick('/users')}
                      sx={{
                        paddingLeft: 5,
                        backgroundColor: activeItem === '/users' ? darkMode ? '#949494' : '#9CC4FC' : 'transparent',
                      }}
                    >
                      <ListItemIcon><PeopleIcon /></ListItemIcon>
                      <ListItemText primary="Пользователи" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => handleItemClick('/logs')}
                      sx={{
                        paddingLeft: 5,
                        backgroundColor: activeItem === '/logs' ? darkMode ? '#949494' : '#9CC4FC' : 'transparent',
                      }}
                    >
                      <ListItemIcon><ListAltIcon /></ListItemIcon>
                      <ListItemText primary="Журнал действий" />
                    </ListItem>
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem
                button
                onClick={() => handleItemClick(item.path)}
                sx={{
                  backgroundColor: activeItem === item.path ? darkMode ? '#949494' : '#9CC4FC' : 'transparent',
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            )}
          </React.Fragment>
        ))}
        <ListItem>
          <Switch
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          <ListItemText primary={darkMode ? 'Тёмный режим' : 'Светлый режим'} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
