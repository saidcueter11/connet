
import { useRouter } from 'next/router'
import { IconsProps } from 'types/iconTypes'

interface GroupIconProps extends IconsProps {
  id?: string
}

export function GroupIcon ({ width, height, fill, stroke, id }: GroupIconProps) {
  const router = useRouter()

  const goToGroups = () => router.push(`/groups/${id}`)

  return (
    <svg onClick={goToGroups} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users inline" width={width} height={height} viewBox="-3 0 25 25" strokeWidth="2" stroke={stroke} fill={fill} strokeLinecap="round" strokeLinejoin="round">

    <path stroke="none" d="M0 0h30v30H0z" fill="none"/>
    <circle cx="9" cy="7" r="4" />
    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <path d='M2 11 a 4 4 0 0 1 0 -7.75'/>
    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    <path d="M0.5 15 v 0 a 4 4 0 0 0 -2 6" />

  </svg>)
}
