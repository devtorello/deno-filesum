import { CHUNK_LIMIT } from './consts.ts'

export function generateChunks (array: string[]): string[][] {
    const chunks = []
    let currentChunk: string[] = [];
    let linesLeft = array.length;
    for (const element of array) {
        currentChunk.push(element);
        linesLeft--;
        if (currentChunk.length === CHUNK_LIMIT || !linesLeft) {
            chunks.push(currentChunk);
            currentChunk = [];
        }
    }
    return chunks;
}
