import React from "react";

const Logout = (props) => {
    return (
        <>  
            <button
             className="btn btn-outline-secondary"
             type="button"
             onClick={ () => props.signoutUser() }
            >
             Выход
            </button>
        </>
    )
}
export default Logout