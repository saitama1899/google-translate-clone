import { useStore } from './hooks/useStore'

function App () {
  const { fromLanguage, interchangeLanguages, toLanguage } = useStore()

  return (
    <div className='bg-gray-900 h-screen text-white'>

    <div className="container mx-auto py-5 ">
      <div className='text-3xl font-bold text-center '>
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#A770EF] to-[#FDB99B]'>Google translate clone</span>
     </div>
      <div className='flex my-10'>
        <div className="bg-gray-700 w-2/5 p-4 rounded-md">
          <h2>From</h2>
          {fromLanguage}
        </div>
        <div className="w-1/5 px-4 flex justify-center self-start ">
          <button
            onClick={interchangeLanguages}
            className='bg-gray-500 px-3'
          >Interchange</button>
        </div>
        <div className="bg-red-500 w-2/5 p-4">
        <h2>From</h2>
          {toLanguage}
        </div>

      </div>
    </div>
    </div>
  )
}

export default App
