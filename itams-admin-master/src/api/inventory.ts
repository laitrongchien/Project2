import { NewInventory, UpdateAssetToInventory } from '../interface/interface';
import axios from './axios';

export const getAllInventories = async () => {
  const data = await axios.get('/inventory/all');
  return data.data;
};

export const getInventoryById = async (id: number | string) => {
  const response = await axios.get('/inventory/get-inventory-by-id', {
    data: { id },
  });
  return response.data;
};

export const createNewInventory = async (inventory: NewInventory) => {
  const response = await axios.post('/inventory/create-inventory', inventory);
  return response.data;
};

export const updateInventory = async (
  id: number | string,
  inventory: NewInventory,
) => {
  const response = await axios.put('/inventory/update-inventory', {
    id: id,
    ...inventory,
  });
  return response.data;
};

export const getAssetToInventoryByInventoryId = async (id: number | string) => {
  const response = await axios.get('/inventory/get-asset-to-inventory', {
    params: { id: id },
  });
  return response.data;
};

export const updateAssetToInventory = async (
  id: number | string,
  toUpdate: UpdateAssetToInventory,
) => {
  const response = await axios.put('/inventory/update-asset-to-inventory', {
    id: id,
    ...toUpdate,
  });
  return response.data;
};
