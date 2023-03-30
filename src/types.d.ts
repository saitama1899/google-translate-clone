import { type SUPPORTED_LANGUAGES, type AUTO_LANGUAGE } from './constants'

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

export interface Translator {
  fromLanguage: string,
  toLanguage: string,
  input: string,
  result: string,
  loading: boolean
}

export type Action =
| { type: 'INTERCHANGE_LANGUAGES' }
| { type: 'SET_FROM_LANGUAGE', payload: string }
| { type: 'SET_TO_LANGUAGE', payload: string }
| { type: 'SET_INPUT', payload: string }
| { type: 'SET_RESULT', payload: string }
