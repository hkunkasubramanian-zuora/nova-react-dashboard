import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SqlInputBox = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform any validation you need for the SQL query here before submitting.
        onSubmit(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Enter your SQL query"
                variant="outlined"
                value={query}
                onChange={handleChange}
                placeholder="Enter your SQL query here..."
                fullWidth
                multiline
                rows={4}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Submit
            </Button>
        </form>
    );
};

export default SqlInputBox;
