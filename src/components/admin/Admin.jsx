import React from 'react';
import { FaUserShield } from 'react-icons/fa';

const Admin = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <FaUserShield style={{ fontSize: '5em', color: 'blue' }} />
            <h1>Admin</h1>
            <p>To jest strona główna dla administratora systemu.</p>
        </div>
    );
};

export default Admin;