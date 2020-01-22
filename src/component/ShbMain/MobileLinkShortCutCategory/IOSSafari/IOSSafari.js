import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Container = styled.div`
p{
  font-weight:500;
}
img .user-image {
  margin-top:25px;
  margin-bottom:15px;
  height:400px; 
}
`;

class IOSSafari extends React.Component {
    render() {
        const style = {
            paperHeader: {
                padding: "1rem",
                fontSize: "1.5rem"
            },
            paperBody: {
                padding: "1rem",
                fontSize: "1rem"
            },
            Grid: {
                padding: "8px"
            }
        };

        return (
            <Container>

                <Grid container spacing={2}></Grid>
                <Grid item xs={12} sm={12}>
                    <Paper style={style.paperBody}>
                        <div className='bodyText'>
                            <h2>아이폰 및 아이패드의 사파리에서 상해봄을 여는 방법</h2>
                            <p>1단계. 사파리를 통하여 http://www.shbom.com에 접속합니다. </p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/IOSSafari/1.PNG`}
                                circular="true"
                            />
                            <p>2단계. 하단중간의 공유 이모티콘을 누릅니다. </p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/IOSSafari/2.PNG`}
                                circular="true"
                            />
                            <p>3단계. 하단의 홈 화면에 추가하기를 누릅니다.</p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/IOSSafari/3.PNG`}
                                circular="true"
                            />
                            <p>4단계. 상해봄 혹은 원하시는 이름을 설정한 후 추가 버튼을누릅니다.</p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/IOSSafari/4.PNG`}
                                circular="true"
                            />
                            <p>5단계. 바탕화면의 ‘상해봄’ 아이콘을 클릭하면 편리하게 상해봄을 사용하실 수 있습니다.</p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/IOSSafari/5.PNG`}
                                circular="true"
                            />
                        </div>
                    </Paper>
                </Grid>
            </Container>
        );
    }
}

export default IOSSafari;
