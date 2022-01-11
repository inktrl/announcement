import './App.css';
import Post from './components/Post/post';
import React, { useState, useMemo, useEffect } from 'react';


function App() {
  const fullDate = new Date().toLocaleDateString()

  const [posts, setPosts] = useState([])
  const [btnEditSave, setBtnEditSave] = useState('Add post')
  const [btnSearch, setBtnSearch] = useState(false)

  const [newPost, setNewPost] = useState({
    title: '',
    description: ''
  })

  const [searchQuery, setSearchQuery] = useState('')

  function createPost () {
    const post = {
      id: Date.now(),
      title: newPost.title,
      description: newPost.description,
      date: fullDate
    }
    setPosts([...posts, post])
  }

  function deletePost(postId) {
    setPosts(posts.filter(item => item.id !== postId))
  }

  function editPost(postId) {
    setBtnEditSave('Save post')
    const editPostObj = posts.filter(item => item.id === postId)[0]
    setNewPost({
      ...newPost,
      id: editPostObj.id,
      title: editPostObj.title,
      description: editPostObj.description
    })
  }

  function changePost() {
    const newObj = posts.map(item => {
      if(item.id === newPost.id) {
        return item = {...item, title: newPost.title, description: newPost.description}
      } else {
        return item
      }
    })
    setPosts([...newObj])
  }

  const [searchedPosts, setSearchedPosts] = useState([])

  useEffect(() => {
    setSearchedPosts(posts.filter(item => item.title.toLowerCase().includes(searchQuery)))
  }, [searchQuery, posts]);



  function showSimilar(postObj) {
    const similarPosts = posts.filter(item => {
      if(item.title === postObj.title.toLowerCase() || item.description === postObj.description.toLowerCase()) {
        return item
      }
    })
    setSearchedPosts(similarPosts.slice(0, 3))
  }


  return (
    <div className="App">
      <div style={{margin: '20px auto'}} className="container col-5">
        <h1 style={{display: 'flex', alignItems: 'left'}}>New announcement</h1>
        <hr/>
        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search posts" 
            aria-label="Search posts" 
            aria-describedby="button-addon2"
            onChange={(event) => setSearchQuery(event.target.value)}
            value={searchQuery}
          />
          <button 
            className="btn btn-outline-secondary" 
            type="button" 
            id="button-addon2"
            onClick={() => setBtnSearch(!btnSearch)}
          >Search</button>
        </div>
        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter title" 
            aria-label="Enter title" 
            aria-describedby="button-addon2"
            onChange={(event) => setNewPost({...newPost, title: event.target.value})}
            value={newPost.title}
          />
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter description" 
            aria-label="Enter description" 
            aria-describedby="button-addon3"
            onChange={(event) => setNewPost({...newPost, description: event.target.value})}
            value={newPost.description}
          />
          <button 
            className="btn btn-outline-secondary" 
            type="button" 
            id="button-addon3"
            onClick={() => {
              if(newPost.description && newPost.title) {
                if(btnEditSave === 'Add post') {
                  createPost()
                  setNewPost({...newPost, title: '', description: ''})
                } else {
                  changePost()
                  setBtnEditSave('Add post')
                  setNewPost({...newPost, title: '', description: ''})
                }
              } 
            }}
          >{btnEditSave}</button>
        </div>
        <div className="mb-3" style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button 
            type="button" 
            className="btn btn-success" 
            style={{marginRight: '15px'}}
            onClick={() => setSearchedPosts(posts)}
          >Clear Similar Filter</button>
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={() => setPosts([])}
          >Delete All Elements</button>
        </div>
        {searchedPosts.length
        ? searchedPosts.map((item, index) => <Post item={item} key={item.id} index={index + 1} deletePost={deletePost} editPost={editPost} showSimilar={showSimilar}/>)
        : `Not post...` }
        
      </div>
    </div>
  );
}

export default App;
