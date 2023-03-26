
import { useRouter } from 'next/router'
import { IconsProps } from 'types/iconTypes'

interface FriendsIconProps extends IconsProps {
  id?: string
}

export function FriendsIcon ({ width, height, fill, stroke, id }: FriendsIconProps) {
  const router = useRouter()

  const goToFriends = () => id !== undefined && router.push(`/friends/${id}`)

  return (
    <svg onClick={goToFriends} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users inline hover:fill-action-red-ligth/30" width={width} height={height} viewBox="0 0 24 24" strokeWidth="2" stroke={stroke} fill={fill} strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"/>
    </svg>)
}
