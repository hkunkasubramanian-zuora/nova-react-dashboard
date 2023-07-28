import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Check, Clear } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import {useEffect, useState} from "react";
import getTenants from "../utils/getTenants";

const columns = [
    { field: 'schema_name', headerName: 'Schema Name', width: 400 },
    { field: 'tenant_id', headerName: 'Tenant ID', width: 150 },
    {
        field: 'nova_enabled',
        headerName: 'Nova Enabled',
        width: 120,
        renderCell: (params) => (
            params.value ? <Check style={{ color: 'green' }} /> : <Clear style={{ color: 'red' }} />
        ),
    }
];

const jobs = ['Transfer Accounting', 'Netting'];

for (let job of jobs) {
    let fieldName = job.split(' ').join('_').toLowerCase();
    columns.push({
        field: fieldName, headerName: job, width: 150,
        renderCell: (params) => (
            params.value ? <Check style={{ color: 'green' }} /> : <Clear style={{ color: 'red' }} />
        ),
    });
}




async function populateTenantDetails() {

    const inputTenants = await getTenants();

    const tenants = [];

    for (var i = 0; i < inputTenants.length; i++) {
        var tenant = inputTenants[i];
        tenants.push({id: i+1, schema_name: tenant.schemaName, tenant_id: tenant.tenantId, nova_enabled: tenant.enabled});
    }

    return tenants;
}


function TenantList() {
    const [tenantDetails, setTenantDetails] = useState([]);


    useEffect(() => {
        (async () => {
            var details = await populateTenantDetails();
            setTenantDetails(details);
        })();

    }, []);


    return (
        <RootContainer>
            <Header>Tenant details</Header>
            <DataGrid
                rows={tenantDetails}
                columns={columns}
                pageSize={5}
                checkboxSelection
                components={{
                    Toolbar: () => (
                        <ToolbarContainer>
                            <ToolbarTitle>Options</ToolbarTitle>
                            <GridToolbar.ColumnsButton />
                            <GridToolbar.FilterButton />
                            <GridToolbar.DensitySelector />
                            <GridToolbar.ExportButton />
                        </ToolbarContainer>
                    ),
                }}
                autoHeight // Enable auto height for smooth resizing
                getCellClassName={(params) =>
                    params.colDef.field === 'enabled' ? (params.value ? 'enabled' : 'disabled') : ''
                }
            />
        </RootContainer>
    );
}


const RootContainer = styled('div')({
    backgroundColor: '#f8f8f8',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
});

const Header = styled('div')({
    backgroundColor: '#3f51b5',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '20px',
    padding: '16px',
    textAlign: 'center',
});

const ToolbarContainer = styled(GridToolbar)({
    backgroundColor: '#f8f8f8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
    '& .MuiSvgIcon-root': {
        color: '#3f51b5',
    },
});

const ToolbarTitle = styled('div')({
    color: '#3f51b5',
    fontSize: '18px',
    fontWeight: 'bold',
});


export default TenantList;
