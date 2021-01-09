export type MenuEntry = {
  link: string
  label: string
  icon?: string
}

export type MenuEntries = MenuEntry[]

export const AdminMenuEntries: MenuEntries = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/site',
    label: 'Sites',
  },
]
