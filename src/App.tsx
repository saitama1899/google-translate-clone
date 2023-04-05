import { useEffect } from 'react'
import InterchangeIcon from './components/icons/Interchange'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { AUTO_LANGUAGE } from './constants'
import { useDebounce } from './hooks/useDebounce'
import { useStore } from './hooks/useStore'
import { translate } from './translate'
import { SectionType } from './types.d'

function App () {
  const {
    loading,
    fromLanguage, 
    toLanguage, 
    setToLanguage, 
    setFromLanguage, 
    interchangeLanguages,
    setInput,
    setResult,
    input,
    result
  } = useStore()

  const debouncedInput = useDebounce(input)

  useEffect(() => {
    if (debouncedInput === '') return
    translate({ fromLanguage, toLanguage, text: debouncedInput })
      .then(result => {
        // if (result === null || result === undefined ) return
        if (result == null ) return
        setResult(result)
      })
      .catch(() => {
        setResult('Error')
      })
  }, [debouncedInput, fromLanguage, toLanguage])
  
  return (
    <div className='bg-gray-900 h-screen text-white'>
      <div className="container mx-auto p-4 h-screen flex flex-col">
        <div className='text-3xl font-bold text-center '>
          <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-[#A770EF] to-[#FDB99B] mt-4  max-sm:mt-1'>Translator GPT 3.5
          </h1>
        </div>
        <div className='flex mt-12 max-sm:flex-col flex-grow  max-sm:mt-5'>
          <div className="bg-[#564f60] w-[45%] p-4 rounded-md flex flex-col gap-2 relative max-sm:w-full h-1/2">
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea 
              loading={loading} 
              value={input}
              onChange={setInput}
              type={SectionType.From}
            />
          </div>
          <div className="w-[10%] flex justify-center self-start mt-5 max-sm:my-1 max-sm:w-full">
            <button
              onClick={interchangeLanguages}
              className='rounded-md'
              disabled={fromLanguage === AUTO_LANGUAGE}
            >
              <InterchangeIcon width={25} fill={fromLanguage !== AUTO_LANGUAGE ? 'white' : 'gray'} />
            </button>
          </div>
          <div className="bg-[#63554e] w-[45%] p-4 rounded-md flex flex-col gap-2 relative max-sm:w-full h-1/2">
            <LanguageSelector 
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage} 
            />
            <TextArea 
              loading={loading} 
              value={result}
              onChange={setResult}
              type={SectionType.To}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
