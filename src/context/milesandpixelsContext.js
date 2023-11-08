import { createContext, useMemo, useReducer } from "react";
import Firestore from "../handlers/firestore";

export const Context = createContext()
const photos = [];
const { readDocs } = Firestore

const initialState = {
    items: photos, 
    placeholders: photos, // Keeps track of the datafrom the database when there is a search term
    count: photos.length, 
    inputs: { title: null, description: null, file: null, path: null}, 
    isCollapsed: false
}
const handleOnChange = (state, e) => {
  if (e.target.name === 'file') {
    return { ...state.inputs, file: e.target.files[0], path: URL.createObjectURL(e.target.files[0])}
  }
  if(e.target.name === 'description'){
    return {...state.inputs, description: e.target.value}
  }
  else {
    return {...state.inputs, title: e.target.value}
  }
}

function reducer(state, action) {
  switch(action.type  ) {
      case 'setItem':
        return {
          ...state, 
          items: [state.inputs, ...state.items],
          placeholders: [state.inputs, ...state.items],
          count: state.items.length + 1, 
          inputs: { title: null, description: null, file: null, path: null}
        }
      case 'setItems':
        return {
          ...state,
          items: action.payload.items,
          placeholders: action.payload.items,
        }

      case 'filterItems':
        return {
          ...state,
          items: action.payload.results
        }

      case "setInputs": 
      return {
        ...state, 
        inputs: handleOnChange(state, action.payload.value)
      }
      case 'collapse':
        return {
          ...state, 
          isCollapsed: action.payload.bool
        }
      default : return state
  }
}

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const readData = async () => {
      const items = await readDocs("runs")
      dispatch({type: "setItems", payload: { items }})
    }

    const filterItems = input => {
      if(input === "" || !!input) {
        dispatch({type: "setItems", payload: {items: state.placeholders}})
      }
      let list = state.placeholders.flat()
      let results = list.filter((item) => {
        const name = item.title.toLowerCase()
        const searchInput = input.toLowerCase()
        return name.indexOf(searchInput) > -1
      })
      
      dispatch({type: "filterItems", payload: { results }})
    }

    const value = useMemo(() => {
      return {
        state, dispatch, readData, filterItems
      }
    },[state, dispatch, readData, filterItems])

    return <Context.Provider value={value}>{children}</Context.Provider>
}
export default Provider;
