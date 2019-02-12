// tslint:disable:no-reserved-keywords

/**
 * The Open Graph protocol enables any web page to become a rich object in a social graph.
 * Learn more: http://ogp.me/
 */
export interface OpenGraph {
  title: string;
  type: OpenGraphType | string;
  image: string;
  url: string;
}

export type OpenGraphType =
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'video.movie'
  | 'video.episode'
  | ''
  | 'website';
