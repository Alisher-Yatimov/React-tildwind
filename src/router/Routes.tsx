import { Redirect, Route, Switch } from "react-router";
import { PostDetail } from "../pages/PostDetail";
import { PostPage } from "../pages/Posts";
import { routes } from "./routes";

export const Routes = () => (
    <Switch>
        <Route path={routes.posts} component={PostPage} exact/>
        <Route path={routes.postDetail} children={<PostDetail />} exact/>
        <Redirect to={routes.posts}/>
    </Switch>
)