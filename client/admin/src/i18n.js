import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './lang/en.json'
import hi from './lang/hi.json'

const resources = {
	en: {
		translation: en
	},
	hi: {
		translation: hi
	}
}

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',

	keySeparator: false,

	interpolation: {
		escapeValue: false
	}
})

export default i18n
