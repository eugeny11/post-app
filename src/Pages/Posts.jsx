import React, {useState, useEffect} from 'react'
import {useFetching} from '../Hooks/useFetching'
import {usePosts} from '../Hooks/usePosts'
import { getPagesCount } from '../Utils/Pages'
import PostService from '../Components/API/PostService'
import MyButton from '../Components/UI/button/MyButton'
import MyModal from '../Components/UI/MyModal/MyModal'
import PostForm from '../Components/PostForm'
import PostFilter from '../Components/PostFilter'
import PostList from '../Components/PostList'
import Pagination from '../Components/UI/Pagination/Pagination'
import Loader from '../Components/UI/Loader/Loader'

function Posts() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  
  const [fetchPosts, isPostLoading, postError] = useFetching( async(limit,page) => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount, limit))
  })

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  useEffect(() => {
    fetchPosts(limit, page)
  },[])

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  
  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)} style={{marginTop: '30px'}}>
        Создать пользователя
      </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
        </MyModal>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter filter={filter} setFilter={setFilter}/>
        {postError &&
        <h1>Произошла ошибка</h1>
        }
        {isPostLoading
        ?<div style={{display:'flex', justifyContent:'center', marginTop:50}}><Loader /></div>
        :<PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS'/>
        }
        
        <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
