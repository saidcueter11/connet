
import { IconsProps } from 'types/iconTypes'

export function NotificationIcon ({ width, height, fill, stroke }: IconsProps) {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell inline hover:fill-action-red-ligth/30" width={width} height={height} viewBox="0 0 24 24" strokeWidth="2" stroke={stroke} fill={fill} strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
  </svg>
  )
}
