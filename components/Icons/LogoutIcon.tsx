
import { IconsProps } from 'types/iconTypes'

export function LogoutIcon ({ width, height, fill, stroke }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width={width} height={height} viewBox="0 0 24 24" strokeWidth="2" stroke={stroke} fill={fill} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
  <path d="M7 12h14l-3 -3m0 6l3 -3" />
</svg>

  )
}
