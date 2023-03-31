import { SendIcon } from '../Icons/SendIcon'

export const SendMessageButton = ({ input }: {input?:string}) => {
  return (
    <button id='btnSendMessage' className='rotate-45 disabled:opacity-50' disabled={input?.length === 0} type='submit'>
      <SendIcon width={28} height={28} stroke='#EB6440' fill='none'/>
    </button>
  )
}
