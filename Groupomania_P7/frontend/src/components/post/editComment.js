import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment, getPosts } from "../../actions/post_actions";
import { UidContext } from "../app_context";

const EditComment = ({ comment, postId }) => 
{
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit]         = useState(false);
  const [text, setText]         = useState(comment.message);
  const uid                     = useContext(UidContext);
  const dispatch                = useDispatch();

  const handleEdit = (e) => 
  {
    e.preventDefault();

    console.log("handleEdit");
    console.log(text);

    if (text) 
    {
      
      dispatch(editComment(comment.id, text))
      .then(() => dispatch(getPosts()))
      //setText("");
      setEdit(false);
      
    }
  };

  const handleDelete = () => 
  {
      dispatch(deleteComment(comment.id))
      .then(() => dispatch(getPosts()))
      setEdit(false);
  }

  useEffect(() => 
  {
    const checkAuthor = () => 
    {
        if (uid.uid === comment.userId) 
        {
            setIsAuthor(true);
        }
    };
    checkAuthor();
  }, [uid, comment.userId]);

  return (
    <div className="edit_comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit_comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit_comment_form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.message}
          />
          <br />
          <div className="btn">
            <input type="submit" value="Valider modification" />
            <span
              onClick={() => 
              {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) 
                {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditComment;
