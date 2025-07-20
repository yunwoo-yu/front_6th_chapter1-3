import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const valueRef = useRef<T | null>(null);
  const depsRef = useRef<DependencyList>([]);
  const isFirstRenderRef = useRef(true);

  // 첫 번째 렌더링이거나 의존성이 변경되었는지 확인
  if (isFirstRenderRef.current || !_equals(depsRef.current, _deps)) {
    // 변경되었다면 factory 실행하고 결과 저장
    valueRef.current = factory();
    depsRef.current = _deps;
    isFirstRenderRef.current = false;
  }

  return valueRef.current as T;
}
