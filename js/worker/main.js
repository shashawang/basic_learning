const channel = new MessageChannel();
const workerA = new Worker('./worker.js')
const workerB = new Worker('./worker.js')
workerA.postMessage('workerA', [channel.port1])
workerB.postMessage('workerB', [channel.port2])
workerA.onmessage = ({data}) =>console.log(data);
workerB.onmessage = ({data}) =>console.log(data);
workerA.postMessage(['page'])
workerB.postMessage(['page'])