import { SendIcon } from '../Icons/SendIcon'

export const SendMessageButton = () => {
  return (
    <button className='absolute right-3 bottom-2 rotate-45' type='submit'>
      <SendIcon width={28} height={28} stroke='#FD8C77' fill='none'/>
    </button>
  )
}
