import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res) {
        setPosts(res.documents);
      }
      setLoading(false);
    });
  }, []);

  return (
    <main className='w-full py-8'>
      <Container>
        {loading ? (
          <p className="text-center w-full">Loading posts...</p>
        ) : posts.length > 0 ? (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center w-full">No posts found.</p>
        )}
      </Container>
    </main>
  );
}

export default AllPosts;
