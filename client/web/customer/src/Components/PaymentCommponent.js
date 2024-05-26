import React from 'react';

function PaymentCommponent() {
    return (
        <div className="main-container" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <div className="email-container" style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <div className="email-header" style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
                    <h1 className="email-header__content__title" style={{ color: '#334ac0', marginBottom: '10px', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
                        HealthHub
                    </h1>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Thanh toán thành công!</h3>
                </div>
                <div className="email-body" style={{ padding: '20px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Tổng hóa đơn</h3>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ fontSize: '16px', padding: '10px 0', color: '#444' }}>Tiền khám bệnh</td>
                                    <td style={{ fontSize: '16px', padding: '10px 0', textAlign: 'right', color: '#444', fontWeight: 'bold' }}>399.000 VNĐ</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ fontSize: '16px', padding: '10px 0', color: '#444', textAlign: 'right', borderTop: '1px solid #ccc', fontWeight: 'bold' }}>Tổng tiền: 399.000 VNĐ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Thông tin khách hàng</h3>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ fontSize: '16px', padding: '10px 0', color: '#444', fontWeight: 'bold' }}>Thông tin cá nhân</td>
                                    <td style={{ fontSize: '16px', padding: '10px 0', textAlign: 'right', color: '#444', fontWeight: 'bold' }}>Phương thức thanh toán</td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: '16px', padding: '10px 0', color: '#444' }}>Komang J. Artha</td>
                                    <td style={{ fontSize: '16px', padding: '10px 0', textAlign: 'right', color: '#444' }}>Bank Transfer</td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: '16px', padding: '10px 0', color: '#444' }}>Komangartha44@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentCommponent;
