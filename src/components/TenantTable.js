import {DataGrid} from "@mui/x-data-grid";

function TenantTable() {

    const columns = [
        { field: 'schemaName', headerName: 'Schema name', width: 300 },
        { field: 'tenantId', headerName: 'Tenant ID', width: 130 },
        { field: 'novaEnabled', headerName: 'NOVA enabled', width: 130 }
    ];

    const rows = [
        { id: 1, schemaName: 'REVPRO_MASTERCLASS_P01', tenantId: '234jv83', novaEnabled: 'TRUE' },
        { id: 2, schemaName: 'REVPRO_MASTERCLASS_P02', tenantId: '2334jsd', novaEnabled: 'FALSE' }
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}

export default TenantTable;