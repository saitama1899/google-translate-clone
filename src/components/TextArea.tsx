import { SectionType } from "../types.d"
import CopyClipboardIcon from "./icons/CopyClipboard"

// type Props = 
//   | { type: SectionType.From, loading?: boolean, value: string, onChange: (language: string) => void }
//   | { type: SectionType.To, loading?: boolean, value: string, onChange: (language: string) => void }

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const getPlaceholder = ({type, loading }: {type: SectionType, loading?: boolean}) => {
  if (type === SectionType.From) return 'Enter text'
  if (loading === true) return 'Loading...'
  return 'Traduction'
}

export const TextArea = ({ loading, type, value, onChange }: Props) => {
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  const handleClipboard = () => {
    navigator.clipboard.writeText(value)
  }
  
  const stylesText = type === SectionType.From 
    ? { }
    : { color: 'lightgray' }

  // const stylesWrap = type === SectionType.From 
  //   ? { position: 'inherit' as const }
  //   : { position: 'relative' as const }

  return (
    <>
      <textarea 
        placeholder={getPlaceholder({type, loading})}
        autoFocus={type === SectionType.From}
        disabled={type === SectionType.To}
        className='rounded-sm px-2 focus:outline-none resize-none text-2xl w-full flex-grow bg-transparent max-sm:text-lg'
        style={stylesText}
        value={value}
        onChange={handleChange}
     />
      {type === SectionType.To && (
        <button 
          className="absolute bottom-4 right-3 z-10 bg-inherit p-[1px]"
          onClick={handleClipboard}
        >
          <CopyClipboardIcon fill={'white'} />
        </button>       
      )}
    </>
  )
}