export const localStore = {
    get: (key) => {
        return window.localStorage[key];
    },
    set: (key, value) => {
        window.localStorage[key] = value;
    },
    is: (key) => {
        if(window.localStorage.hasOwnProperty(key)) {
            return true;
        }
        return false;
    },
    delete: (key) => {
        window.localStorage.removeItem(key);
    }
};