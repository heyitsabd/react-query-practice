import { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

type Fruit = {
  id: string;
  name: string;
  color: string;
};

type FruitsPage = {
  data: Fruit[];
  next?: number | null;
};

const PAGE_SIZE = 10;

function InfiniteScroll() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isFetchingNextPageRef = useRef(false);

  const fetchFruits = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<FruitsPage> => {
    console.log("render check fetchFruits")
    const response = await fetch(
      `http://localhost:4000/fruits?_page=${pageParam}&_per_page=${PAGE_SIZE}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch fruits");
    }

    return response.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
            console.log("render check getNextPageParam")
      return lastPage.next ?? undefined;
    },
  });

  useEffect(() => {
    isFetchingNextPageRef.current = isFetchingNextPage;
  }, [isFetchingNextPage]);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const loaderRef = useCallback(
    (node: HTMLDivElement | null) => {
      observerRef.current?.disconnect();

      if (!node || !hasNextPage) {
        return;
      }

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            hasNextPage &&
            !isFetchingNextPageRef.current
          ) {
            isFetchingNextPageRef.current = true;
            fetchNextPage().finally(() => {
              isFetchingNextPageRef.current = false;
            });
          }
        },
        {
          root: null,
          rootMargin: "200px",
          threshold: 0,
        }
      );

      observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage]
  );

  if (isLoading) {
    return <h2>Loading fruits...</h2>;
  }

  if (error instanceof Error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h1>Infinite Scroll Fruits</h1>

      {data?.pages.map((page) =>
        page.data.map((fruit) => (
          <div
            key={fruit.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px",
            }}
          >
            <h3>{fruit.name}</h3>
            <p>{fruit.color}</p>
          </div>
        ))
      )}

      <div
        ref={loaderRef}
        style={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        {isFetchingNextPage
          ? "Loading more fruits..."
          : hasNextPage
          ? "Scroll down for more fruits"
          : "No more fruits"}
      </div>
    </div>
  );
}

export default InfiniteScroll;
