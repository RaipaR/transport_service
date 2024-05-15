// StockTable.js
import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    TextField,
    TableContainer,
    Paper,
    IconButton,
    Collapse,
    Box,
    Typography,
    Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';

import { AddPhotoAlternate as AddPhotoAlternateIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
import { fetchPhotos, addPhoto, deletePhoto } from '../api/stockApi';

const StockTable = ({ stocks, openEdit, onDelete }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedRows, setExpandedRows] = useState({});
    const [photos, setPhotos] = useState({});

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
        setOrderBy('');
    };

    const handleToggleRow = async (id) => {
        const isExpanded = !!expandedRows[id];
        setExpandedRows({ ...expandedRows, [id]: !isExpanded });

        if (!isExpanded && !photos[id]) {
            const response = await fetchPhotos(id);
            setPhotos({ ...photos, [id]: response.data });
        }
    };

    const handleAddPhotos = async (id, event) => {
        const formData = new FormData();
        Array.from(event.target.files).forEach(file => {
            formData.append('photos', file);
        });
        await addPhoto(id, formData);
        const response = await fetchPhotos(id);
        setPhotos({ ...photos, [id]: response.data });
    };

    const handleDeletePhoto = async (id, photo) => {
        await deletePhoto(id, photo);
        const response = await fetchPhotos(id);
        setPhotos({ ...photos, [id]: response.data });
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
                                Дата размещения
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'shippingPermission'}
                                direction={order}
                                onClick={() => handleRequestSort('shippingPermission')}
                            >
                                Разрешение на отгрузку
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'shippingDate'}
                                direction={order}
                                onClick={() => handleRequestSort('shippingDate')}
                            >
                                Дата отгрузки
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'address'}
                                direction={order}
                                onClick={() => handleRequestSort('address')}
                            >
                                Адрес склада
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'damages'}
                                direction={order}
                                onClick={() => handleRequestSort('damages')}
                            >
                                Повреждения
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Действия</TableCell>
                        <TableCell>Фото</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedStocks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stock) => (
                        <>
                            <TableRow key={stock._id}>
                                <TableCell>{stock.name}</TableCell>
                                <TableCell>{stock.model}</TableCell>
                                <TableCell>{stock.vin}</TableCell>
                                <TableCell>{new Date(stock.placementDate).toLocaleDateString()}</TableCell>
                                <TableCell>{stock.shippingPermission ? 'Есть' : 'Нету'}</TableCell>
                                <TableCell>{new Date(stock.shippingDate).toLocaleDateString()}</TableCell>
                                <TableCell>{stock.address}</TableCell>
                                <TableCell>{stock.damages}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="error"
                                        onClick={() => onDelete(stock._id)}
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
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleToggleRow(stock._id)}
                                    >
                                        {expandedRows[stock._id] ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={10} style={{ paddingBottom: 0, paddingTop: 0 }}>
                                    <Collapse in={expandedRows[stock._id]} timeout="auto" unmountOnExit>
                                        <Box margin={1}>
                                            <input
                                                accept="image/*"
                                                id={`upload-photo-${stock._id}`}
                                                type="file"
                                                multiple
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleAddPhotos(stock._id, e)}
                                            />
                                            <label htmlFor={`upload-photo-${stock._id}`}>
                                                
                                            <IconButton color="primary" component="span">
                                                    <AddPhotoAlternateIcon />
                                                </IconButton>
                                            </label>
                                            <Box display="flex" flexWrap="wrap">
                                                {photos[stock._id] && photos[stock._id].map((photo, index) => (
                                                    <Box key={index} position="relative" m={1}>
                                                        <img
                                                            src={`http://localhost:3001/public/${photo}`}
                                                            alt={`stock-${index}`}
                                                            style={{ width: 100, height: 100, objectFit: 'cover' }}
                                                            onClick={() => window.open(`http://localhost:3001/public/${photo}`, '_blank')}
                                                        />
                                                        <IconButton
                                                            size="small"
                                                            color="secondary"
                                                            onClick={() => handleDeletePhoto(stock._id, photo)}
                                                            style={{ position: 'absolute', top: 0, right: 0 }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </>
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
