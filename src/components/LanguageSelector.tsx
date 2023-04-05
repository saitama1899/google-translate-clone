import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants"
import { FromLanguage, Language, SectionType } from "../types.d"

// interface Props {
//   onChange: (language: Language) => void
// }

type Props = 
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector = ( { onChange, type, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <div className="flex items-center gap-1">
      { value !== AUTO_LANGUAGE && 
        <img 
          width={20} src={`https://flagcdn.com/20x15/${value}.png`}
          className="rounded-xl"
        />
      }
      <select onChange={handleChange} value={value} className='bg-transparent flex-grow hover:cursor-pointer'>
        { type === SectionType.From && <option value='auto' className='text-black'>Detect language</option> }
        {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
          <option key={key} value={key} className='text-black'>
            {literal}
          </option>
        ))}
      </select>
    </div>
  )
}