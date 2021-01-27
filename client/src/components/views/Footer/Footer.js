import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p>화이팅<Icon type="smile" /></p>
           <p>dev.email : qhdgkdbs@gmail.com</p>
        </div>
    )
}

export default Footer
