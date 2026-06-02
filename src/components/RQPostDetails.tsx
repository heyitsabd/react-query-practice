import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'

type Post = {
    id: string | number
    title: string
    body: string
}

const RQPostDetails = () => {
    const { postId } = useParams()
    console.log("postId",postId);
    const { data, error, isLoading } = useQuery({
   
        queryKey: ['post', postId],
        queryFn: async () => {
            const response = await axios.get<Post>(
                `http://localhost:4000/posts/${postId}`
            )
            return response.data
        },
        enabled: !!postId
    })

    if (!postId) return <h2>Post not found</h2>

    if (isLoading) return <h2>Loading...</h2>

    if (error) return <h2>{error.message}</h2>

    if (!data) return <h2>Post not found</h2>

    return (
        <section className="posts-rq">
            <h1>{data.title}</h1>
            <p>{data.body}</p>
        </section>
    )
}

export default RQPostDetails
