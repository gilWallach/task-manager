class LocalStorageService {
    private static instance: LocalStorageService

    static getInstance() {
        if (this.instance) return this.instance
        this.instance = new LocalStorageService()
        return this.instance
    }

    saveToStorage<T>(key: string, value: T) {
            const data = JSON.stringify(value)
            localStorage.setItem(key, data)
        }
    loadFromStorage(key: string){        
            const data = localStorage.getItem(key)
            if(data) return JSON.parse(data)
            return null
        }
  }
  export const localStorageService = LocalStorageService.getInstance()