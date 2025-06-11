import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate('/');
      return;
    }

    setLoading(true);
    setError('');
    appwriteService.getPost(slug)
      .then((postData) => {
        if (postData) {
          setPost(postData);
        } else {
          setError('Post not found.');
        }
      })
      .catch(() => setError('Failed to load post.'))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="py-8 text-center">
        <Container>
          <p>Loading post...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-600">
        <Container>
          <p>{error}</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
