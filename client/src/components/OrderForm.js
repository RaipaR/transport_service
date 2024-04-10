import React, { useState, useEffect } from 'react';
import { createOrder, updateOrder } from '../api/ordersApi';

const OrderForm = ({ order = {}, onSave, isEditing = false }) => {
    const [formData, setFormData] = useState({
        customer: '',
        vehicle: '',
        deliveryDate: '',
        status: '',
    });

    useEffect(() => {
        if (isEditing) {
            setFormData({
                customer: order.customer,
                vehicle: order.vehicle,
                deliveryDate: order.deliveryDate,
                status: order.status,
            });
        }
    }, [order, isEditing]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let savedOrder;
            if (isEditing) {
                savedOrder = await updateOrder(order._id, formData);
            } else {
                savedOrder = await createOrder(formData);
            }
            onSave(savedOrder);
            setFormData({
                customer: '',
                vehicle: '',
                deliveryDate: '',
                status: '',
            });
        } catch (error) {
            console.error('Failed to save the order:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                placeholder="Customer"
                required
            />
            <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                placeholder="Vehicle"
                required
            />
            <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                required
            />
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
            >
                <option value="">Выберите статус</option>
                <option value="Новый">Новый</option>
                <option value="В работе">В работе</option>
                <option value="Выполнен">Выполнен</option>
                <option value="Отменен">Отменен</option>
            </select>
            <button type="submit">{isEditing ? 'Update' : 'Save'}</button>
        </form>
    );
};

export default OrderForm;