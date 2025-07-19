export function useRef<T>(initialValue: T): { current: T } {
  // useState를 이용해서 만들어보세요.
  return { current: initialValue };
}
