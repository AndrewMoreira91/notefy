function setStorage(key: string, value: string) {
	localStorage.setItem(key, value);
}

function getStorage(key: string) {
	return localStorage.getItem(key);
}

function removeStorage(key: string) {
	localStorage.removeItem(key);
}

export const storage = {
	set: setStorage,
	get: getStorage,
	remove: removeStorage
}