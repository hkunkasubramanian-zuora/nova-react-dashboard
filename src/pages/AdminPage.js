import SqlInputBox from "../components/SqlInputBox";
import {MenuItem, Select} from "@mui/material";
import {useEffect, useState} from "react";
import getTenants from "../utils/getTenants";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {styled} from "@mui/material/styles";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import TenantData from "../components/TenantData";

function AdminPage() {

    const [currentTenantId, setCurrentTenantId] = useState(null);
    const [tenantList, setTenantList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [queryOutput, setQueryOutput] = useState(null);

    const handleSchemaChange = (event) => {
        setCurrentTenantId(event.target.value);
    }

    const onSubmit = async ({query}) => {
        setLoaded(false);
        const output = await axios.post('http://localhost:5000/internal/neo-engine/query', {
            'tenantId': currentTenantId,
            'query': query
        });
        setQueryOutput(output.data);
        setLoaded(true);
    }

    useEffect(() => {

        (async () => {
            const tenants = await getTenants();
            console.log(tenants);
            const schemas = [];
            for (var i = 0; i < tenants.length; i++) {
                schemas.push(tenants[i].tenantId);
            }

            setTenantList(schemas);
            setLoaded(true);
        })();

    }, []);

    if (!loaded) {
        return <LoadingScreen />;
    }

    return <div>
        Select SCHEMA: <SchemaSelector schemas={tenantList} handleSchemaChange={handleSchemaChange} />
        <SqlInputBox onSubmit={onSubmit} />
        {queryOutput != null ? <QueryOutput queryOutput={queryOutput} /> : null}
        {currentTenantId != null ? <TenantData tenantInfo={{enabled: true, tenantId: currentTenantId}} /> : null}
    </div>;

}

const QueryOutput = ({queryOutput}) => {

    console.log(queryOutput);
    const columns = [];

    const columnList = queryOutput['columnInfoList'];

    if (columnList == null) {
        return <div>Failed</div>;
    }

    for(var i = 0; i < columnList.length; i++) {
        var column = columnList[i];
        columns.push(column['displayName']);
    }

    const rows = [];
    const rowList = queryOutput['recordDataList'];

    for (var i = 0; i < rowList.length; i++) {
        var row = rowList[i];
        rows.push(row['columnValue']);
    }


    return (
        <RootContainer>
            <Header>Query output</Header>
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



function SchemaSelector({schemas, handleSchemaChange}) {

    return <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Schema"
        onChange={handleSchemaChange}
    >
        {schemas.map((schema) => (
            <MenuItem value={schema}>{schema}</MenuItem>
        ))}
    </Select>;
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



export default AdminPage;