import { UserSearch } from './UsersSearch'

interface HeaderMobileProps {
  search: string
  setSearch: (search: string) => void
}

export const HeaderMobile = ({ search, setSearch }: HeaderMobileProps) => {
  return (
    <header className='relative mb-5 md:hidden'>
      <div className='flex gap-5 flex-col w-4/5 items-center m-auto'>
        <h1 className='font-concert-one text-3xl text-center text-text-dark-green md:hidden'>Home</h1>
        <UserSearch/>
      </div>
    </header>
  )
}
