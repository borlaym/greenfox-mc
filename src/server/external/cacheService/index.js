function CacheService() {
	const cache = {};
	const get = key => {
		if (typeof cache[key] === 'undefined') {
			cache[key] = 0;
		}
		return cache[key];
	};
	const increment = (key, amount) => {
		cache[key] = get(key) + (amount || 1);
		return cache[key];
	}
	return {
		get,
		increment
	}
}

module.exports = CacheService;
