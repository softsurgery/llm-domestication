import { action, makeObservable, observable } from 'mobx'

class AppModel {
  theme: 'light' | 'dark' | 'system' = 'light'

  constructor() {
    makeObservable(this, {
      //states
      theme: observable,
      //methods
      setTheme: action,
    })
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    this.theme = theme
  }
}

const appModel = new AppModel()
export default appModel
