// src/views/inventory/InventoryTable.js

import React from 'react';
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';

const InventoryTable = ({ data }) => {
  return (
    <CTable hover responsive align="middle" className="mb-0 border">
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell className="text-center">ID</CTableHeaderCell>
          <CTableHeaderCell>Name</CTableHeaderCell>
          <CTableHeaderCell>Type</CTableHeaderCell>
          <CTableHeaderCell>Description</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>Expiration Date</CTableHeaderCell>
          <CTableHeaderCell>Supplier</CTableHeaderCell>
          <CTableHeaderCell className="text-center">Location</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.length === 0 ? (
          <CTableRow>
            <CTableDataCell colSpan={8} className="text-center">
              No results found.
            </CTableDataCell>
          </CTableRow>
        ) : (
          data.map((item) => (
            <CTableRow v-for="item in tableItems" key={item.id}>
              <CTableDataCell className="text-center">
                <div>{item.id}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.name}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.type}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.description}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.status}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.expiration_date || 'N/A'}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.supplier}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.location}</div>
              </CTableDataCell>
            </CTableRow>
          ))
        )}
      </CTableBody>
    </CTable>
  );
};

export default InventoryTable;