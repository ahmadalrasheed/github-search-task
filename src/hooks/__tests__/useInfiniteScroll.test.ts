import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useInfiniteScroll } from '../useInfiniteScroll';

const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
const mockUnobserve = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  global.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;
  mockIntersectionObserver.mockReturnValue({
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: mockUnobserve,
  });
});

describe('useInfiniteScroll', () => {
  it('should create IntersectionObserver with correct options', () => {
    const mockOnLoadMore = vi.fn();

    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasMore: true,
        isLoading: false,
        onLoadMore: mockOnLoadMore,
        threshold: 0.5,
      })
    );

    const mockElement = document.createElement('div');
    result.current.loadMoreRef(mockElement);

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.5,
        rootMargin: '20px',
      })
    );
  });

  it('should use default threshold when not provided', () => {
    const mockOnLoadMore = vi.fn();

    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasMore: true,
        isLoading: false,
        onLoadMore: mockOnLoadMore,
      })
    );

    const mockElement = document.createElement('div');
    result.current.loadMoreRef(mockElement);

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.1,
      })
    );
  });

  it('should call onLoadMore when element is intersecting and has more data', () => {
    const mockOnLoadMore = vi.fn();
    let observerCallback: IntersectionObserverCallback;

    mockIntersectionObserver.mockImplementation((callback) => {
      observerCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: mockUnobserve,
      };
    });

    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasMore: true,
        isLoading: false,
        onLoadMore: mockOnLoadMore,
      })
    );

    const mockElement = document.createElement('div');
    result.current.loadMoreRef(mockElement);

    observerCallback!([
      {
        isIntersecting: true,
      } as IntersectionObserverEntry,
    ]);

    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should not call onLoadMore when isLoading is true', () => {
    const mockOnLoadMore = vi.fn();

    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasMore: true,
        isLoading: true,
        onLoadMore: mockOnLoadMore,
      })
    );

    const mockElement = document.createElement('div');
    result.current.loadMoreRef(mockElement);

    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('should not call onLoadMore when hasMore is false', () => {
    const mockOnLoadMore = vi.fn();

    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasMore: false,
        isLoading: false,
        onLoadMore: mockOnLoadMore,
      })
    );

    const mockElement = document.createElement('div');
    result.current.loadMoreRef(mockElement);

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });

  it('should disconnect observer on unmount', () => {
    const mockOnLoadMore = vi.fn();

    const { result, unmount } = renderHook(() =>
      useInfiniteScroll({
        hasMore: true,
        isLoading: false,
        onLoadMore: mockOnLoadMore,
      })
    );

    const mockElement = document.createElement('div');
    result.current.loadMoreRef(mockElement);

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should disconnect and recreate observer when dependencies change', () => {
    const mockOnLoadMore = vi.fn();

    const { result, rerender } = renderHook(
      ({ threshold }) =>
        useInfiniteScroll({
          hasMore: true,
          isLoading: false,
          onLoadMore: mockOnLoadMore,
          threshold,
        }),
      {
        initialProps: { threshold: 0.1 },
      }
    );

    const mockElement = document.createElement('div');
    result.current.loadMoreRef(mockElement);

    const firstCallCount = mockIntersectionObserver.mock.calls.length;
    expect(firstCallCount).toBe(1);

    rerender({ threshold: 0.5 });

    result.current.loadMoreRef(mockElement);

    expect(mockIntersectionObserver.mock.calls.length).toBeGreaterThan(firstCallCount);
  });
});

