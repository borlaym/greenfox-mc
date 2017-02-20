import { graphql } from 'graphql';

function RequestMonitor(cache, Request) {

  async function registerIncomingRequest(url, params, time) {
		var schema = await Request;
		console.log(graphql);
		var valami = await graphql(schema, `
			mutation {
				add(url: "${url}", time: "${time}") {
					url,
					time
				}
			}
		`)
		console.log(valami);
		// await cache.increment('totalIncomingRequests', 1);
  }

  async function getStatistics() {
		var schema = await Request;
		var valami = await graphql(schema, `
			query {
				requests {
					url,
					time
				}
			}
		`)
		console.log(valami);
    return {
      totalIncomingRequests: valami.data.requests.length
    }
  }

  return Object.freeze({
    registerIncomingRequest,
    getStatistics
  });
}

RequestMonitor.deps = ['cache', 'Request'];

module.exports = RequestMonitor;
