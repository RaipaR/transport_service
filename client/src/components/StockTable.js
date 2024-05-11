// StockTable.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TablePagination, TextField, TableContainer, Paper, IconButton, Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';

const StockTable = ({ stocks, openEdit, onDelete }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [originalStocks, setOriginalStocks] = useState(stocks); // Сохраняем исходный список пользователей

    useEffect(() => {
        setOriginalStocks(stocks); // Обновляем исходный список при изменении данных
    }, [stocks]);

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

    const filteredStocks = stocks.filter(stock =>
        Object.values(stock).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const sortedStocks = orderBy ? filteredStocks.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
        return 0;
    }) : filteredStocks; 

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
                                active={orderBy === 'name'}
                                direction={order}
                                onClick={() => handleRequestSort('name')}
                            >
                                Наименование
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'model'}
                                direction={order}
                                onClick={() => handleRequestSort('model')}
                            >
                                Модель
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'vin'}
                                direction={order}
                                onClick={() => handleRequestSort('vin')}
                            >
                                VIN
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'placementDate'}
                                direction={order}
                                onClick={() => handleRequestSort('placementDate')}
                            >
                                Дата_размещения
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'shippingPermission'}
                                direction={order}
                                onClick={() => handleRequestSort('shippingPermission')}
                            >
                                Разрешение_на_отгрузку
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'shippingDate'}
                                direction={order}
                                onClick={() => handleRequestSort('shippingDate')}
                            >
                                Дата_отгрузки
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {sortedStocks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stock) => (
                        <TableRow key={stock._id}>
                            <TableCell>{stock.name}</TableCell>
                            <TableCell>{stock.model}</TableCell>
                            <TableCell>{stock.vin}</TableCell>
                            <TableCell>{new Date(stock.placementDate).toLocaleDateString()}</TableCell>
                            <TableCell>{stock.shippingPermission ? 'Есть' : 'Нету'}</TableCell>
                            <TableCell>{new Date(stock.shippingDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                            <IconButton 
                                    color="error"
                                    onClick={() => onDelete(stock._id)}
                                    style={{ marginRight: '10px' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    onClick={() => openEdit(stock)}
                                >
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={filteredStocks.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Строк на странице"
            />
        </TableContainer>
    );
};

export default StockTable;
