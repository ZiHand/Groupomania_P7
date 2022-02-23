import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post_actions';
import { isEmpty } from './utils';
import Card from './post/card';


const Thread = () => 
{
    const [loadPost, setLoadPost]   = useState(true);
    const [count, setCount]         = useState(5);
    const dispatch                  = useDispatch();
    const posts                     = useSelector((state) => state.postReducer);

    


    useEffect(() => 
    {
        if (loadPost)
        {
            console.log("Loading Posts");
            dispatch(getPosts());
            setLoadPost(false);
        }
    }, [loadPost, dispatch, count])

    return (
        <div className='thread_container'>
            <ul>
                {!isEmpty(posts[0]) &&
                posts.map((post) => 
                {
                    return <Card post={post} key={post.id} />;
                })}
            </ul>
        </div>
    );
};

export default Thread;