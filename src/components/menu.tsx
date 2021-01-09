import React from 'react'
import Link from 'next/link'
import { AdminMenuEntries } from 'config/menu-admin'

const Menu: React.FC = () => {
  return (
    <nav className="flex flex-row flex-nowrap items-center">
      {AdminMenuEntries.map(({ link, label, icon }) => (
        <span
          key={link}
          className="flex-1 mx-3 hover:font-semibold hover:text-indigo-200"
        >
          <Link href={link}>{label}</Link>
        </span>
      ))}
    </nav>
  )
}

export default Menu
