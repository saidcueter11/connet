import { UploadImgIcon } from '../Icons/UploadImgIcon'
import React from 'react'

interface UploadImgContainerProps {
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  formId: string

}

export const UploadImgContainer = ({ handleImgChange, formId }:UploadImgContainerProps) => {
  return (
    <div>
      <label htmlFor={formId}>
        <UploadImgIcon width={30} height={30} fill='none' stroke='#EB6440'/>
      </label>
      <input type='file' className='hidden' onChange={handleImgChange} accept="image/gif, image/jpeg, image/png, image/jpg" id={formId}/>
    </div>
  )
}
