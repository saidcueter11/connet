import { useRouter } from 'next/router'
import { IconsProps } from 'types/iconTypes'

interface MessagesIconProps extends IconsProps {
  id: string
}

export function MessagesIcon ({ width, height, fill, stroke, id }: MessagesIconProps) {
  const router = useRouter()

  const goToMessages = () => router.push(`/messages/${id}`)
  return (
    <svg onClick={goToMessages} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages hover:fill-action-red-ligth/30 cursor-pointer" width={width} height={height} viewBox="0 0 24 24" strokeWidth="2" stroke={stroke} fill={fill} strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
      <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
    </svg>
  )
}
