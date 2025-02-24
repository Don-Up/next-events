"use client"
import {useEffect, useState} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import {getPostJsonConfig} from "@/helpers/app-utils";
import {useNotificationContext} from "@/store/notification-context";

function Comments(props) {
    const {eventId} = props;

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([])
    const [isFetchingComments, setIsFetchingComments] = useState(false)
    const {showNotification} = useNotificationContext()

    useEffect(() => {
        if (showComments) {
            setIsFetchingComments(true)
            fetch("/api/comments/" + eventId)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setIsFetchingComments(false)
                    setComments(data.comments)
                });
        }
    }, [showComments]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        showNotification({
            title: 'Sending comment...',
            message: 'Your comment is being stored into a database.',
            status: 'pending'
        })
        // send data to API
        fetch("/api/comments/" + eventId,
            getPostJsonConfig(commentData))
            .then((response) => {
                if (response.ok) {
                    showNotification({
                        title: 'Success!',
                        message: 'Successfully added comment',
                        status: 'success'
                    })
                    return response.json()
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message || 'Something went wrong!')
                    })
                }
            })
            .then(data => {
                // Add the new comment inside the list of comments
                comments.push({
                    id: data.comment.id,
                    comment: commentData.comment,
                    name: commentData.name,
                    email: commentData.email,
                })
            })
            .catch(error => {
                showNotification({
                    title: 'Error!',
                    message: error.message || 'Error occurred',
                    status: 'error'
                })
            })
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler}/>}
            {showComments && !isFetchingComments && <CommentList items={comments}/>}
            {showComments && isFetchingComments && <p>Loading...</p>}
        </section>
    );
}

export default Comments;
