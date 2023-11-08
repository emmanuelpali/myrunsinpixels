import { useContext } from "react"
import Nav from "./Nav"
import UploadForm from "./UploadForm"
import { Context } from "../context/milesandpixelsContext"
import { useAuthContext } from "../context/AuthContext"




function Layout({ children }) {
    const { dispatch, state } = useContext(Context)
    const { currentUser } = useAuthContext();
    const toggle = (bool) => dispatch({ type: "collapse", payload: { bool }})
    return(
    <div className="container">
        <Nav />
        <div className="container  mt-5">
        {currentUser ? <button className="btn btn-light float-end" onClick={() => toggle(!state.isCollapsed)}>{state.isCollapsed ? 'Close' : 'Add a Run'}</button> : 'Login To Add A Run'}
        <div className="clearfix mb-4"></div>
        <UploadForm 
            inputs={state.inputs}
            isVisible={state.isVisible}
        />
        {children}
        </div>
      </div>)
}
export default Layout