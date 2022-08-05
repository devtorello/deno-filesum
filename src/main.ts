import { sumDistributedFileNumbers } from './distributor.ts';
import { createFile, fileExists, readFile } from './file.ts';
import { generateChunks } from './helpers.ts';

const FILENAME = './numbers.txt';

const main = async (): Promise<void> => {
	const start = performance.now();
	console.log('Starting processing...')

	if (!await fileExists(FILENAME)) {
		await createFile(FILENAME);
	}

	const fileContent = await readFile(FILENAME);
	const fileChunks = generateChunks(fileContent);

	const sumPromises = [];
	let chunkCounter = 0;
	let totalSum = 0;

	for (const chunk of fileChunks) {
		const promises = [];
		for (const line in chunk) {
			promises.push(sumDistributedFileNumbers(chunk[line], `worker-${chunkCounter++}`));
		}
		sumPromises.push(...promises)
	}
	
	const partialResults = await Promise.all(sumPromises);
	totalSum += partialResults.reduce((a, b) => a + b);

	console.log(`File total sum: ${totalSum}!`);
	console.log(`Processing finished with ${performance.now() - start} ms.`)
};

await main();
