import { UploadImgIcon } from '../Icons/UploadImgIcon'
import React from 'react'

interface UploadImgContainerProps {
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

export const UploadImgContainer = ({ handleImgChange }:UploadImgContainerProps) => {
  return (
    <div className=''>
      <label htmlFor='file-input'>
        <UploadImgIcon width={30} height={30} fill='none' stroke='#EB6440'/>
      </label>
      <input type='file' className='hidden' onChange={handleImgChange} accept=".jpg, .jpeg, .png" id='file-input'/>
    </div>
  )
}
