// src/views/inventory/AddItemModal.js

import React, { useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CRow, // <--- ¡Asegúrate de importar CRow!
  CCol,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react';

const unitOptions = [
  { label: 'kg', value: 1 },
  { label: 'L', value: 2 },
  { label: 'pcs', value: 3 },
  { label: 'g', value: 4 },
  { label: 'ml', value: 5 },
  { label: 'N/A', value: '' }
];

const AddItemModal = ({ visible, onClose, onSave }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    type: '',
    description: '',
    current_stock: '',
    max_stock: '',
    min_stock: '',
    unit_id: '',
    expiration_date: '',
    supplier: '',
    status: '',
    last_maintenance_date: '',
    next_maintenance_date: '',
    location: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!newItem.name) newErrors.name = 'Item Name is required.';
    if (!newItem.type) newErrors.type = 'Type is required.';
    if (!newItem.max_stock || isNaN(newItem.max_stock) || parseInt(newItem.max_stock) <= 0) {
      newErrors.max_stock = 'Max Stock must be a positive number.';
    }
    if (!newItem.min_stock || isNaN(newItem.min_stock) || parseInt(newItem.min_stock) < 0) {
      newErrors.min_stock = 'Min Stock must be a non-negative number.';
    }
    if (newItem.expiration_date && new Date(newItem.expiration_date) < new Date()) {
      newErrors.expiration_date = 'Expiration Date cannot be in the past.';
    }
    if (!newItem.supplier) newErrors.supplier = 'Supplier is required.';
    if (!newItem.status) newErrors.status = 'Status is required.';
    if (!newItem.location) newErrors.location = 'Location is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(newItem);
      // Reset form after saving
      setNewItem({
        name: '',
        type: '',
        description: '',
        current_stock: '',
        max_stock: '',
        min_stock: '',
        unit_id: '',
        expiration_date: '',
        supplier: '',
        status: '',
        last_maintenance_date: '',
        next_maintenance_date: '',
        location: '',
      });
      setErrors({}); // Clear errors
    }
  };

  const handleCloseModal = () => {
    onClose();
    // Reset form and errors when closing
    setNewItem({
      name: '',
      type: '',
      description: '',
      current_stock: '',
      max_stock: '',
      min_stock: '',
      unit_id: '',
      expiration_date: '',
      supplier: '',
      status: '',
      last_maintenance_date: '',
      next_maintenance_date: '',
      location: '',
    });
    setErrors({});
  };

  return (
    <CModal alignment="center" visible={visible} onClose={handleCloseModal}>
      <CModalHeader>
        <CModalTitle>Add New Inventory Item</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel htmlFor="itemName">Item Name <span className="text-danger">*</span></CFormLabel>
            <CFormInput
              type="text"
              id="itemName"
              name="name"
              value={newItem.name}
              onChange={handleChange}
              invalid={!!errors.name}
            />
            {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="itemType">Type <span className="text-danger">*</span></CFormLabel>
            <CFormSelect
              id="itemType"
              name="type"
              value={newItem.type}
              onChange={handleChange}
              invalid={!!errors.type}
            >
              <option value="">Select Type</option>
              <option value="Ingredient">Ingredient</option>
              <option value="Utensil">Utensil</option>
              <option value="Equipment">Equipment</option>
            </CFormSelect>
            {errors.type && <div className="invalid-feedback d-block">{errors.type}</div>}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="itemDescription">Description</CFormLabel>
            <CFormInput
              type="text"
              id="itemDescription"
              name="description"
              value={newItem.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="itemCurrentStock">Current Stock <span className="text-danger">*</span></CFormLabel>
            <CFormInput
              type="number"
              id="itemCurrentStock"
              name="current_stock"
              value={newItem.current_stock}
              onChange={handleChange}
              invalid={!!errors.current_stock}
            />
            {errors.current_stock && <div className="invalid-feedback d-block">{errors.current_stock}</div>}
          </div>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="itemMaxStock">Max Stock <span className="text-danger">*</span></CFormLabel>
              <CFormInput
                type="number"
                id="itemMaxStock"
                name="max_stock"
                value={newItem.max_stock}
                onChange={handleChange}
                invalid={!!errors.max_stock}
              />
              {errors.max_stock && <div className="invalid-feedback d-block">{errors.max_stock}</div>}
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="itemMinStock">Min Stock <span className="text-danger">*</span></CFormLabel>
              <CFormInput
                type="number"
                id="itemMinStock"
                name="min_stock"
                value={newItem.min_stock}
                onChange={handleChange}
                invalid={!!errors.min_stock}
              />
              {errors.min_stock && <div className="invalid-feedback d-block">{errors.min_stock}</div>}
            </CCol>
          </CRow>
          <div className="mb-3">
            <CFormLabel htmlFor="itemUnit">Unit {newItem.type === 'Ingredient' && <span className="text-danger">*</span>}</CFormLabel>
            <CFormSelect
              id="itemUnit"
              name="unit_id"
              value={newItem.unit_id}
              onChange={handleChange}
              disabled={newItem.type !== 'Ingredient'}
              invalid={!!errors.unit_id}
            >
              <option value="">Select Unit</option>
              {unitOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </CFormSelect>
            {errors.unit_id && <div className="invalid-feedback d-block">{errors.unit_id}</div>}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="itemExpirationDate">Expiration Date</CFormLabel>
            <CFormInput
              type="date"
              id="itemExpirationDate"
              name="expiration_date"
              value={newItem.expiration_date}
              onChange={handleChange}
              invalid={!!errors.expiration_date}
            />
            {errors.expiration_date && <div className="invalid-feedback d-block">{errors.expiration_date}</div>}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="itemLastMaintenanceDate">Last Maintenance Date</CFormLabel>
            <CFormInput
              type="date"
              id="itemLastMaintenanceDate"
              name="last_maintenance_date"
              value={newItem.last_maintenance_date}
              onChange={handleChange}
              invalid={!!errors.last_maintenance_date}
            />
            {errors.last_maintenance_date && <div className="invalid-feedback d-block">{errors.last_maintenance_date}</div>}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="itemNextMaintenanceDate">Next Maintenance Date</CFormLabel>
            <CFormInput
              type="date"
              id="itemNextMaintenanceDate"
              name="next_maintenance_date"
              value={newItem.next_maintenance_date}
              onChange={handleChange}
              invalid={!!errors.next_maintenance_date}
            />
            {errors.next_maintenance_date && <div className="invalid-feedback d-block">{errors.next_maintenance_date}</div>}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="itemSupplier">Supplier <span className="text-danger">*</span></CFormLabel>
            <CFormInput
              type="text"
              id="itemSupplier"
              name="supplier"
              value={newItem.supplier}
              onChange={handleChange}
              invalid={!!errors.supplier}
            />
            {errors.supplier && <div className="invalid-feedback d-block">{errors.supplier}</div>}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="itemStatus">Status <span className="text-danger">*</span></CFormLabel>
            <CFormSelect
              id="itemStatus"
              name="status"
              value={newItem.status}
              onChange={handleChange}
              invalid={!!errors.status}
            >
              <option value="">Select Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="In Use">In Use</option>
            </CFormSelect>
            {errors.status && <div className="invalid-feedback d-block">{errors.status}</div>}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="itemLocation">Location <span className="text-danger">*</span></CFormLabel>
            <CFormInput
              type="text"
              id="itemLocation"
              name="location"
              value={newItem.location}
              onChange={handleChange}
              invalid={!!errors.location}
            />
            {errors.location && <div className="invalid-feedback d-block">{errors.location}</div>}
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleCloseModal}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Add Item
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddItemModal;