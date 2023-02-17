import { Avatar } from 'flowbite-react'
import Like from 'components/Icons/Like'
import { CommentIcon } from 'components/Icons/Comment'
import { Dot } from './Icons/Dot'
export const PostCard = () => {
  return (
    <>
      <div className='flex rounded-2xl shadow flex-col p-6 gap-4 bg-light-green shadow-black/25'>
        <div className='flex gap-2 '>
          <Avatar rounded={true}>
            <div className='flex items-end'>
              <p className='font-concert-one'>Said Cueter</p>
              <Dot width={20} height={14} fill='#EB6440'/>
              <time className='text-xs text-action-red font-karla'>hace 2 horas</time>
            </div>
            <small className='font-karla text-action-red'>@username</small>
          </Avatar>
        </div>
        <p className='font-karla px-5'>Dummy text for this example so people thing is a post</p>

        <div className='flex justify-end gap-3'>
          <div className='flex justify-start gap-2'>
            <Like fill='none' stroke='#EB6440' width={24} height={24}/>
            <p className='font-concert-one'>12</p>
          </div>
          <div className='flex gap-2'>
            <CommentIcon fill='none' stroke='#EB6440' width={24} height={24}/>
            <p className='font-concert-one'>17</p>
          </div>
        </div>
      </div>
    </>
  )
}
