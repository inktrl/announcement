import React, { useState } from 'react';

import classes from './posts.module.scss'

const Post = ({item, index, deletePost, editPost, showSimilar}) => {

    const [active, setActive] = useState(false)

    return (
        <div className={classes.post}>
            <div className={classes.col7}>
                <h4 onClick={() => setActive(!active)}>
                    {index}: {item.title}
                </h4>
                {active && <br />}
                {active && <p><strong>Description:</strong> {item.description}</p>}
                {active && <p><strong>Date Added:</strong> {item.date}</p>}
            </div>
            <div className={classes.col3}>
                <button 
                    type="button" 
                    className="btn btn-dark"
                    onClick={() => showSimilar({title: item.title, description: item.description})}
                >Show Similar</button>
                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => editPost(item.id)}
                >Edit</button>
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => deletePost(item.id)}
                >Delete</button>
            </div>
        </div>
    )
}

export default Post
