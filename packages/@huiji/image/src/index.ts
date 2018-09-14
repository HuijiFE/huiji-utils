import * as fs from 'fs';
import { PNG } from 'pngjs';

/**
 * Image process
 */
const src: string =
  '/mnt/w/dota2/.assets/dota/panorama/images/heroes/npc_dota_beastmaster_boar_png.png';
const width: number = 128;
const height: number = 72;

const buffer: Buffer = fs.readFileSync(src);

const oldFile: PNG = PNG.sync.read(buffer);

const newFile: PNG = new PNG({ width, height });

for (let y = 0; y < newFile.height; y++) {
  for (let x = 0; x < newFile.width; x++) {
    const oldIndex: number = (oldFile.width * y + x) << 2;
    const newIndex: number = (newFile.width * y + x) << 2;

    for (let p = 0; p < 4; p++) {
      newFile.data[newIndex + p] = oldFile.data[oldIndex + p];
    }
  }
}

newFile.pack().pipe(fs.createWriteStream(`${__dirname}/newFile.png`));
