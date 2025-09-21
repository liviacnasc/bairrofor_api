//helper para converter os arquivos csv para json

import { parse } from "csv-parse";
import Stream, { Readable } from 'node:stream';

export function getCSV(csv) {
    const result = [];

    return new Promise((resolve, reject) => {
        Stream.Readable.from(csv.data)
        .pipe(parse({delimiter: ","}))
        .on('data', (data) => result.push(data))
        .on('end', () => resolve(result))
        .on('error', reject);
    });
}