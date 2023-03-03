import { createGroup } from '@firebase/client'
import { ChangeEvent, SyntheticEvent, useState } from 'react'

// eslint-disable-next-line no-unused-vars
enum GroupPrivacy {
  // eslint-disable-next-line no-unused-vars
  public = 'Public',
  // eslint-disable-next-line no-unused-vars
  private = 'Private'
}

export const CreateGroupForm = () => {
  const [description, setDescription] = useState('')
  const [groupName, setGroupName] = useState('')
  const [privacy, setPrivacy] = useState(GroupPrivacy.public)

  const handleSubmit = (e:SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    createGroup({

    })
  }

  const handlePrivacyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivacy(e.target.value as GroupPrivacy)
  }

  return (
    <>
      <form className='row-span-4 flex flex-col gap-2 p-3' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <label className='font-concert-one text-lg pb-2 text-ligth-text-green'>Group name</label>
              <input className='bg-light-green rounded p-1'></input>
            </div>

            <div className='flex flex-col'>
              <label className='font-concert-one text-lg pb-2 text-ligth-text-green'>Group description</label>
              <textarea className='resize-none bg-light-green rounded'/>
            </div>

            <fieldset
              className="flex flex-col gap-2 text-ligth-text-green font-karla"
              id="radio"
            >
              <legend className='font-concert-one text-lg pb-2'>
                Choose group restriction
              </legend>
              <div className="flex items-center gap-2">
                <input type='radio' id='Public' onChange={handlePrivacyChange} checked={privacy === GroupPrivacy.public} value={GroupPrivacy.public} name='group'/>
                <label htmlFor={GroupPrivacy.public}>
                  Public <br/>(Any one can join the group)
                </label>
              </div>
              <div className="flex items-center gap-2">
              <input type='radio' id='Private' onChange={handlePrivacyChange} checked={privacy === GroupPrivacy.private} value={GroupPrivacy.private} name='group'/>
                <label htmlFor={GroupPrivacy.private}>
                  Private <br/>(An user must be invited to join)
                </label>
              </div>
              </fieldset>

              <button className='bg-light-green rounded py-1 w-3/5 self-center mt-1'>Create</button>

          </form>
    </>
  )
}
