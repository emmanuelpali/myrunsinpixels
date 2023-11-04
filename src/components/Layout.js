import { useContext } from "react"
import Nav from "./Nav"
import UploadForm from "./UploadForm"
import { Context } from "../context/milesandpixelsContext"




function Layout({ children }) {
    const { dispatch, state } = useContext(Context)
    const toggle = (bool) => dispatch({ type: "collapse", payload: { bool }})
    return(
    <div className="container">
        <Nav />
        <div className="container  mt-5">
        <button className="btn btn-success float-end" onClick={() => toggle(!state.isCollapsed)}>{state.isCollapsed ? 'Close' : '+ Add'}</button>
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