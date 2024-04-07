import React from 'react'
import { NewButton } from './new-button'
import List from './list'
const Sidebar = () => {
  return (
    <aside className='fixed z-[1] left-0 bg-blue-950 h-full w-[60px] p-2 flex flex-col gap-y-4 text-white'>
      <List></List>
      <NewButton></NewButton>
    </aside>
  )
}

export default Sidebar