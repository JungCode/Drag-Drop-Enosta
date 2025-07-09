type Size = number | undefined;
export default function useElementSize(id: string): [Size, Size] {
  const height = id ? document.getElementById(id)?.offsetHeight : undefined;
  const width = id ? document.getElementById(id)?.offsetWidth : undefined;

  return [width, height];
}
