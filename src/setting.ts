import { DEFAULT_SETTING } from "./env"

export type TSetting = {
	drive: 
	{
	  name: string,
	  key: {
		name: string,
		id: string
	  },
	  currentExpectResolveCID: string
	}[],
	key: {
	  name: string,
	  id: string
	}[]
  }

let liveSetting: TSetting = DEFAULT_SETTING;

export function setSetting(setting: TSetting) {
  liveSetting = setting;
}

export function getSetting(): TSetting {
  return liveSetting
}