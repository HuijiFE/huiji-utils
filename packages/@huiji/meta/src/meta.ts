import { OpenGraph } from './open-graph';

/**
 * Metadata contains information about the page
 */
export interface MetaData {
  title: string;
  meta: BasicMeta;
  og: OpenGraph;
  extraMeta?: Record<string, string>[];
}

export interface BasicMeta {
  description: string;
  keywords: string;
}
