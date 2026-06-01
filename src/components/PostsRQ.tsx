import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import './PostsRQ.css'
import { Link } from 'react-router-dom'

type Post = {
    id: string | number
    title: string
    body: string
}

const PostsRQ = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: () => axios.get<Post[]>('http://localhost:4000/posts')
    })

    if (isLoading) {
        return (
            <section className="posts-rq">
                <div className="posts-rq__header">
                    <span className="posts-rq__eyebrow">React Query</span>
                    <h1>Posts</h1>
                </div>
                <div className="posts-rq__grid" aria-label="Loading posts">
                    {[1, 2, 3].map((item) => (
                        <article className="post-card post-card--loading" key={item}>
                            <div className="post-card__shine post-card__shine--title" />
                            <div className="post-card__shine" />
                            <div className="post-card__shine post-card__shine--short" />
                        </article>
                    ))}
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="posts-rq">
                <div className="posts-rq__notice" role="alert">
                    <span className="posts-rq__eyebrow">Request failed</span>
                    <h1>Could not load posts</h1>
                    <p>Make sure the JSON server is running on port 4000 and try again.</p>
                </div>
            </section>
        )
    }
    console.log("DATTAA 2",data);

  return (
        <section className="posts-rq">
            <div className="posts-rq__header">
                <span className="posts-rq__eyebrow">React Query</span>
                <h1>Posts</h1>
                <p>{data?.data.length ?? 0} cached posts loaded from the API.</p>
            </div>

            <div className="posts-rq__grid">
                {data?.data.map((post) => (
                    <Link className="post-card" to={`/rq-posts/${post.id}`} key={post.id}>
                        <div className="post-card__number">{String(post.id).padStart(2, '0')}</div>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </Link>
            ))}
            </div>
        </section>
    )
}

export default PostsRQ
