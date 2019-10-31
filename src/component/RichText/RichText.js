import React from 'react';
import RichTextStyle from './RichText.css';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import ReactQuill, { Quill } from 'react-quill';
import { ImageUpload } from 'quill-image-upload';
import ImageResize from 'quill-image-resize-module';

import { connect } from 'react-redux';
import * as actions from '../../action';

import Paper from '@material-ui/core/Paper';
import Progress from '@material-ui/core/CircularProgress';

import Nav from '../Nav/Nav';
import UnivNav from '../Univ/layout/UnivNav';

//api
import { __get_OneUnivItem } from '../../handler/cliApi/Univ_item';
import { __sendPost } from '../../handler/cliApi/PostApi';

const propTypes = {

}

const defaultProps = {

}


class RichText extends React.Component {

    constructor(props) {
        Quill.register('modules/imageUpload', ImageUpload);
        Quill.register('modules/imageResize', ImageResize);
        super(props);
        this.state = {
            board: '',
            post_topic: '',
            Data: '포스터 작성을 시작해 보세요 !',
            image: "",
            imgLoading: false
        }
        this.onHanldeTitleChange = this.onHanldeTitleChange.bind(this);
        this.onHanldeContentChange = this.onHanldeContentChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);

        Quill.modules = {
            toolbar: {
                container: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    ['align'], [{ align: 'center' }], [{ align: 'right' }], [{ align: 'justify' }],
                    [{ size: [] }],
                    [{ color: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['link', 'image', 'video'],
                    ['clean'],
                    ['code-block'],
                ]
            },
            imageResize: {
                modules: ['Resize', 'DisplaySize']
            },
            imageUpload: {
                
                url: "/api/uploadimg/richTextImg", // server url
                method: "POST", // change query method, default 'POST'
                name: "name", // 아래 설정으로 image upload form의 key 값을 변경할 수 있다.
                withCredentials: false,

                headers: {
                    //   Authorization: `Bearer asdasdasd`,
                    //   'X-Total-Count': 0,
                },

                csrf: { token: 'token', hash: '' },

                callbackOK: (serverResponse, next) => { // 성공하면 리턴되는 함수

                    if (serverResponse.status === 'success') {
                        console.log('ok upload');
                        this.setState({ imgLoading: false });
                        next(serverResponse.url);
                    } else {
                        console.log('failed upload');
                        alert('이미지 업로드 에러');
                        this.setState({ imgLoading: false });
                    }
                },
                callbackKO: (serverError) => { // 실패하면 리턴되는 함수
                    this.setState({ imgLoading: false });
                    console.log('upload Error ')
                    alert('이미지 업로드 실패, 다시 시도해주세요.');
                },
                // optional
                // add callback when a image have been chosen
                checkBeforeSend: (file, next) => {
                    this.setState({ imgLoading: true });

                    
                    if (file) {
                        next(file);
                    } else {
                        alert('이미지 업로드 실패, 다시 시도해주세요.');
                    }

                },
            },
        };

        Quill.formats = [
            'header', 'font', 'size', 'align',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet',
            'link', 'image', 'video', 'code-block',
            'color'
        ];
    }

    async componentDidMount() {
        await __get_OneUnivItem(this.props.match.params.univ_id, this.props.match.params.board_type)
            .then(data => this.setState({ board: data }));
    }


    async onHanldeTitleChange(e) {
        await this.setState({ post_topic: e.target.value });
    }

    onHanldeContentChange(e) {
        this.setState({ Data: e });
    }

    async onHandleSubmit(e) {
        e.preventDefault();
        if(window.confirm("정말로 포스팅 하시겠습니까?")){
            await __sendPost(this.props.match.params.univ_id, this.props.match.params.board_type, this.state.post_topic, this.state.Data)
            .then(data => {
                if (data.message === 'success') {
                    this.props.history.push('./');
                } else {
                    alert('포스팅 에러');
                    window.location.reload();
                }
            });
        }else{
            return;
        }
        

    }

    imageUptoServer = async (e) =>{
        console.log(e.target.files);
        let imageData={
            name:'file',
            data:e.target.files[0]
        }
        const formData = new FormData();
        // formData.append('file', e.target.files[0]);
        formData.append(imageData.name, imageData.data);

        await Axios.post('/api/uploadimg/draft', formData, {
            onUploadProgress: progressEvent => {
                console.log(Math.round((progressEvent.loaded / progressEvent.total)*100))
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        }).then(res=> res.data)
        .then(data=>{
            console.log(data);
            let dataUrl = data.url;
            this.setState({Data:e+`<img src="${dataUrl}"/>`});
        });
    }

    render() {
        console.log(this.state.Data);
        const style = {
            paperHeader: {
                marginTop: '1rem',
                marginBottom: '1rem',
                padding: '1rem',
                fontSize: '1.5rem'
            },
            paperBody: {
                padding: '1rem',
                marginBottom: '1rem',
                fontSize: '1rem'
            },
        }

        if (this.props._isLogged) {
            return (
                <div>
                    <Nav />
                    <div className="container">
                        <Paper style={style.paperHeader}>
                            <button className="btn btn-primary" onClick={() => this.props.history.push('./')}>이전</button>
                        </Paper>
                        <Paper style={style.paperBody} className='clearfix'>
                            <form onSubmit={this.onHandleSubmit}>
                                <p>작성지 : {this.state.board.univ_item_title}</p>
                                <p>작성자 : {this.props._nickname}</p>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroup-sizing-sm">제목</span>
                                    </div>
                                    <input
                                        type="text"
                                        // name='post_topic'
                                        className="form-control"
                                        value={this.state.post_topic}
                                        onChange={this.onHanldeTitleChange}
                                        required />
                                </div>

                                {/* 이미지 업로드 테스트 시작*/}
                                <div class="input-group">
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={this.imageUptoServer}/>
                                    <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
                                </div>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button>
                                </div>
                                </div>
                                {/* 이미지 업로드 테스트 끝*/}

                                <div className="form-group">
                                    <ReactQuill
                                        modules={Quill.modules}
                                        formats={Quill.formats}
                                        value={this.state.Data}
                                        onChange={this.onHanldeContentChange}
                                    />
                                    
                                </div>
                                {this.state.imgLoading ?
                                    <h4>
                                        <span>이미지를 업로드 중입니다... 이미지 업로드 중에는 포스터를 제출 할 수 없습니다.</span>
                                        <Progress />
                                    </h4>
                                    :<input type="submit" className="btn btn-primary float-right" value='제출' />}
                            </form>
                        </Paper>
                    </div>
                </div>
            );
        } else {
            alert('로그인이 필요한 페이지입니다.');
            return (
                <Redirect to='/login' />
            );
        }
            
    }
}
            
            
            
            RichText.propTypes = propTypes;
            
            RichText.defaultProps = defaultProps;
            
const mapStateToProps = (state) => {
    return {
                            _isLogged: state.auth_user._isLogged,
                        _id: state.auth_user._id,
                        _nickname: state.auth_user._nickname
                    }
                }
                
export default connect(mapStateToProps)(RichText);