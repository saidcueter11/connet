import { useRouter } from 'next/router'
import { IconsProps } from 'types/iconTypes'

export default function ArrowLeft ({ width, height, fill, stroke }: IconsProps) {
  const router = useRouter()

  const goBack = () => router.back()
  return (
    <svg onClick={goBack} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left fixed z-10 top-5 md:absolute" width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="#EB6440" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <polyline points="15 6 9 12 15 18" />
    </svg>
  )
}
