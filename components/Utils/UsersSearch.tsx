import Link from 'next/link'
import { useEffect, useState } from 'react'
import { UserCollection } from 'types/databaseTypes'

export const UserSearch = () => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<UserCollection[]>([])

  useEffect(() => {
    if (search.length > 0) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
        .then(res => res.json())
        .then((data) => {
          const usersList = data.users as UserCollection[]
          const userSearch = usersList.filter(user =>
            user.firstName?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()) ||
            user.lastName?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
          )
          if (search.length > 0) setUsers(userSearch)
        })
    }
  }, [search])

  return (
    <div className='relative'>
      <input className='rounded-3xl md:w-[380px] shadow px-3 py-1 font-karla outline-dark-green text-center md:ml-3 h-fit bg-light-green' placeholder="Search users" value={search} onChange={(e) => setSearch && setSearch(e.target.value)}/>

      {
        (users.length > 0 && search.length > 0) &&
          <ul className='bg-dark-green h-fit absolute w-full flex flex-col gap-2 px-3 py-2 rounded-lg top-10 md:top-14 z-20'>
            {
              users.map(user => <Link href={`/profile/${user.id}`} key={user.id} className='hover:opacity-80'><li className='text-ligth-text-green font-karla  hover:underline' >{user.firstName} {user.lastName}</li></Link>)
            }
          </ul>
      }
    </div>
  )
}
