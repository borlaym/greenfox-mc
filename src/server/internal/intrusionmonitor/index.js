
function IntrusionMonitor(queue) {

  async function registerIncomingRequest(url) {
    queue.publish('intrusion-detection', url);
  }

  return Object.freeze({
    registerIncomingRequest
  });
}

IntrusionMonitor.deps = ['queue'];

module.exports = IntrusionMonitor;
