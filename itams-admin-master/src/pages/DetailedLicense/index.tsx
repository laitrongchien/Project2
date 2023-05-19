import * as React from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import LicenseInfo from './LicenseInfo';
import LicenseToAssetTable from './LicenseToAssetTable';
import LicenseHistoryTable from './LicenseHistoryTable';

function DetailedLicense() {
  const { licenseId } = useParams();
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box>
      <PageHeader name={`View license ${licenseId}`} canGoBack />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              backgroundColor: '#FFF',
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Info"
                value="1"
                sx={{ textTransform: 'capitalize' }}
              />
              <Tab
                label="Assets"
                value="2"
                sx={{ textTransform: 'capitalize' }}
              />
              <Tab
                label="History"
                value="3"
                sx={{ textTransform: 'capitalize' }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <LicenseInfo licenseId={Number(licenseId)} />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <LicenseToAssetTable licenseId={Number(licenseId)} />
          </TabPanel>
          <TabPanel value="3" sx={{ padding: 0 }}>
            <LicenseHistoryTable
              licenseId={Number(licenseId)}
              withDeleted={true}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default DetailedLicense;
