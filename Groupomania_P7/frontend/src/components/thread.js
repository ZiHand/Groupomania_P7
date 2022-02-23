import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post_actions';
import { isEmpty } from './utils';
import Card from './post/card';

// ===============================================
// Thread
// ===============================================
const Thread = () => 
{
    const showPostCount             = 5;
    const [loadPost, setLoadPost]   = useState(true);
    const [count, setCount]         = useState(showPostCount);
    const dispatch                  = useDispatch();
    const posts                     = useSelector((state) => state.postReducer);

    // ================================
    // loadMore
    // ================================
    const loadMore = () =>
    {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight)
        {
            setLoadPost(true);
        }
    }

    // ================================
    // useEffect
    // ================================
    useEffect(() => 
    {
        if (loadPost)
        {
            dispatch(getPosts(count));
            setLoadPost(false);
            setCount(count + showPostCount);
        }

        // Add an event listener on scroll
        window.addEventListener("scroll", loadMore);

        // NEED to remove the event listener at the end (only with use effect)
        return () => window.removeEventListener("scroll", loadMore);

    }, [loadPost, dispatch, count])

    // ================================
    // Main Render
    // ================================
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

// ===============================================
// export
// ===============================================
export default Thread;