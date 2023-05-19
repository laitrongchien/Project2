import { Box } from '@mui/material';
import CategoryTable from './InventoryTable';
import PageHeader from '../../components/PageHeader';

function AllInventories() {
  return (
    <Box>
      <PageHeader name="All Inventories" destination="/inventory/create" />
      <CategoryTable />
    </Box>
  );
}

export default AllInventories;
