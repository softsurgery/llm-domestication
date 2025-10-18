import { isObservable, toJS } from 'mobx'

export const logProxy = (...args: unknown[]) => {
  console.log(...args.map((arg) => (isObservable(arg) ? toJS(arg) : arg)))
}
