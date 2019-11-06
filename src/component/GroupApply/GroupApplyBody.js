import React from 'react';

class GroupApplyBody extends React.Component{
    render(){
        if(this.props.queryValues.BomNo){
            return(
                <div className='container pt-3'>
                    <h3 className='text-center'><em>{this.props.shb && this.props.univ===null?this.props.shb.shb_name:""}{this.props.univ&&this.props.shb===null?this.props.univ.univ_title:""}</em> 가입 신청</h3>
                    <p className='text-danger text-center'>
                        *약관) 그룹 가입 신청시 현재 프로필 상에 등록 되어 있는, 혹은 상해봄 가입때 등록하였던 개인 패스워드와 개인 key 를 제외한 정보를 해당 그룹의 관리자에게 양도하게 됩니다.
                    </p>
                    
                    <form onSubmit={this.props._handleOnSubmit}>
                        
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck1" required/>
                            <span class="form-check-label text-secondary" for="gridCheck1">
                                약관을 읽었으며, 약관에 동의합니다.
                            </span>
                        </div>
                        <br/>
                        <div class="form-group">
                            <label>가입 신청서</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" value={this.props.applyResume} onChange={this.props._handleOnChange} rows="3" required></textarea>
                        </div>
                        <button type='submit' className='btn btn-success'>신청하기</button>
                    </form>
                </div>
            );
        }else{
            return(
                <div>
                    donthave
                </div>
            );
        }
        
    }
}

export default GroupApplyBody