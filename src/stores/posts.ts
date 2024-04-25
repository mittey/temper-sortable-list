import { swap } from '@/common/helper-functions'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface OrderedPost extends Post {
  order: number
}

export enum MoveDirections {
  Up,
  Down
}

export interface SortingMove {
  id: number
  postId: number
  initialPosition: number
  direction: MoveDirections
}

export type RawMove = Omit<SortingMove, 'id'>

export const usePostsStore = defineStore('posts', () => {
  const posts = ref(new Array<Post>()),
    moves = ref(new Array<SortingMove>()),
    sortedPosts = computed<OrderedPost[]>(() => applyActions(posts.value, moves.value))

  function setPosts(p: Post[]): void {
    posts.value = p
  }

  function appendMove(action: RawMove): void {
    moves.value.push({ ...action, id: moves.value.length })
  }

  function jumpToMove(actionId: number) {
    // This action should also remove the clicked action card and the action cards above that.
    moves.value = moves.value.slice(0, actionId - (actionId > 0 ? 1 : 0))
  }

  return { sortedPosts, moves, setPosts, appendMove, jumpToMove }
})

function applyActions(posts: Post[], actions: SortingMove[]): OrderedPost[] {
  const sortedPosts: OrderedPost[] = posts.map((post, order) => ({ ...post, order }))

  for (const { initialPosition, direction } of actions)
    swap(sortedPosts, initialPosition, initialPosition + mapDirectionToIncrement(direction))

  return sortedPosts
}

export function mapDirectionToIncrement(direction: MoveDirections) {
  switch (direction) {
    case MoveDirections.Up:
      return -1

    case MoveDirections.Down:
      return 1

    default:
      throw new Error('Unable to map direction: unknown move direction.')
  }
}
