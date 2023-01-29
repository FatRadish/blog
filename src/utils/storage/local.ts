import { decrypto, encrypto } from '@/utils/common'

interface StorageData {
  value : unknown
  expire: number | null
}

/** 默认缓存期限为7天 */
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

//数据存储到本地
export function setLocal ( key : string,value:unknown , expire : number | null = DEFAULT_CACHE_TIME){
  const storageData : StorageData = {value,expire:expire !== null ? new Date().getTime() + expire * 1000 : null}
  const json = encrypto(storageData)
  window.localStorage.setItem(key,json)
}

//从本地读取数据
export function getLocal<T>(key :string){
  const json = window.localStorage.getItem(key)
  if(json){
    let storageData:StorageData | null = null
    try{
      storageData = decrypto(json)
    }catch{}
    if(storageData){
      const {value,expire} = storageData
      if(expire === null || expire >= Date.now())
        return value as T
    }
    removeLocal(key)
    return null
  }
  return null
}

// 获取指定数据的过期时间
export function getLocalExpire(key:string):number | null{
  const json = window.localStorage.getItem(key)
  if (json) {
    let storageData: StorageData | null = null
    try {
      storageData = decrypto(json)
    }
    catch { }
    if (storageData) {
      const { expire } = storageData
      return expire
    }
    return null
  }
  return null
}

// 移除本地数据
export function removeLocal(key: string) {
  window.localStorage.removeItem(key)
}

// 清空本地数据
export function clearLocal() {
  window.localStorage.clear()
}
