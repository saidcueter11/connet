
import { IconsProps } from 'types/iconTypes'

export function CreateIcon ({ width, height, fill, stroke }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code-plus" width={width} height={height} viewBox="0 0 24 24" strokeWidth="2" stroke={stroke} fill={fill} strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 12h6" />
      <path d="M12 9v6" />
      <path d="M6 19a2 2 0 0 1 -2 -2v-4l-1 -1l1 -1v-4a2 2 0 0 1 2 -2" />
      <path d="M18 19a2 2 0 0 0 2 -2v-4l1 -1l-1 -1v-4a2 2 0 0 0 -2 -2" />
    </svg>
  )
}
