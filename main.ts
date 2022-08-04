import { sumDistributedFileNumbers } from './distributor.ts';
import { createFile, readFile, fileExists } from './file.ts';
import { generateChunks } from './helpers.ts';

const FILENAME = './numbers.txt';

const main = async (): Promise<void> => {
    if (!await fileExists(FILENAME)) {
        await createFile(FILENAME);
    }

    const fileContent = await readFile(FILENAME);
    const fileChunks = generateChunks(fileContent);

    let chunkCounter = fileChunks.length;
    let totalSum = 0;

    for (const chunk of fileChunks) {
        const promises = [];
        for (const line in chunk) {
            promises.push(sumDistributedFileNumbers(chunk[line], `worker-${chunkCounter--}`));
        }
        const partialResults = await Promise.all(promises);
        totalSum += partialResults.reduce((a, b) => a + b);
        console.log(`Partial sum: ${totalSum}`);
    }
    
    console.log(`File total sum: ${totalSum}`);
}

await main();
