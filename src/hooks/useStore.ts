import { type Translator, type Action, Language, FromLanguage } from '../types.d'
import { useReducer } from 'react'
import { AUTO_LANGUAGE } from '../constants'

// crear el initial state
const initialState: Translator = {
  fromLanguage: 'auto',
  toLanguage: 'gb',
  input: '',
  result: '',
  loading: false
}

// crear el reducer
function reducer (state: Translator, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    // logica del estado dentro del reducer para evitar ponerla en el componente
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    const loading = state.input !== ''
    return {
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }
  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state

    const loading = state.input !== ''
    return {
      ...state,
      fromLanguage: action?.payload,
      result: '',
      loading
    }
  }
  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state

    const loading = state.input !== ''
    return {
      ...state,
      toLanguage: action?.payload,
      result: '',
      loading
    }
  }
  if (type === 'SET_INPUT') {
    const loading = action.payload !== ''
    
    return {
      ...state,
      loading,
      input: action?.payload,
      result: ''
    }
  }
  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action?.payload
    }
  }

  return state
}

export function useStore () {
  // usar el hook useReducer para crear el state y el dispatch
  const [{
    fromLanguage,
    toLanguage,
    input,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  // crear las funciones que se van a usar para actualizar el state
  const interchangeLanguages = () => dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  const setFromLanguage = (payload: FromLanguage) => dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  const setToLanguage = (payload: Language) => dispatch({ type: 'SET_TO_LANGUAGE', payload })
  const setInput = (payload: string) => dispatch({ type: 'SET_INPUT', payload })
  const setResult = (payload: string) => dispatch({ type: 'SET_RESULT', payload })

  return {
    fromLanguage,
    toLanguage,
    input,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setInput,
    setResult
  }
}
