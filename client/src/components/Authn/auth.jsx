import React from 'react';

function Auth(props) {
    return (
        <div>
             <h1>Demo Xác thực Vân tay (WebAuthn)</h1>
      <button onClick={props.register}>Đăng ký vân tay</button>
      <button onClick={props.login} style={{ marginLeft: "10px" }}>
        Đăng nhập
      </button> 
        </div>
    );
}

export default Auth;