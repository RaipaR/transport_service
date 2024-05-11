// OrdersTable.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TablePagination, TextField, TableContainer, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';

const OrdersTable = ({ orders, openPreview, openEdit, onDelete }) => {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [originalOrders, setOriginalOrders] = useState(orders); // Сохраняем исходный список пользователей

    useEffect(() => {
        setOriginalOrders(orders); // Обновляем исходный список при изменении данных
    }, [orders]);

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

    const filteredOrders = orders.filter(user =>
        Object.values(user).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const sortedOrders = orderBy ? filteredOrders.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
        return 0;
    }) : filteredOrders;

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
            <Table aria-label="таблица заказов">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'customer'}
                                direction={order}
                                onClick={() => handleRequestSort('customer')}
                            >
                                Клиент
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'executor'}
                                direction={order}
                                onClick={() => handleRequestSort('executor')}
                            >
                                Исполнитель
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'routea'}
                                direction={order}
                                onClick={() => handleRequestSort('routea')}
                            >
                                Точка_А
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'routeb'}
                                direction={order}
                                onClick={() => handleRequestSort('routeb')}
                            >
                                Точка_Б
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'cargo'}
                                direction={order}
                                onClick={() => handleRequestSort('cargo')}
                            >
                                Груз
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'vehicle'}
                                direction={order}
                                onClick={() => handleRequestSort('vehicle')}
                            >
                                Транспортное_средство
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'deliveryDate'}
                                direction={order}
                                onClick={() => handleRequestSort('deliveryDate')}
                            >
                                Дата_загрузки
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'status'}
                                direction={order}
                                onClick={() => handleRequestSort('status')}
                            >
                                Статус
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                        <TableRow key={order._id}>
                            <TableCell component="th" scope="row">{order.customer}</TableCell>
                            <TableCell >{order.executor}</TableCell>
                            <TableCell >{order.routea}</TableCell>
                            <TableCell >{order.routeb}</TableCell>
                            <TableCell >{order.cargo}</TableCell>
                            <TableCell >{order.vehicle}</TableCell>
                            <TableCell >{new Date(order.deliveryDate).toLocaleDateString()}</TableCell>
                            <TableCell >{order.status}</TableCell>
                            <TableCell >
                                <IconButton 
                                    color="error"
                                    onClick={() => onDelete(order._id)}
                                    size="small"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    onClick={() => openPreview(order)}
                                    size="small"
                                >
                                    <VisibilityIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    onClick={() => openEdit(order)}
                                    size="small"
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={filteredOrders.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Строк на странице"
            />
        </TableContainer>
    );
};

export default OrdersTable;
