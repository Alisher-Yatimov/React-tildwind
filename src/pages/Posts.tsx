import React from "react";
import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { Pagination } from "../components/Pagination";
import { PostCard } from "../components/PostCard";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchPosts, setPage } from "../store/slices/posts.slice";

export const PostPage = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, page, totalCount, limit } = useAppSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [page]);

  const setPageHandler = (page: number) => {
    dispatch(setPage(page));
  }

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader />
        </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
      <Pagination countOfPages={Math.floor(totalCount / limit)} currentPage={page} setPage={setPageHandler} />
    </>
  );
};
