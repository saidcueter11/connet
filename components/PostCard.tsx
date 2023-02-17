import { Avatar, Card } from 'flowbite-react'

export const PostCard = () => {
  return (
    <>
      <Card color='#000'>
        <div className='flex gap-2 '>
          <Avatar rounded={true}>
            <p>Said Cueter</p>
            <small>@username</small>
          </Avatar>
          <time className='text-xs mt-1'>hace 2 horas</time>
        </div>
        <p>Dummy text for this example so people thing is a post</p>
        <div className='flex justify-end gap-2'>
          <p>Like</p>
          <p>Comments</p>
        </div>
      </Card>
    </>
  )
}
