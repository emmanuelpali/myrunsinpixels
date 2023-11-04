import React, { useContext, useMemo } from 'react'
import List from './List'
import { Context } from '../context/milesandpixelsContext'
import { useAuthContext } from '../context/AuthContext'


const MyRuns = () => {
    const { state } = useContext(Context);
    const { currentUser } = useAuthContext();

    const myItems = useMemo(() => {
        const filtered = state.items.filter(item => {
            const username = currentUser?.displayName.split(" ").join("")
            return    item.user === username?.toLowerCase()
        })
        return currentUser ? filtered : []
    }, [state.items, currentUser])
  return (
    <>
        <h1>My Runs</h1>
        <List items={myItems}/>
    </>
  )
}

export default MyRuns