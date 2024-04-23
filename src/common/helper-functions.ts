import type { OrderedPost } from '@/stores/posts'

export function swap(arr: OrderedPost[], index1: number, index2: number): void {
  ;[arr[index1], arr[index2]] = [arr[index2], arr[index1]]

  arr[index1].order = index1
  arr[index2].order = index2
}
