import { merge } from './merge';
type Indexed<T = unknown> = {
  [key in string]: T;
};

export function set(obj: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );


  return merge(obj as Indexed, result);
}

