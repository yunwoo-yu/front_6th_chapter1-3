import type { FunctionComponent } from "react";

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  return Component;
}
