import { FriendCard } from 'components/FriendCard'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { NavBarMobile } from 'components/NavBarMobile'
import { Carousel, Tabs } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'

export default function FriendsPage () {
  return (
    <>
       <ArrowLeft width={24} height={24} stroke={'black'}/>

       <section className='h-full grid justify-center w-full grid-rows-10'>
        <h1 className='text-3xl font-concert-one text-center h-0 row-span-1'>Friends</h1>

        <div className='row-span-3 font-concert-one'>
          <Tabs.Group style='underline'>
            <Tabs.Item active={true} title='My friends'>
              <div className='h-72 w-80 bg-dark-green rounded-lg'>
                <Carousel slide={false} indicators={false}>
                  <FriendCard/>
                </Carousel>
              </div>
            </Tabs.Item>

            <Tabs.Item title='Discover'>
              <div className='h-72 w-80 bg-dark-green rounded-lg'>
                <Carousel slide={false} indicators={false}>
                  <FriendCard/>
                </Carousel>
              </div>
            </Tabs.Item>
          </Tabs.Group>
        </div>

       </section>

       <NavBarMobile/>
    </>
  )
}

// export async function getServerSideProps (context: GetServerSidePropsContext) {
//   const { id } = context.query
//   const apiRes = await fetch(`http://localhost:3000/api/profile/${id}`)
//   if (apiRes.ok) {
//     const res = await apiRes.json()
//     const { user, data } = res
//     const [posts] = await Promise.all([data])
//     return { props: { posts, id, user } }
//   }
// }
