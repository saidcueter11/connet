
import { IconsProps } from 'types/iconTypes'

export function DotsVerticalIcon ({ width, height, fill, stroke }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dots-vertical" width={width} height={height} viewBox="0 0 24 24" strokeWidth="2" stroke={stroke} fill={fill} strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
    <circle cx="12" cy="5" r="1" />
  </svg>

  )
}
