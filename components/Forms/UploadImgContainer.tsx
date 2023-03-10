import { UploadImgIcon } from '../Icons/UploadImgIcon'

export const UploadImgContainer = () => {
  return (
    <>
      <label htmlFor='file-input' className='absolute bottom-2 left-2'>
        <UploadImgIcon width={30} height={30} fill='none' stroke='#EB6440'/>
      </label>
      <input type='file' className='hidden' accept=".jpg, .jpeg, .png" id='file-input'/>
    </>
  )
}
