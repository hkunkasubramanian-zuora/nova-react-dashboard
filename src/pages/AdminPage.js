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

    const onSubmit = async (query) => {
        setLoaded(false);
        console.log("Query output2343: ", query);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const output = await axios.post('http://localhost:5000/internal/neo-engine/query', {
            'tenantId': currentTenantId,
            'query': query
        }, config);
        setQueryOutput(output.data);
        setLoaded(true);
    }

    useEffect(() => {

        (async () => {
            const tenants = await getTenants();
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
        Select tenant ID: <SchemaSelector schemas={tenantList} handleSchemaChange={handleSchemaChange} />
        <SqlInputBox onSubmit={onSubmit} />
        {queryOutput != null ? <QueryOutput queryOutput={queryOutput} /> : null}
        {/*{currentTenantId != null ? <TenantData tenantInfo={{enabled: true, tenantId: currentTenantId}} /> : null}*/}
    </div>;

}

const QueryOutput = ({queryOutput}) => {


    const columns = [];

    const columnList = queryOutput['columnInfoList'];

    if (columnList == null) {
        return <div>Failed</div>;
    }

    for(var i = 0; i < columnList.length; i++) {
        var column = columnList[i];
        columns.push({field: column['columnName'].toLowerCase(), headerName: column['displayName'], width: 400});
    }

    console.log("Query output2343 column: ", columns);

    const rows = [];
    const rowList = queryOutput['recordDataList'];

    var counter = 0;

    for (var i = 0; i < rowList.length; i++) {
        var rowData = rowList[i];

        const outputObject = {};

        rowData.forEach(columnObject => {
            outputObject[columnObject['columnName'].toLowerCase()] = columnObject['columnValue'];
        });

        if (outputObject['id'] === undefined) {
            outputObject['id'] = counter;
            counter++;
        }

        rows.push(outputObject);
    }

    console.log("Query output2343 rows: ", rows);

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