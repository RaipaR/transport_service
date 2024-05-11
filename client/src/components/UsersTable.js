import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TablePagination, TextField, TableContainer, Paper, IconButton, Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';

const UsersTable = ({ users, onEdit, onDelete }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [originalUsers, setOriginalUsers] = useState(users); // Сохраняем исходный список пользователей

    useEffect(() => {
        setOriginalUsers(users); // Обновляем исходный список при изменении данных
    }, [users]);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleResetSort = () => {
        setOrder('asc');
        setOrderBy(''); // Сбрасываем orderBy для сброса сортировки к начальному состоянию
    };

    const filteredUsers = users.filter(user =>
        Object.values(user).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const sortedUsers = orderBy ? filteredUsers.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
        return 0;
    }) : filteredUsers; 
    
    return (
        <TableContainer component={Paper}>
                    <TextField
                        label="Поиск"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="small"
                        style={{ margin: '10px' }}
                    />
                    <IconButton onClick={handleResetSort}>
                        <ReplayIcon 
                        style={{ margin: '10px' }}
                        />
                    </IconButton>
        <Table>
            <TableHead>
                <TableRow>
                <TableCell>
                            <TableSortLabel
                                active={orderBy === 'username'}
                                direction={order}
                                onClick={() => handleRequestSort('username')}
                            >
                                Имя пользователя
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'role'}
                                direction={order}
                                onClick={() => handleRequestSort('role')}
                            >
                                Роль
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'fullName'}
                                direction={order}
                                onClick={() => handleRequestSort('fullName')}
                            >
                                ФИО
                            </TableSortLabel>
                        </TableCell>
                    <TableCell>Действия</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                    <TableRow key={user._id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.fullName}</TableCell>
                        <TableCell>
                            <IconButton 
                                onClick={() => onEdit(user)}
                                color="primary"
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton 
                                color="error"
                                onClick={() => onDelete(user._id)}
                                style={{ marginRight: '10px' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <TablePagination
                component="div"
                count={filteredUsers.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Строк на странице"
            />
        </TableContainer>
    );
};

export default UsersTable;