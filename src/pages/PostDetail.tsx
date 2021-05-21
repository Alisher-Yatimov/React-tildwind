import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { getCurrentPost } from "../store/slices/posts.slice";

interface IParams {
  id: string;
}

export const PostDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<IParams>();
  useEffect(() => {
    dispatch(getCurrentPost(Number(id)));
  }, [id]);

  const { currentPost, loading } = useAppSelector((state) => state.post);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <img
        src={`https://picsum.photos/id/${id}/1920/1080`}
        alt=""
        height="400"
        className="object-cover"
      />
      <div>
        <h2>{currentPost?.title}</h2>
        <p>{currentPost?.body}</p>
      </div>
    </>
  );
};
