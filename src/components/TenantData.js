import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Button } from '@mui/material';

const TenantData = ({ tenantInfo }) => {
    const [isEnabled, setIsEnabled] = useState(tenantInfo.enabled);

    const handleToggleStatus = () => {
        setIsEnabled((prevEnabled) => !prevEnabled);
        // Here you can call an API to update the tenant's status in the backend.
        // For this example, we'll simply update the state locally.
    };

    return (
        <Card>
            <CardHeader title={`Tenant ID: ${tenantInfo.tenantId}`} />
            <CardContent>
                <Typography variant="body1">Status: {isEnabled ? 'Enabled' : 'Disabled'}</Typography>
                <Button variant="contained" color="primary" onClick={handleToggleStatus}>
                    {isEnabled ? 'Disable' : 'Enable'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default TenantData;
