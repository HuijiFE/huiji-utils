const pngSignature: string = 'PNG\r\n\x1a\n';

/**
 * Detect a file is png or not.
 */
export function isPNG(data: Uint8Array): boolean {
  if (pngSignature === String.fromCharCode(...data.slice(1, 8))) {
    return true;
  }

  return false;
}
