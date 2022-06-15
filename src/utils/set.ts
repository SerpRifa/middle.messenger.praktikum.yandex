import { merge } from "./merge";
type Indexed<T = unknown> = {
  [key in string]: T;
};

export function set<T>(obj: Indexed | unknown, path: string, value: unknown): T {
  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );

  return merge(obj as Indexed, result) as T;
}
