
function IntrusionDetector(store) {

	async function processMessage(url) {
		const request = await store.getSchema('Intrusion');
		await request.query(
			`mutation Mutation($url: String!) {
				registerIntrusion(url: $url) {
					message
				}
			}`,
			{url}
		);
  }

  async function getIntrusions() {
    const intrusion = await store.getSchema('Intrusion');
    const result = await intrusion.query(`query{intrusion{url}}`);
    return result.data.intrusion;
  }

  return Object.freeze({
    processMessage,
    getIntrusions
  });
}

IntrusionDetector.deps = ['store'];

module.exports = IntrusionDetector;
