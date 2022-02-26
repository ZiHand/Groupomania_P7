import React from 'react';

const CommentCard = ({comment}) => 
{    
    return (
        <div className='comment_container'>
            {comment.message}
        </div>
    );
};

export default CommentCard;