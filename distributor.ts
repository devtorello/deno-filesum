const createWorkerURL = (filename: string): string => new URL(filename, import.meta.url).href;

export function sumDistributedFileNumbers (line: string, name: string): Promise<number> {
    return new Promise((resolve) => {
        const worker = new Worker(createWorkerURL('./workers.ts'), { type: 'module' });
        worker.addEventListener('message', message => { 
            resolve(message.data.sum)
        })
        worker.postMessage({ line, name });
    })
}
