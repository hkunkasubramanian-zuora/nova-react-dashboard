import {Check, Clear} from "@mui/icons-material";

function EnabledOrNot(params) {
    console.log(params);
    return params.value ? <Check style={{ color: 'green' }} /> : <Clear style={{ color: 'red' }} />;
}

export default EnabledOrNot;
