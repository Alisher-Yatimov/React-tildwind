import { Link } from "react-router-dom";
import { routes } from "../router/routes";
import { IPost } from "../types/Posts";

interface IProps {
  post: IPost;
}

export const PostCard = (props: IProps) => {
  const { post } = props;
  return (
    <Link to={`${routes.posts}/${post.id}`} className="max-w-3xl w-full hover:shadow-xl transition duration-300 transform hover:scale-110">
      <article className="p-4 flex space-x-4">
        <img
          src={`https://picsum.photos/id/${post.id}/200/300`}
          alt=""
          className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
          width="144"
          height="144"
        />
        <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20 w-full">
          <h2 className="text-lg font-semibold text-black mb-0.5">
            {post.title}
          </h2>
          <div className="max-w-md">
            <p className="text-sm">{post.body}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};
