// src/views/inventory/InventoryList.js

import React, { useState, useEffect } from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CAlert,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilPencil, cilTrash, cilCheckCircle } from '@coreui/icons';
import InventoryFilter from './InventoryFilter';

// Mock inventory data (for now)
const mockInventoryData = [
  {
    id: 1,
    name: 'Wheat Flour',
    type: 'Ingredient',
    description: 'Flour for baking',
    current_stock: 60,
    max_stock: 100,
    min_stock: 10,
    unit_id: 1,
    expiration_date: '2025-12-31',
    supplier: 'Supplier A',
    status: 'In Stock',
    last_maintenance_date: '2025-06-01',
    next_maintenance_date: '2025-07-01',
    location: 'Warehouse 1',
  },
  {
    id: 2,
    name: 'White Sugar',
    type: 'Ingredient',
    description: 'Refined sugar',
    current_stock: 50,
    max_stock: 80,
    min_stock: 5,
    unit_id: 1,
    expiration_date: '2026-01-15',
    supplier: 'Supplier B',
    status: 'In Stock',
    last_maintenance_date: '2025-06-05',
    next_maintenance_date: '2025-07-05',
    location: 'Warehouse 1',
  },
  {
    id: 3,
    name: 'Chef Knife',
    type: 'Utensil',
    description: 'Stainless steel knife',
    current_stock: 15,
    max_stock: 20,
    min_stock: 2,
    unit_id: 2, // Puede ser N/A o un valor válido, pero no requerido para Utensil
    expiration_date: null,
    supplier: 'Tools Inc.',
    status: 'In Use',
    last_maintenance_date: '2025-05-10',
    next_maintenance_date: '2025-11-10',
    location: 'Main Kitchen',
  },
  {
    id: 4,
    name: 'Fresh Milk',
    type: 'Ingredient',
    description: 'Pasteurized whole milk',
    current_stock: 20,
    max_stock: 50,
    min_stock: 8,
    unit_id: 1,
    expiration_date: '2025-07-10',
    supplier: 'Dairy Co.',
    status: 'Low Stock',
    last_maintenance_date: '2025-07-01',
    next_maintenance_date: '2025-07-08',
    location: 'Refrigerator',
  },
  {
    id: 5,
    name: 'Extra Virgin Olive Oil',
    type: 'Ingredient',
    description: 'Olive oil for cooking',
    current_stock: 25,
    max_stock: 30,
    min_stock: 5,
    unit_id: 3,
    expiration_date: '2025-08-20',
    supplier: 'Olympus Ltd.',
    status: 'In Stock',
    last_maintenance_date: '2025-06-15',
    next_maintenance_date: '2025-08-15',
    location: 'Warehouse 2',
  },
  {
    id: 6,
    name: 'Plum Tomatoes',
    type: 'Ingredient',
    description: 'Fresh tomatoes',
    current_stock: 10,
    max_stock: 40,
    min_stock: 5,
    unit_id: 1,
    expiration_date: '2025-07-05',
    supplier: 'Farm Produce',
    status: 'Low Stock',
    last_maintenance_date: '2025-07-01',
    next_maintenance_date: '2025-07-04',
    location: 'Refrigerator',
  },
  {
    id: 7,
    name: 'Mixing Bowl',
    type: 'Utensil',
    description: 'Large stainless steel bowl',
    current_stock: 8,
    max_stock: 10,
    min_stock: 2,
    unit_id: 2,
    expiration_date: null,
    supplier: 'Kitchen Supplies',
    status: 'In Stock',
    last_maintenance_date: '2025-06-10',
    next_maintenance_date: '2025-12-10',
    location: 'Main Kitchen',
  },
  {
    id: 8,
    name: 'Measuring Jug',
    type: 'Utensil',
    description: 'Plastic measuring jug',
    current_stock: 5,
    max_stock: 10,
    min_stock: 1,
    unit_id: 2,
    expiration_date: null,
    supplier: 'Kitchen Supplies',
    status: 'In Stock',
    last_maintenance_date: '2025-06-12',
    next_maintenance_date: '2025-12-12',
    location: 'Main Kitchen',
  },
  {
    id: 9,
    name: 'Olive Oil Dispenser',
    type: 'Equipment',
    description: 'Glass dispenser for olive oil',
    current_stock: 3,
    max_stock: 5,
    min_stock: 1,
    unit_id: 2,
    expiration_date: null,
    supplier: 'Bar Tools',
    status: 'In Stock',
    last_maintenance_date: '2025-06-20',
    next_maintenance_date: '2025-12-20',
    location: 'Bar',
  },
];

// Opciones de unidades de medida (mock, reemplaza por tu lista real si la tienes)
const unitOptions = [
  { label: 'kg', value: 1 },
  { label: 'pcs', value: 2 },
  { label: 'L', value: 3 },
  // ...agrega más si es necesario...
];

const bgDarkBlue = 'linear-gradient(135deg, #0a2342 80%, #193660 100%)';
const cardBlue = 'rgba(10, 35, 66, 0.95)';
const accentBlue = '#00aeff';

const InventoryTable = ({ data, onEdit, onDelete }) => (
  <div style={{ borderRadius: 12, overflow: 'hidden', marginTop: 16 }}>
    <table style={{
      width: '100%',
      background: 'rgba(0,0,0,0.2)',
      color: '#fff',
      borderCollapse: 'separate',
      borderSpacing: 0,
      borderRadius: 12,
      fontSize: 15,
    }}>
      <thead style={{ background: '#11284b' }}>
        <tr>
          <th style={{ color: accentBlue, padding: 8 }}>Name</th>
          <th style={{ color: accentBlue, padding: 8 }}>Type</th>
          <th style={{ color: accentBlue, padding: 8 }}>Description</th>
          <th style={{ color: accentBlue, padding: 8 }}>Current Stock</th>
          <th style={{ color: accentBlue, padding: 8 }}>Min Stock</th>
          <th style={{ color: accentBlue, padding: 8 }}>Unit</th>
          <th style={{ color: accentBlue, padding: 8 }}>Expiration</th>
          <th style={{ color: accentBlue, padding: 8 }}>Status</th>
          <th style={{ color: accentBlue, padding: 8 }}>Last Maint.</th>
          <th style={{ color: accentBlue, padding: 8 }}>Next Maint.</th>
          <th style={{ color: accentBlue, padding: 8 }}>Location</th>
          <th style={{ color: accentBlue, padding: 8, textAlign: 'center' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={item.id} style={{
            background: idx % 2 === 0 ? 'rgba(0,174,255,0.07)' : 'rgba(10,35,66,0.7)',
          }}>
            <td style={{ padding: 8 }}>{item.name}</td>
            <td style={{ padding: 8 }}>{item.type}</td>
            <td style={{ padding: 8 }}>{item.description}</td>
            <td style={{ padding: 8 }}>{item.current_stock}</td>
            <td style={{ padding: 8 }}>{item.min_stock}</td>
            <td style={{ padding: 8 }}>
              {unitOptions.find(u => u.value === item.unit_id)?.label || '-'}
            </td>
            <td style={{ padding: 8 }}>{item.expiration_date || '-'}</td>
            <td style={{ padding: 8 }}>{item.status}</td>
            <td style={{ padding: 8 }}>{item.last_maintenance_date || '-'}</td>
            <td style={{ padding: 8 }}>{item.next_maintenance_date || '-'}</td>
            <td style={{ padding: 8 }}>{item.location}</td>
            <td style={{ padding: 8, textAlign: 'center' }}>
              <CButton size="sm" color="warning" variant="outline" className="me-2"
                style={{ borderRadius: 16, borderColor: accentBlue, color: accentBlue }}
                onClick={() => onEdit(item, idx)}>
                <CIcon icon={cilPencil} />
              </CButton>
              <CButton size="sm" color="danger" variant="outline"
                style={{ borderRadius: 16, borderColor: '#e74c3c', color: '#e74c3c' }}
                onClick={() => onDelete(idx)}>
                <CIcon icon={cilTrash} />
              </CButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InventoryList = () => {
  const [filters, setFilters] = useState({
    name: '',
    type: '',
    status: '',
    expiration_date_start: '',
    expiration_date_end: '',
  });
  const [inventoryData, setInventoryData] = useState(mockInventoryData);
  const [filteredInventory, setFilteredInventory] = useState(mockInventoryData);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentItem, setCurrentItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [modalErrors, setModalErrors] = useState({});

  // Filtering logic
  useEffect(() => {
    // Frontend filtering logic (simulation, this would be done in the backend)
    let tempInventory = [...inventoryData]; // Use current inventoryData

    if (filters.name) {
      tempInventory = tempInventory.filter((item) =>
        item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.type) {
      tempInventory = tempInventory.filter((item) => item.type === filters.type);
    }
    if (filters.status) {
      tempInventory = tempInventory.filter((item) => item.status === filters.status);
    }

    if (filters.expiration_date_start && filters.expiration_date_end) {
      tempInventory = tempInventory.filter((item) => {
        if (!item.expiration_date) return false;
        const itemExpDate = new Date(item.expiration_date);
        const startDate = new Date(filters.expiration_date_start);
        const endDate = new Date(filters.expiration_date_end);
        // Set hours to 0 for accurate date comparison
        startDate.setHours(0,0,0,0);
        endDate.setHours(23,59,59,999); // End of day
        return itemExpDate >= startDate && itemExpDate <= endDate;
      });
    } else if (filters.expiration_date_start) {
      tempInventory = tempInventory.filter((item) => {
        if (!item.expiration_date) return false;
        const itemExpDate = new Date(item.expiration_date);
        const startDate = new Date(filters.expiration_date_start);
        startDate.setHours(0,0,0,0);
        return itemExpDate >= startDate;
      });
    } else if (filters.expiration_date_end) {
      tempInventory = tempInventory.filter((item) => {
        if (!item.expiration_date) return false;
        const itemExpDate = new Date(item.expiration_date);
        const endDate = new Date(filters.expiration_date_end);
        endDate.setHours(23,59,59,999);
        return itemExpDate <= endDate;
      });
    }

    setFilteredInventory(tempInventory);
  }, [filters, inventoryData]); // Add inventoryData to dependencies to re-filter when new items are added

  // --- VALIDATION LOGIC ---
  const validateModal = (item) => {
    const errors = {};
    // Required fields
    if (!item.name) errors.name = 'Name is required.';
    if (!item.type) errors.type = 'Type is required.';
    if (item.current_stock === '' || item.current_stock === null) errors.current_stock = 'Current Stock is required.';
    if (item.max_stock === '' || item.max_stock === null) errors.max_stock = 'Max Stock is required.';
    if (item.min_stock === '' || item.min_stock === null) errors.min_stock = 'Min Stock is required.';
    if (!item.status) errors.status = 'Status is required.';
    if (!item.location) errors.location = 'Location is required.';

    // Numeric validations
    if (item.current_stock !== '' && (!Number.isInteger(Number(item.current_stock)) || Number(item.current_stock) < 0))
      errors.current_stock = 'Current Stock must be a non-negative integer.';
    if (item.max_stock !== '' && (!Number.isInteger(Number(item.max_stock)) || Number(item.max_stock) <= 0))
      errors.max_stock = 'Max Stock must be a positive integer.';
    if (item.min_stock !== '' && (!Number.isInteger(Number(item.min_stock)) || Number(item.min_stock) < 0))
      errors.min_stock = 'Min Stock must be a non-negative integer.';
    if (item.current_stock !== '' && item.max_stock !== '' && Number(item.current_stock) > Number(item.max_stock))
      errors.current_stock = 'Current Stock cannot exceed Max Stock.';
    if (item.min_stock !== '' && item.max_stock !== '' && Number(item.min_stock) > Number(item.max_stock))
      errors.min_stock = 'Min Stock cannot exceed Max Stock.';

    // Unit validation
    if (item.type === 'Ingredient' && !item.unit_id)
      errors.unit_id = 'Unit is required for ingredients.';

    // Date validations
    const today = new Date().toISOString().split('T')[0];
    if (item.expiration_date && item.expiration_date < today)
      errors.expiration_date = 'Expiration date cannot be in the past.';
    if (item.last_maintenance_date && item.last_maintenance_date > today)
      errors.last_maintenance_date = 'Last maintenance cannot be in the future.';
    if (item.next_maintenance_date) {
      if (item.next_maintenance_date < today)
        errors.next_maintenance_date = 'Next maintenance cannot be in the past.';
      if (item.last_maintenance_date && item.next_maintenance_date < item.last_maintenance_date)
        errors.next_maintenance_date = 'Next maintenance must be after last maintenance.';
    }
    return errors;
  };

  // --- MODAL HANDLERS MODIFIED ---
  const openAddModal = () => {
    setModalMode('add');
    setCurrentItem({
      name: '', type: '', description: '', current_stock: '', max_stock: '', min_stock: '',
      unit_id: '', expiration_date: '', status: '', last_maintenance_date: '',
      next_maintenance_date: '', location: ''
    });
    setModalErrors({});
    setShowModal(true);
  };
  const openEditModal = (item, idx) => {
    setModalMode('edit');
    setCurrentItem({ ...item, idx });
    setModalErrors({});
    setShowModal(true);
  };

  const handleSave = () => {
    const errors = validateModal(currentItem);
    setModalErrors(errors);
    if (Object.keys(errors).length > 0) return;
    if (modalMode === 'add') {
      const newId = Math.max(...inventoryData.map(item => item.id)) + 1;
      setInventoryData(prev => [...prev, { ...currentItem, id: newId }]);
      setAlert({ show: true, type: 'success', message: 'Item added successfully.' });
    } else {
      setInventoryData(prev => {
        const updated = [...prev];
        updated[currentItem.idx] = { ...currentItem };
        delete updated[currentItem.idx].idx;
        return updated;
      });
      setAlert({ show: true, type: 'success', message: 'Item updated successfully.' });
    }
    setShowModal(false);
    setCurrentItem(null);
    setModalErrors({});
  };
  const openDeleteModal = (idx) => {
    setDeleteIdx(idx);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    setInventoryData(prev => prev.filter((_, i) => i !== deleteIdx));
    setShowDeleteModal(false);
    setDeleteIdx(null);
    setAlert({ show: true, type: 'danger', message: 'Item deleted.' });
  };

  return (
    <CContainer fluid>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4" style={{
            background: cardBlue,
            borderRadius: 16,
            boxShadow: '0 2px 16px 0 #00aeff22',
            color: '#fff',
            border: 'none',
          }}>
            <CCardHeader className="d-flex justify-content-between align-items-center"
              style={{
                background: 'transparent',
                borderBottom: 'none',
                color: accentBlue,
                fontWeight: 'bold',
                fontSize: 22,
                letterSpacing: 1,
              }}>
              <span>Inventory Management</span>
              <CButton color="info" variant="outline" style={{
                borderRadius: 20,
                color: accentBlue,
                borderColor: accentBlue,
                fontWeight: 'bold',
              }} onClick={openAddModal}>
                <CIcon icon={cilPlus} className="me-1" /> Add Item
              </CButton>
            </CCardHeader>
            <CCardBody>
              <InventoryFilter onFilterChange={setFilters} currentFilters={filters} />
              <InventoryTable
                data={filteredInventory}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ALERT */}
      {alert.show && (
        <CAlert color={alert.type} dismissible onClose={() => setAlert({ show: false })} style={{
          marginTop: 18,
          background: alert.type === 'danger' ? '#2c0b0e' : '#0b2c1e',
          color: alert.type === 'danger' ? '#ff6b6b' : '#00ffb3',
          border: 'none',
          borderRadius: 12,
        }}>
          {alert.message}
        </CAlert>
      )}

      {/* ADD/EDIT MODAL */}
      <CModal visible={showModal} onClose={() => setShowModal(false)} alignment="center">
        <CModalHeader closeButton style={{
          background: cardBlue,
          color: accentBlue,
          borderBottom: '1px solid #193660',
        }}>
          {modalMode === 'add' ? 'Add Item' : 'Edit Item'}
        </CModalHeader>
        <CModalBody style={{ background: '#11284b', color: '#fff' }}>
          <form>
            <CFormInput
              label="Name"
              value={currentItem?.name || ''}
              onChange={e => setCurrentItem(it => ({ ...it, name: e.target.value }))}
              required
              className="mb-2"
              style={{ background: '#0a2342', color: '#fff', borderColor: accentBlue }}
              invalid={!!modalErrors.name}
            />
            {modalErrors.name && <div className="invalid-feedback d-block">{modalErrors.name}</div>}
            <CFormSelect
              label="Type"
              value={currentItem?.type || ''}
              options={[
                { label: 'Select type', value: '' },
                { label: 'Ingredient', value: 'Ingredient' },
                { label: 'Utensil', value: 'Utensil' },
                { label: 'Equipment', value: 'Equipment' },
              ]}
              onChange={e => setCurrentItem(it => ({ ...it, type: e.target.value, unit_id: '' }))}
              required
              className="mb-2"
              style={{ background: '#0a2342', color: '#fff', borderColor: accentBlue }}
              invalid={!!modalErrors.type}
            />
            {modalErrors.type && <div className="invalid-feedback d-block">{modalErrors.type}</div>}
            <CFormTextarea
              label="Description"
              value={currentItem?.description || ''}
              onChange={e => setCurrentItem(it => ({ ...it, description: e.target.value }))}
              rows={2}
              className="mb-2"
              style={{ background: '#0a2342', color: '#fff', borderColor: accentBlue }}
            />
            <CFormInput
              label="Current Stock"
              type="number"
              value={currentItem?.current_stock || ''}
              onChange={e => setCurrentItem(it => ({ ...it, current_stock: e.target.value }))}
              required
              className="mb-2"
              style={{ background: '#0a2342', color: '#fff', borderColor: accentBlue }}
              invalid={!!modalErrors.current_stock}
            />
            {modalErrors.current_stock && <div className="invalid-feedback d-block">{modalErrors.current_stock}</div>}
            <CFormInput
              label="Max Stock"
              type="number"
              value={currentItem?.max_stock || ''}
              onChange={e => setCurrentItem(it => ({ ...it, max_stock: e.target.value }))}
              required
              className="mb-2"
              style={{ background: '#0a2342', color: '#fff', borderColor: accentBlue }}
              invalid={!!modalErrors.max_stock}
            />
            {modalErrors.max_stock && <div className="invalid-feedback d-block">{modalErrors.max_stock}</div>}
            <CFormInput
              label="Min Stock"
              type="number"
              value={currentItem?.min_stock || ''}
              onChange={e => setCurrentItem(it => ({ ...it, min_stock: e.target.value }))}
              required
              className="mb-2"
              style={{ background: '#0a2342', color: '#fff', borderColor: accentBlue }}
              invalid={!!modalErrors.min_stock}
            />
            {modalErrors.min_stock && <div className="invalid-feedback d-block">{modalErrors.min_stock}</div>}
            <CFormSelect
              label="Unit"
              value={currentItem?.unit_id || ''}
              options={[
                { label: 'Select unit', value: '' },
                ...unitOptions
              ]}
              onChange={e => setCurrentItem(it => ({ ...it, unit_id: Number(e.target.value) }))}
              required={currentItem?.type === 'Ingredient'}
              className="mb-2"
              style={{ background: '#0a2342', color: '#fff', borderColor: accentBlue }}
              invalid={!!modalErrors.unit_id}
              disabled={currentItem?.type !== 'Ingredient'}
            />
            {modalErrors.unit_id && <div className="invalid-feedback d-block">{modalErrors.unit_id}</div>}
            <CFormInput
              label="Expiration Date"
              type="date"
              value={currentItem?.expiration_date || ''}
              onChange={e => setCurrentItem(it => ({ ...it, expiration_date: e.target.value }))}
              className="mb-2"
              style={{ background: '#0a2342', color: '#fff', borderColor: accentBlue }}
              invalid={!!modalErrors.expiration_date}
            />
            {modalErrors.expiration_date && <div className="invalid-feedback d-block">{modalErrors.expiration_date}</div>}
            <CFormSelect
              label="Status"
              value={currentItem?.status || ''}
              options={[
                { label: 'Select status', value: '' },
                { label: 'In Stock', value: 'In Stock' },
                { label: 'Low Stock', value: 'Low Stock' },
                { label: 'Out of Stock', value: 'Out of Stock' },
                { label: 'In Use', value: 'In Use' },
              ]}
              onChange={e => setCurrentItem(it => ({ ...it, status: e.target.value }))}
              required
              className="mb-2"
              style={{ background: '#0a2342', color: '#fff', borderColor: accentBlue }}
              invalid={!!modalErrors.status}
            />
            {modalErrors.status && <div className="invalid-feedback d-block">{modalErrors.status}</div>}
            <CFormInput
              label="Last Maintenance Date"
              type="date"
              value={currentItem?.last_maintenance_date || ''}
              onChange={e => setCurrentItem(it => ({ ...it, last_maintenance_date: e.target.value }))}
              className="mb-2"
              style={{ background: '#0a2342', color: '#fff', borderColor: accentBlue }}
              invalid={!!modalErrors.last_maintenance_date}
            />
            {modalErrors.last_maintenance_date && <div className="invalid-feedback d-block">{modalErrors.last_maintenance_date}</div>}
            <CFormInput
              label="Next Maintenance Date"
              type="date"
              value={currentItem?.next_maintenance_date || ''}
              onChange={e => setCurrentItem(it => ({ ...it, next_maintenance_date: e.target.value }))}
              className="mb-2"
              style={{ background: '#0a2342', color: '#fff', borderColor: accentBlue }}
              invalid={!!modalErrors.next_maintenance_date}
            />
            {modalErrors.next_maintenance_date && <div className="invalid-feedback d-block">{modalErrors.next_maintenance_date}</div>}
            <CFormInput
              label="Location"
              value={currentItem?.location || ''}
              onChange={e => setCurrentItem(it => ({ ...it, location: e.target.value }))}
              className="mb-2"
              style={{ background: '#0a2342', color: '#fff', borderColor: accentBlue }}
              invalid={!!modalErrors.location}
            />
            {modalErrors.location && <div className="invalid-feedback d-block">{modalErrors.location}</div>}
          </form>
        </CModalBody>
        <CModalFooter style={{ background: '#11284b' }}>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </CButton>
          <CButton color="success" onClick={handleSave}>
            <CIcon icon={cilCheckCircle} className="me-1" /> Save
          </CButton>
        </CModalFooter>
      </CModal>

      {/* DELETE CONFIRM MODAL */}
      <CModal visible={showDeleteModal} onClose={() => setShowDeleteModal(false)} alignment="center">
        <CModalHeader closeButton style={{
          background: cardBlue,
          color: '#e74c3c',
          borderBottom: '1px solid #193660',
        }}>
          Confirm Delete
        </CModalHeader>
        <CModalBody style={{ background: '#11284b', color: '#fff' }}>
          <div style={{ fontWeight: 'bold', color: '#e74c3c' }}>
            Are you sure you want to delete this item?
          </div>
        </CModalBody>
        <CModalFooter style={{ background: '#11284b' }}>
          <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={confirmDelete}>
            <CIcon icon={cilTrash} className="me-1" /> Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default InventoryList;