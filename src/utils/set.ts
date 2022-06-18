import { merge } from "./merge";
export function set<T>(obj: Indexed | unknown, path: string, value: unknown): T {
  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );

  return merge(obj as Indexed, result) as T;
}
