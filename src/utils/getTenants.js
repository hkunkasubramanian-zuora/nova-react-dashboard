import axios from "axios";

async function getTenants() {

    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    };

    var result = await axios.get('http://localhost:5000/internal/neo-engine/nova')
        .then(res => {
            console.log('data fetched');
            return res.data;
        })
        .catch(err => {
            console.log(err);
            return [];
        })

    return result;
    /*

    return [{
        "tenantId": "7fcyoce",
        "schemaName": "REVPRO_NEO_ENGINE_APP_DEV1",
        "enabled": true
    },
        {
            "tenantId": "6up2tmz",
            "schemaName": "REVPRO_NEO_ENGINE_APP_DEV2",
            "enabled": false
        }];

     */

}

export default getTenants;