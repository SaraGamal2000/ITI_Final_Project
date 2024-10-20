import React from 'react';

const CancelPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Payment Canceled</h1>
            <p>Your payment was not completed. Please try again.</p>
            <a href="/">Go back to Home</a>
        </div>
    );
};

export default CancelPage;
