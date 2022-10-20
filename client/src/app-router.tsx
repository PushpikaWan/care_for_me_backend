import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PostPage from './components/post_page/post_page';

function AppRouter() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/:postId" element={<PostPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default AppRouter;
