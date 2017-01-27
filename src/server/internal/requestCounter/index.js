function RequestCounter() {
	return {
		registerIncomingRequest: (url, param, time) => {},
		getStatistic: () => {
			return {
				totalIncomingRequests: 0
			}
		}
	}
}
RequestCounter.type = 'factory';
module.exports = RequestCounter;
