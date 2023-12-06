import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComments, removeComments } from "../Components/Redux/CommentSlice";
import { v4 as uuid } from 'uuid';

const Comment = () => {
    const [replyIndex, setReplyIndex] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const darkMode = useSelector((store) => store.cart?.dark)
    const commentStore = useSelector((store) => store?.comments?.commentsArray)
    const dispatch = useDispatch()

    const handleDeleteComments = (id) => {
        dispatch(removeComments(id));
    }

    const handleReply = (id) => {
        console.log("id inside handleReply", id)
        setReplyIndex(id);
    };

    const handleSendReply = (id) => {
        const newId = uuid();
        const uniqueId = newId.slice(0, 8);

        dispatch(addComments({
            id: uniqueId,
            parentId: replyIndex, // Set the parentId for nesting
            name: "Your Name",
            email: "Your Email",
            comments: replyContent,
        }));

        setReplyIndex(null);
        setReplyContent("");
    };

    return (
        <div>
            <div className={`border-2 border-gray-300 p-6 mb-4 w-96 ${darkMode ? 'darkModeCSS' : 'bg-gray-100'}`}>
                <h1 className={`text-lg font-semibold text-center`}>Previous Queries</h1>
                {commentStore.map((comment, index) => (
                    <div key={comment.name} className={`my-2 border-2 border-gray-300 bg-gray-200 rounded-mdc w-80 p-2 mb-2`}>
                        <div className={`text-lg font-semibold w-60 `}>{comment.name}</div>
                        <div className={`text-md ml-2`}>{comment.comments}</div>
                        <button className={`text-sm ml-2`} onClick={() => handleDeleteComments(comment.id)}>delete</button>
                        <button className={`text-sm ml-2`} onClick={() => handleReply(comment.id)}>reply</button>

                        {/* Show reply input if replyIndex matches the current comment id */}
                        {console.log('replyIndex here', replyIndex, 'commentID', comment.id)}
                        {replyIndex === comment.id && (
                            <div className={`ml-6 flex flex-wrap flex-row gap-3`}>
                                <input
                                    type="text"
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                />
                                <button className={`text-lg font-semibold text-center`} onClick={() => handleSendReply(comment.id)}>send</button>
                            </div>
                        )}
                        {console.log('nested', comment.nestedComment)}
                        {/* Render nested comments */}
                        {comment.nestedComments && comment.nestedComments.map((nestedComment) => (
                            <div key={nestedComment.id} className={`ml-6 border-2 border-gray-300 bg-gray-200 rounded-mdc w-60 p-1 mb-1`}>
                                <div className={`text-lg font-semibold`}>{nestedComment.name}</div>
                                <div className={`text-md ml-2`}>{nestedComment.comments}</div>
                                <button className={`text-sm ml-2`} onClick={() => handleDeleteComments(nestedComment.id)}>delete</button>
                                <button className={`text-sm ml-2`} onClick={() => handleReply(nestedComment.id)}>reply</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comment;
