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

	async function getRequests() {
		var schema = await Request;
		var results = await graphql(schema, `
			query {
				requests {
					url,
					time
				}
			}
		`);
		return results.data.requests;
	}

  return Object.freeze({
    registerIncomingRequest,
    getStatistics,
		getRequests
  });
}

RequestMonitor.deps = ['cache', 'Request'];

module.exports = RequestMonitor;
