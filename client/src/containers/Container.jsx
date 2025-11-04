import React from 'react';

function Container({children}) {
    return (
        <>
            <header style={{height:"100px",background:"red", width:"full",padding:"20 0"}}>
                header
            </header>
                {children}
                <footer style={{height:"300px",background:"red", width:"full",padding:"20 0"}}>
                    Footer
                </footer>
        </>
    );
}

export default Container;