import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function MyPosts() {
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData?.$id) {
            appwriteService.getPosts([])  // get all posts
                .then((posts) => {
                    if (posts?.documents) {
                        const filtered = posts.documents.filter(
                            (post) => post.userId === userData.$id
                        );
                        setMyPosts(filtered);
                    }
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false); // no user, no posts
        }
    }, [userData]);

    return (
        <div className="py-8">
            <Container>
                <h1 className="text-2xl font-bold mb-4">My Posts</h1>

                {loading ? (
                    <p className="text-center text-gray-500">Loading your posts...</p>
                ) : myPosts.length > 0 ? (
                    <div className="flex flex-wrap">
                        {myPosts.map((post) => (
                            <div key={post.$id} className="w-full md:w-1/2 lg:w-1/4 p-2">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No posts found.</p>
                )}
            </Container>
        </div>
    );
}

export default MyPosts;
