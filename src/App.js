import {  useMemo, useContext, useEffect } from "react";
import { useAuthContext } from "./context/AuthContext"
import Layout from "./components/Layout";
import "./App.css";
import Card from "./components/Card";
import { Context } from "./context/milesandpixelsContext";
import List from "./components/List";

function App() {
  const { state, readData } = useContext(Context)
  const { authenticate } = useAuthContext();
  const count = useMemo(() => {
    return `you have ${state.items.length} image${state.items.length > 1 ? 's': ''}`
  }, [state.items]);

  useEffect(() => {
    readData()
    authenticate()
  }, [])
  

  return (
    <>
        <h1 className="text-center">Gallery</h1>
        {count}
        <List items={state.items}/>
    </>
  );
 
}
export default App;
