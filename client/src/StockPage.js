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
    p: 4,
};

const StockPage = () => {
    const [stocks, setStocks] = useState([]);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [currentStock, setCurrentStock] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        model: '',
        vin: '',
        placementDate: '',
        shippingPermission: '',
        shippingDate: '',
    });

    const fetchAllStocks = async () => {
        const response = await fetchStocks();
        setStocks(response.data);
    };

    useEffect(() => {
        fetchAllStocks();
    }, []);

    const handleOpen = () => {
        setCurrentStock({});
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleEditOpen = (stock) => {
        setCurrentStock(stock);
        setEditOpen(true);
    };
    const handleEditClose = () => setEditOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentStock._id) {
            await updateStock(currentStock._id, currentStock);
            setEditOpen(false);
        } else {
            await createStock(currentStock);
            setOpen(false);
        }
        fetchAllStocks(); // Обновить данные после сохранения
    };

    const handleDelete = async (stockId) => {
        await deleteStock(stockId);
        fetchAllStocks(); // Обновить данные после удаления
    };

    const handleChange = (e) => {
        setCurrentStock({ ...currentStock, [e.target.name]: e.target.value });
    };

    const handleEditSave = async (e) => {
        e.preventDefault();
        try {
            await updateStock(currentStock._id, formData);
            setStocks(prevStocks => prevStocks.map(stock => stock._id === currentStock._id ? { ...stock, ...formData } : stock));
            handleEditClose();
        } catch (error) {
            console.error("Ошибка при обновлении записи:", error);
        }
    };

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <AddIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom>Создать запись</Typography>
                    <TextField 
                        label="Наименование" 
                        name="name" 
                        value={currentStock.name || ''} 
                        onChange={handleChange} 
                        fullWidth margin="dense" 
                        />
                    <TextField 
                        label="Модель" 
                        name="model" 
                        value={currentStock.model || ''} 
                        onChange={handleChange} 
                        fullWidth margin="dense" 
                        />
                    <TextField 
                        label="VIN" 
                        name="vin" 
                        value={currentStock.vin || ''} 
                        onChange={handleChange} 
                        fullWidth margin="dense" 
                        />
                    <TextField 
                        label="Дата размещения" 
                        name="placementDate" 
                        type="date" 
                        InputLabelProps={{ shrink: true }}
                        value={currentStock.placementDate ? new Date(currentStock.placementDate).toISOString().substr(0, 10) : ''} 
                        onChange={handleChange} 
                        fullWidth margin="dense" 
                        />
                    <TextField 
                        select label="Разрешение на отгрузку" 
                        name="shippingPermission" 
                        value={currentStock.shippingPermission || ''} 
                        onChange={handleChange} 
                        fullWidth margin="dense">
                        <MenuItem value={true}>Есть</MenuItem>
                        <MenuItem value={false}>Нету</MenuItem>
                    </TextField>
                    <TextField 
                        label="Дата отгрузки" 
                        name="shippingDate" 
                        type="date" 
                        InputLabelProps={{ shrink: true }}
                        value={currentStock.shippingDate ? new Date(currentStock.shippingDate).toISOString().substr(0, 10) : ''} 
                        onChange={handleChange} 
                        fullWidth margin="dense" 
                        />
                    <Button type="submit" variant="contained">Сохранить</Button>
                </Box>
            </Modal>
            <Modal open={editOpen} onClose={handleEditClose}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom>Редактировать склад</Typography>
                    <TextField 
                        label="Наименование" 
                        name="name" value={currentStock.name || ''} 
                        onChange={handleChange} 
                        fullWidth margin="dense" 
                        />
                    <TextField 
                        label="Модель" 
                        name="model" 
                        value={currentStock.model || ''} 
                        onChange={handleChange} 
                        fullWidth margin="dense" 
                        />
                    <TextField 
                        label="VIN" 
                        name="vin" 
                        value={currentStock.vin || ''} 
                        onChange={handleChange} 
                        fullWidth margin="dense" 
                        />
                    <TextField 
                        label="Дата размещения"
                        name="placementDate" 
                        type="date" 
                        value={currentStock.placementDate ? new Date(currentStock.placementDate).toISOString().substr(0, 10) : ''} 
                        onChange={handleChange} 
                        fullWidth margin="dense" 
                        />
                    <TextField 
                        select label="Разрешение на отгрузку" 
                        name="shippingPermission" 
                        value={currentStock.shippingPermission || ''} 
                        onChange={handleChange} 
                        fullWidth margin="dense">
                        <MenuItem value={true}>Есть</MenuItem>
                        <MenuItem value={false}>Нету</MenuItem>
                    </TextField>
                    <TextField 
                        label="Дата отгрузки" 
                        name="shippingDate" 
                        type="date" 
                        value={currentStock.shippingDate ? new Date(currentStock.shippingDate).toISOString().substr(0, 10) : ''} 
                        onChange={handleChange} 
                        fullWidth margin="dense" />
                    <Button type="submit" variant="contained">Сохранить</Button>
                </Box>
            </Modal>
            <StockTable stocks={stocks} openEdit={handleEditOpen} onDelete={handleDelete}/>
            {editOpen}
        </div>
    );
};

export default StockPage;
