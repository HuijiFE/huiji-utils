import * as fs from 'fs';
import * as ps from 'path';
import * as globby from 'globby';
import { PNG } from 'pngjs';

export interface SpritesOptions {
  /**
   * The workspace directory for resolving glob patterns and output path.
   */
  context: string;

  /**
   * Paths of source images
   */
  patterns: string[];

  /**
   * How many cells(images) in a row in the sprites grid.
   */
  columns?: number;

  /**
   * The output path for saving result image file.
   */
  outputImage: string;

  /**
   * The width for a cell(image) in the sprites grid
   */
  itemWidth: number;

  /**
   * The height for a cell(image) in the sprites grid
   */
  itemHeight: number;
}

/**
 * Generate CSS sprites image
 */
export default async function generateSprites({
  context,
  patterns,
  columns,
  itemWidth,
  itemHeight,
  outputImage,
}: SpritesOptions): Promise<string[]> {
  const filePaths: string[] = await globby(
    patterns.map(
      pt =>
        pt.startsWith('!')
          ? `!${ps.resolve(context, pt.replace('!', ''))}`
          : ps.resolve(context, pt),
    ),
  );
  filePaths.sort();

  const total: number = filePaths.length;
  const cols: number = columns && columns < total ? columns : total;
  const rows: number = Math.floor(total / cols) + (total % cols > 0 ? 1 : 0);

  const pngAll: PNG[] = await Promise.all<PNG>(
    filePaths.map(
      path =>
        new Promise<PNG>((resolve, reject) => {
          fs.readFile(path, (error, buffer) => {
            if (error) {
              return reject(error);
            }
            console.log('src', path);
            const png: PNG = PNG.sync.read(buffer);
            resolve(png);
          });
        }),
    ),
  );

  const destPng: PNG = new PNG({
    width: itemWidth * cols,
    height: itemHeight * rows,
  });

  pngAll.forEach((png, index) => {
    const col: number = index % cols;
    const row: number =
      Math.floor((index + 1) / cols) - 1 + ((index + 1) % cols > 0 ? 1 : 0);

    for (let y: number = 0; y < itemHeight; y++) {
      for (let x: number = 0; x < itemWidth; x++) {
        const offset: number = (png.width * y + x) << 2;
        const offsetDest: number =
          (destPng.width * (y + itemHeight * row) + (x + itemWidth * col)) << 2;
        for (let ch: number = 0; ch < 4; ch++) {
          destPng.data[offsetDest + ch] = png.data[offset + ch];
        }
      }
    }
  });

  destPng.pack();

  const outputImagePath: string = ps.resolve(context, outputImage);
  console.log(total, outputImagePath);

  return new Promise<string[]>((resolve, reject) => {
    fs.writeFile(
      ps.resolve(context, outputImagePath),
      PNG.sync.write(destPng),
      error => (error ? reject(error) : resolve(filePaths)),
    );
  });
}
