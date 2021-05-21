import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import { IPost } from "../../types/Posts";

interface IState {
  posts: IPost[];
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
  totalCount: number;
  currentPost: IPost | null;
}

interface IGetPosts {
  type: string;
  payload: IPost[];
}

interface ISetError {
  type: string;
  payload: string;
}

interface ISetPage {
  type: string;
  payload: number;
}

interface ISetTotalCount {
  type: string;
  payload: number;
}

interface ISetCurrentPost {
  type: string;
  payload: IPost;
}
const initialState: IState = {
  posts: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  totalCount: 0,
  currentPost: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    getPost: (state, action: IGetPosts) => {
      state.posts.push(...action.payload);
    },
    setError: (state, action: ISetError) => {
      state.error = action.payload;
    },
    setPage: (state, action: ISetPage) => {
      state.page = action.payload;
    },
    setTotalCount: (state, action: ISetTotalCount) => {
      state.totalCount = action.payload;
    },
    setCurrentPost: (state, action: ISetCurrentPost) => {
      state.currentPost = action.payload;
    }
  },
});

export const fetchPosts = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(startLoading());
  const {post} = getState();
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/?_limit=${post.limit}&_page=${post.page}`);
    if (!response.ok) {
      dispatch(setError("smth went wrong"));
    } else {
      const totalCount = response.headers.get('x-total-count');
      dispatch(setTotalCount((Number(totalCount))));
      const data = await response.json();
      dispatch(getPost(data));
    }
  } catch (error) {
    dispatch(setError("smth went wrong"));
  } finally {
    dispatch(endLoading());
  }
};

export const getCurrentPost = (postId: number) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    if(!response.ok) {
      dispatch(setError("smth went wrong"));
    } else {
      const post = await response.json();
      dispatch(setCurrentPost(post));
    }
  } catch (error) {
    dispatch(setError("smth went wrong"));
  } finally {
    dispatch(endLoading());
  }
}

const { actions, reducer } = postSlice;

export const { getPost, startLoading, endLoading, setError, setPage, setTotalCount, setCurrentPost } = actions;

export default reducer;
