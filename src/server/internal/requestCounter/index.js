function RequestCounter(container) {
	return {
		registerIncomingRequest: (url, param, time) => {
			const cache = container.get('cache');
			cache.increment('totalIncomingRequests', 1);
		},
		getStatistic: async () => {
			const cache = container.get('cache');
			const totalIncomingRequests = await cache.get('totalIncomingRequests');
			return {
				totalIncomingRequests
			}
		}
	}
}
RequestCounter.type = 'factory';
module.exports = RequestCounter;
