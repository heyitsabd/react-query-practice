import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const PostsRQ = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: () => axios.get('http://localhost:4000/posts')
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error occurred</div>

  return (
        <div>
            {data?.data.map((post: any) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    )
}

export default PostsRQ
