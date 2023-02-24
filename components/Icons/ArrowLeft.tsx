import { useRouter } from 'next/router'
import { IconsProps } from 'types/iconTypes'

export default function ArrowLeft ({ width, height, fill, stroke }: IconsProps) {
  const router = useRouter()

  const goBack = () => router.back()
  return (
    <svg className='inline' onClick={goBack} width={width} height={height} viewBox="0 0 21 21" fill={fill} stroke={stroke}>
      <g
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.5 6.497l-4 4.002 4 4M16.5 10.5h-13" />
      </g>
    </svg>
  )
}
