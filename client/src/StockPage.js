// StockPage.js
import React, { useState, useEffect } from 'react';
import { IconButton, Modal, Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StockTable from './components/StockTable';
import { fetchStocks, createStock, updateStock, deleteStock } from './api/stockApi';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const StockPage = () => {
    const [stocks, setStocks] = useState([]); // Состояние для списка товаров на складе
    const [open, setOpen] = useState(false); // Состояние для открытия/закрытия модального окна создания товара
    const [editOpen, setEditOpen] = useState(false); // Состояние для открытия/закрытия модального окна редактирования товара
    const [currentStock, setCurrentStock] = useState({}); // Состояние для текущего редактируемого товара

    // Функция для загрузки всех товаров со склада
    const fetchAllStocks = async () => {
        const response = await fetchStocks();
        setStocks(response.data);
    };

    useEffect(() => {
        fetchAllStocks(); // Загрузка товаров при монтировании компонента
    }, []);

    const handleOpen = () => {
        setCurrentStock({}); // Очистка данных текущего товара
        setOpen(true); // Открытие модального окна создания товара
    };
    const handleClose = () => setOpen(false); // Закрытие модального окна создания товара

    const handleEditOpen = (stock) => {
        setCurrentStock(stock); // Установка текущего товара для редактирования
        setEditOpen(true); // Открытие модального окна редактирования товара
    };
    const handleEditClose = () => setEditOpen(false); // Закрытие модального окна редактирования товара

    // Обработчик отправки формы создания/редактирования товара
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentStock._id) {
            await updateStock(currentStock._id, currentStock); // Обновление товара при редактировании
            setEditOpen(false); // Закрытие модального окна редактирования
        } else {
            await createStock(currentStock); // Создание нового товара
            setOpen(false); // Закрытие модального окна создания
        }
        fetchAllStocks(); // Обновление списка товаров после сохранения
    };

    // Обработчик удаления товара
    const handleDelete = async (stockId) => {
        await deleteStock(stockId); // Удаление товара по его идентификатору
        fetchAllStocks(); // Обновление списка товаров после удаления
    };

    // Обработчик изменения данных формы
    const handleChange = (e) => {
        setCurrentStock({
            ...currentStock,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Склад
            </Typography>
            <IconButton onClick={handleOpen}>
                <AddIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom>
                        Создать запись
                    </Typography>
                    <TextField
                        label="Наименование"
                        name="name"
                        value={currentStock.name || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Модель"
                        name="model"
                        value={currentStock.model || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="VIN"
                        name="vin"
                        value={currentStock.vin || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Дата размещения"
                        name="placementDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={
                            currentStock.placementDate
                                ? new Date(
                                      currentStock.placementDate
                                  )
                                      .toISOString()
                                      .substr(0, 10)
                                : ''
                        }
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        select
                        label="Разрешение на отгрузку"
                        name="shippingPermission"
                        value={currentStock.shippingPermission || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    >
                        <MenuItem value={true}>Есть</MenuItem>
                        <MenuItem value={false}>Нету</MenuItem>
                    </TextField>
                    <TextField
                        label="Дата отгрузки"
                        name="shippingDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={
                            currentStock.shippingDate
                                ? new Date(currentStock.shippingDate)
                                      .toISOString()
                                      .substr(0, 10)
                                : ''
                        }
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        select
                        label="Адрес склада"
                        name="address"
                        value={currentStock.address || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    >
                        <MenuItem value="Новотроицкое">
                            Новотроицкое
                        </MenuItem>
                        <MenuItem value="Пригородная">
                            Пригородная
                        </MenuItem>
                        <MenuItem value="Мухина">Мухина</MenuItem>
                        <MenuItem value="Садовое">Садовое</MenuItem>
                    </TextField>
                    <TextField
                        label="Повреждения"
                        name="damages"
                        value={currentStock.damages || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <Button type="submit" variant="contained">
                        Сохранить
                    </Button>
                </Box>
            </Modal>
            <Modal open={editOpen} onClose={handleEditClose}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom>
                        Редактировать запись
                    </Typography>
                    <TextField
                        label="Наименование"
                        name="name"
                        value={currentStock.name || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Модель"
                        name="model"
                        value={currentStock.model || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="VIN"
                        name="vin"
                        value={currentStock.vin || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Дата размещения"
                        name="placementDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={
                            currentStock.placementDate
                                ? new Date(
                                      currentStock.placementDate
                                  )
                                      .toISOString()
                                      .substr(0, 10)
                                : ''
                        }
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        select
                        label="Разрешение на отгрузку"
                        name="shippingPermission"
                        value={currentStock.shippingPermission || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    >
                        <MenuItem value={true}>Есть</MenuItem>
                        <MenuItem value={false}>Нету</MenuItem>
                    </TextField>
                    <TextField
                        label="Дата отгрузки"
                        name="shippingDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={
                            currentStock.shippingDate
                                ? new Date(currentStock.shippingDate)
                                      .toISOString()
                                      .substr(0, 10)
                                : ''
                        }
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        select
                        label="Адрес склада"
                        name="address"
                        value={currentStock.address || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    >
                        <MenuItem value="Новотроицкое">
                            Новотроицкое
                        </MenuItem>
                        <MenuItem value="Пригородная">
                            Пригородная
                        </MenuItem>
                        <MenuItem value="Мухина">Мухина</MenuItem>
                        <MenuItem value="Садовое">Садовое</MenuItem>
                    </TextField>
                    <TextField
                        label="Повреждения"
                        name="damages"
                        value={currentStock.damages || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <Button type="submit" variant="contained">
                        Сохранить
                    </Button>
                </Box>
            </Modal>
            <StockTable
                stocks={stocks}
                openEdit={handleEditOpen}
                onDelete={handleDelete}
            />
            {editOpen}
        </div>
    );
};

export default StockPage;
