// src/views/inventory/InventoryFilter.js

import React from 'react';
import {
  CForm,
  CRow,
  CCol,
  CFormInput,
  CFormSelect,
  CButton,
  CFormLabel,
} from '@coreui/react';

const InventoryFilter = ({ onFilterChange, currentFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handleClearFilters = () => {
    onFilterChange({
      name: '',
      type: '',
      status: '',
      expiration_date_start: '',
      expiration_date_end: '',
    });
  };

  return (
    <CForm className="mb-4">
      <CRow className="g-3 align-items-end">
        <CCol md={3}>
          <CFormLabel htmlFor="filterName">Item Name</CFormLabel>
          <CFormInput
            type="text"
            id="filterName"
            name="name"
            placeholder="Search by name"
            value={currentFilters.name}
            onChange={handleInputChange}
          />
        </CCol>
        <CCol md={2}>
          <CFormLabel htmlFor="filterType">Type</CFormLabel>
          <CFormSelect
            id="filterType"
            name="type"
            value={currentFilters.type}
            onChange={handleInputChange}
          >
            <option value="">Select Type</option>
            <option value="Ingredient">Ingredient</option>
            <option value="Utensil">Utensil</option>
            <option value="Equipment">Equipment</option>
            {/* Add more types based on your database or needs */}
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CFormLabel htmlFor="filterStatus">Status</CFormLabel>
          <CFormSelect
            id="filterStatus"
            name="status"
            value={currentFilters.status}
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="In Use">In Use</option>
            {/* Add more statuses based on your database or needs */}
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CFormLabel htmlFor="filterExpirationDateStart">Expires From</CFormLabel>
          <CFormInput
            type="date"
            id="filterExpirationDateStart"
            name="expiration_date_start"
            value={currentFilters.expiration_date_start}
            onChange={handleInputChange}
          />
        </CCol>
        <CCol md={2}>
          <CFormLabel htmlFor="filterExpirationDateEnd">Expires To</CFormLabel>
          <CFormInput
            type="date"
            id="filterExpirationDateEnd"
            name="expiration_date_end"
            value={currentFilters.expiration_date_end}
            onChange={handleInputChange}
          />
        </CCol>
        <CCol md={1} className="d-flex align-items-end">
          <CButton color="secondary" onClick={handleClearFilters} className="w-100">
            Clear
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  );
};

export default InventoryFilter;