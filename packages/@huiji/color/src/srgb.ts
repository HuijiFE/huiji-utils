export interface RGB {
  red: number;
  green: number;
  blue: number;
}

export interface RGBA extends RGB {
  alpha: number;
}

/**
 * sRGB
 */
export class StandardRGB implements RGBA {
  public red: number;
  public green: number;
  public blue: number;
  public alpha: number;

  constructor(r: number, g: number, b: number, a: number = 1) {
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  }
}
