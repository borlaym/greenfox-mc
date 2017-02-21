import { graphql } from 'graphql';

function RequestMonitor(cache, Request) {

  async function registerIncomingRequest(url, params, time) {
		var schema = await Request;
		await graphql(schema, `
			mutation {
				add(url: "${url}", time: "${time}") {
					url,
					time
				}
			}
		`)
		await cache.increment('totalIncomingRequests', 1);
  }

  async function getStatistics() {
    return {
      totalIncomingRequests: await cache.get('totalIncomingRequests')
    }
  }

  return Object.freeze({
    registerIncomingRequest,
    getStatistics
  });
}

RequestMonitor.deps = ['cache', 'Request'];

module.exports = RequestMonitor;
