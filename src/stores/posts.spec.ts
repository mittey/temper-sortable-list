import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, test, beforeEach } from 'vitest'
import { MoveDirections, usePostsStore, type Post, type RawMove } from './posts'

describe('Post Store', () => {
  const testPosts: Post[] = [
    {
      id: 0,
      userId: 1,
      title: 'Test post title 0',
      body: 'Test post body 0'
    },
    {
      id: 1,
      userId: 1,
      title: 'Test post title 1',
      body: 'Test post body 1'
    },
    {
      id: 2,
      userId: 1,
      title: 'Test post title 2',
      body: 'Test post body 2'
    },
    {
      id: 3,
      userId: 1,
      title: 'Test post title 3',
      body: 'Test post body 3'
    }
  ]

  beforeEach(() => {
    // Initialize Pinia for unit testing.
    setActivePinia(createPinia())
  })

  test('should be created with proper initial state', () => {
    const store = usePostsStore()

    expect(store.moves.length).toBe(0)
    expect(store.sortedPosts.length).toBe(0)
  })

  describe(`'setPosts' action`, () => {
    test(`should update the posts state in proper order`, () => {
      const store = usePostsStore()
      store.setPosts(testPosts)

      expect(store.sortedPosts.length).toBe(testPosts.length)

      // Make sure that the posts are added to the store in proper order.
      for (const testPost of testPosts) {
        expect(store.sortedPosts[testPost.id].id).toBe(testPost.id)
      }
    })

    test(`should not affect the actions state`, () => {
      const store = usePostsStore()
      store.setPosts(testPosts)

      expect(store.moves.length).toBe(0)
    })
  })

  describe(`'appendMove' action`, () => {
    const testMove: RawMove = {
      initialPosition: 0,
      direction: MoveDirections.Down,
      postId: 0
    }

    test('should push a new move to the moves state', () => {
      const store = usePostsStore()
      store.appendMove(testMove)

      expect(store.moves.length).toBe(1)
      expect(store.moves[0].id).toBe(0)
      expect(store.moves[0].direction).toBe(testMove.direction)
      expect(store.moves[0].initialPosition).toBe(testMove.initialPosition)
    })

    test('should properly apply sorting to the posts state', () => {
      const store = usePostsStore()
      store.setPosts(testPosts)
      store.appendMove(testMove)

      expect(store.sortedPosts[0].id).toBe(1)
      expect(store.sortedPosts[1].id).toBe(0)
    })
  })

  describe(`'jumpToMove' action`, () => {
    const testMoves: RawMove[] = [
      {
        initialPosition: 0,
        postId: 0,
        direction: MoveDirections.Down
      },
      {
        initialPosition: 1,
        postId: 0,

        direction: MoveDirections.Down
      },
      {
        initialPosition: 2,
        postId: 0,

        direction: MoveDirections.Down
      }
    ]

    test('should reduce the moves list till the proper move', () => {
      const store = usePostsStore()
      store.setPosts(testPosts)
      for (const move of testMoves) store.appendMove(move)

      store.jumpToMove(0)

      expect(store.moves.length).toBe(1)
    })

    test('should properly re-sort the posts to reflect the changed moves set', () => {
      const store = usePostsStore()
      store.setPosts(testPosts)

      for (const move of testMoves) store.appendMove(move)
      expect(store.sortedPosts[0].id).toBe(1)
      expect(store.sortedPosts[1].id).toBe(2)
      expect(store.sortedPosts[2].id).toBe(3)
      expect(store.sortedPosts[3].id).toBe(0)

      store.jumpToMove(0)

      expect(store.sortedPosts[0].id).toBe(1)
      expect(store.sortedPosts[1].id).toBe(0)
      expect(store.sortedPosts[2].id).toBe(2)
      expect(store.sortedPosts[3].id).toBe(3)
    })
  })
})
