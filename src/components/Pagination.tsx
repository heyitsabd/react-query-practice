import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function Pagination() {
     const [page, setPage] = useState(1);
const fetchPosts = async (page: number) => {
  const response = await fetch(
    `http://localhost:4000/fruits?_page=${page}&_per_page=4`
  );

  return response.json();
};

const { data, error, isLoading } = useQuery({
    queryKey: ['fruits', page],
    queryFn: () => fetchPosts(page)
})
  return (
    <div>
        {isLoading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>Error occurred while fetching posts.</p>
        ) : (
            <div>
                {data?.data?.map((post: any) => (
                    <div key={post.id}>
                        <h3>{post.name}</h3>
                    </div>
                ))}
            </div>
        )}
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)  } disabled={!data?.next}>Next</button>
    </div>
  )
}

export default Pagination
