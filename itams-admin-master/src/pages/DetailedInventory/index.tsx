import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getAssetToInventoryByInventoryId } from '../../api/inventory';
import { getAllStatuses } from '../../api/status';
import Loading from '../../components/Loading';
import PageHeader from '../../components/PageHeader';
import { AssetToInventory, Status } from '../../interface/interface';
import DetailedInventoryTable from './DetailedInventoryTable';

function DetailedInventory() {
  const { inventoryId } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [initRows, setInitRows] = React.useState<AssetToInventory[]>([]);
  const [statuses, setStatuses] = React.useState<Status[]>([]);
  const getData = async () => {
    setIsLoading(true);
    try {
      const asset = await getAssetToInventoryByInventoryId(Number(inventoryId));
      const statuses = await getAllStatuses();
      setInitRows(asset);
      setStatuses(statuses);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <Box>
      <PageHeader name="View detailed inventory" canGoBack />
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <DetailedInventoryTable
          id={inventoryId}
          initData={initRows}
          getData={getData}
          statuses={statuses}
        />
      )}
    </Box>
  );
}

export default DetailedInventory;
