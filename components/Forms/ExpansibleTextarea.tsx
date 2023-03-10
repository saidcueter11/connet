import { FormEvent } from 'react'

interface ExpansibleTextareaProps {
  content: string
  setContent: (newVal: string) => void
}

export const ExpansibleTextarea = ({ content, setContent }: ExpansibleTextareaProps) => {
  function handleInput (event: FormEvent<HTMLTextAreaElement>) {
    const newValue = event.currentTarget.value
    setContent(newValue)
    adjustHeight(event.currentTarget)
  }

  function adjustHeight (textarea: HTMLTextAreaElement) {
    const { style } = textarea
    style.height = 'auto'
    style.height = `${textarea.scrollHeight}px`
    style.overflowY = 'hidden'
    style.resize = 'none'
  }

  return (
    <>
      <div className='bg-light-green rounded-xl flex flex-col justify-center gap-2'>
        <textarea
          className="m-auto pt-2 min-h-[40px] rounded-xl border-transparent focus:outline-none focus:ring-0 focus:border-action-red-ligth bg-light-green font-karla text-text-dark-green"
          value={content}
          onInput={handleInput}
          rows={1}
        />

        {/* <img className='w-3/4 m-auto rounded-lg' src='https://randomwordgenerator.com/img/picture-generator/57e0d1424e50ac14f1dc8460962e33791c3ad6e04e507441722872d79644c7_640.jpg'/> */}
      </div>
    </>
  )
}
