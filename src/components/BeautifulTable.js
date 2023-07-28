import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Check, Clear } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

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

const rows = [
    { id: 1, schema_name: 'REVPRO_MASTERCLASS_S01', tenant_id: '2kj234', nova_enabled: true, transfer_accounting: true, netting: true},
    { id: 2, schema_name: 'REVPRO_MASTERCLASS_S02', tenant_id: 'wejkf3', nova_enabled: false, transfer_accounting: false, netting: true }
    // Add other rows as needed
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



function BeautifulTable() {
    return (
        <RootContainer>
            <Header>Tenant details</Header>
            <DataGrid
                rows={rows}
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


export default BeautifulTable;
