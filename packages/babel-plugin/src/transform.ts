import { types as t, parseSync, transformFromAstSync } from "@babel/core";
import type { ParseResult } from "@babel/core";

export async function transform(code: string, id: string) {
  const file: ParseResult | null = parseSync(code);
  if (!file) return;

  const result = await transformFromAstSync(file, code, {
    filename: id,
    sourceMaps: true,
    plugins: [require("./index").default],
  });

  if (!result) return;
  return result;
}
