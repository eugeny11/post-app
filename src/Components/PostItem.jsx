import React from 'react'
import MyButton from './UI/button/MyButton'
import {useNavigate} from 'react-router-dom'

const PostItem = (props) => {
    let navigate = useNavigate()
    const handleClick = () => {
        navigate({
            pathname:`/posts/${props.post.id}`,
            search:`${props.post.id}`
        })
    }
        
    
    return(
            <div className='post'>
                <div className='post__content'>
                    <strong>{props.post.id} {props.post.title}</strong>
                    <div>
                        {props.post.body}
                    </div>
                </div>
                <div className='post__btns'>
                    <MyButton onClick={handleClick}>Открыть пост</MyButton>
                    <MyButton onClick={() => props.remove(props.post)}>Удалить пост</MyButton>
                </div>
            </div>
       
    )
}

export default PostItem