import React from 'react';

class AdminBody extends React.Component{
    render(){
        // console.log(this.props.members);
        return(
            <div>
                {this.props.group?this.props.group.shb_name:""}
                {this.props.members?this.props.members.map((rows,index)=>{
                    return(
                        <div>
                            <p><span>{index+1} : </span><span>{rows.user_nickname}</span></p>
                        </div>
                    )
                }):
                ""}
            </div>
        );
    }
}

export default AdminBody;