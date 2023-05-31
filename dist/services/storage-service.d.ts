declare class LocalStorageService {
    private static instance;
    static getInstance(): LocalStorageService;
    saveToStorage<T>(key: string, value: T): void;
    loadFromStorage(key: string): any;
}
export declare const localStorageService: LocalStorageService;
export {};
