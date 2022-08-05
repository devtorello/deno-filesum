const createWorkerURL = (filename: string): string => new URL(filename, import.meta.url).href;

export function sumDistributedFileNumbers(line: string, name: string): Promise<number> {
	return new Promise((resolve) => {
		const worker = new Worker(createWorkerURL('./workers.ts'), { type: 'module' });
		worker.addEventListener('message', (message) => {
			console.log(`Total of ${message.data.sum} returned from ${message.data.name}`);
			resolve(message.data.sum);
		});
		worker.postMessage({ line, name });
	});
}
