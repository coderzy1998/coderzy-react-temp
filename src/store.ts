import { makeAutoObservable } from 'mobx'

export default class AppStore {
  constructor() {
    makeAutoObservable(this)
  }
}