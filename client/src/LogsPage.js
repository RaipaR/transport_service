import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableSortLabel, TablePagination, TextField, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

const LogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('createdAt');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    // Загрузка журнала действий с сервера при монтировании компонента
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/logs');
                setLogs(response.data);
            } catch (error) {
                console.error('Ошибка при получении логов', error);
            }
        };
        fetchLogs();
    }, []);

    // Функция для обработки сортировки по колонкам таблицы
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Функция для изменения текущей страницы
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Функция для изменения количества строк на странице
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Функция для сброса сортировки к начальному состоянию
    const handleResetSort = () => {
        setOrder('asc');
        setOrderBy('createdAt'); // Сбрасываем orderBy к начальному состоянию
    };

    // Фильтрация логов по поисковому запросу
    const filteredLogs = logs.filter(log =>
        ['user.username', 'details', 'createdAt'].some(key =>
            String(log[key]?.toString() || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Сортировка отфильтрованных логов
    const sortedLogs = orderBy ? filteredLogs.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
        return 0;
    }) : filteredLogs;

    return (
        <div style={{width: '100%' }}>
        <Typography variant="h4" gutterBottom>Журнал действий</Typography>
        <Paper>
            <TextField
                label="Поиск"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                style={{ margin: '10px' }}
            />
            <IconButton onClick={handleResetSort}>
                <ReplayIcon style={{ margin: '10px' }} />
            </IconButton>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'user.username'}
                                direction={order}
                                onClick={() => handleRequestSort('user.username')}
                            >
                                Пользователь
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'details'}
                                direction={order}
                                onClick={() => handleRequestSort('details')}
                            >
                                Действие
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'createdAt'}
                                direction={order}
                                onClick={() => handleRequestSort('createdAt')}
                            >
                                Дата
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((log) => (
                        <TableRow key={log._id}>
                            <TableCell>{log.user?.username || 'Неизвестный пользователь'}</TableCell>
                            <TableCell>{log.details}</TableCell>
                            <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={filteredLogs.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Строк на странице"
            />
        </Paper>
        </div>
    );
};

export default LogsPage;
