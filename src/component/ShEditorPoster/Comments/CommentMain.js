import React,{useState, useEffect} from 'react';

//API
import * as shbApi from '../../../handler/cliApi/shb';

//Component
import CommentBody from './CommentBody';

const CommentMain = (props) =>{
    //state from Poster
    const {
        _sess,
        _isLogged,
        queryValues
    } = props

    //controller from Poster
    const {
        loadPost
    } = props

    const [commentInputData, setCommentInputData] = useState('');
    const [commentListData, setCommentListData] = useState(null);

    useEffect(()=>{
        // console.log(_sess);
        // console.log(_isLogged);
        loadComment();
    },[])
    const loadComment =()=>{
        shbApi.shb_getAllCommentOfCategory(_sess, queryValues.PostVal)
        .then(data=>{
            // console.log(data);
            setCommentListData(data)
        });
    }

    const handleCommentInputDataChange = (e) =>{
        setCommentInputData(e.target.value);
    }

    const handleCommentSubmit = (e) =>{
        e.preventDefault();
        // console.log(commentInputData);
        shbApi.shb_writeCommentOfCategory(_sess, commentInputData, queryValues.PostVal, queryValues.BomNo)
        .then(async data=>{
            if(data.message==='success'){
                loadComment();
                loadPost();
                setCommentInputData('');
                await scrollMoveToAddedComment();
            }else if(data.message==='failure'){
                alert('댓글 입력 오류입니다. 다시 시도해 주세요.');
                window.location.reload();
            }else if(data.message==='non-user'){
                alert('로그인이 필요한 서비스 입니다.');
                window.location.href='/login';
            }else if(data.message==='error'){
                alert('네트워크 연결이 고르지 못합니다. 다시 시도해 주세요.');
                window.location.reload();
            }else{
                alert('예상치 못한 오류가 발생했습니다. (*고객센터에 문의 바랍니다.) error num : cmt1');
            }
        })
    }

    const handleDelComment = async(cmt_id) =>{
        shbApi.shb_deleteCommentOfCategory(cmt_id, queryValues.BomNo, queryValues.PostVal)
        .then(data=>{
            // console.log(data);
            if(data.message==='success'){
                // this.setState({openCommentSnackbar:true});
                loadComment();
                loadPost();
            }else if(data.message==='failure'){
                alert('댓글 삭제 오류입니다. 다시 시도해 주세요.');
                window.location.reload();
            }else{
                alert('예상치 못한 오류가 발생했습니다. (*고객센터에 문의 바랍니다.)');
            }
        })
    }

    const scrollMoveToAddedComment = async() =>{
        await setTimeout(()=>{
            document.getElementById('comment_part').scrollIntoView({
                behavior: 'smooth',
                block:'end'
              });
        },100)
        
    }

    return(
        <CommentBody
            //state
            commentInputData={commentInputData}
            commentListData={commentListData}

            //controller
            handleCommentInputDataChange={handleCommentInputDataChange}
            handleCommentSubmit={handleCommentSubmit}
            handleDelComment={handleDelComment}
            scrollMoveToAddedComment={scrollMoveToAddedComment}
            
        />
    );
}
export default CommentMain;