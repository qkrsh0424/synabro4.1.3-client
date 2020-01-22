import React from 'react';
import styled from 'styled-components';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Container = styled.div``;
class AndrioidSamsung extends React.Component {
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
                            <h2>갤럭시에서 상해봄을 여는 방법</h2>

                            <p>1단계. 삼성인터넷으로 상해봄 사이트에 접속하셔서 왼쪽 하단에 있는 버튼을 누릅니다.</p>
                            <img
                                className="user-image"
                                src={"https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/AndroidSamsung/1.jpeg"}
                                circular="true"
                            />
                            <p>2단계. 현재 페이지 추가를 누릅니다.</p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/AndroidSamsung/2.jpeg`}
                                circular="true"
                            />
                            <p>3단계. 홈화면을 누릅니다</p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/AndroidSamsung/3.jpeg`}
                                circular="true"
                            />
                            <p>4단계. 하단 오른쪽에 추가 버튼을 누릅니다.</p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/AndroidSamsung/4.jpeg`}
                                circular="true"
                            />
                            <p>5단계. 홈화면에 상해봄 바로가기가 생깁니다.</p>
                        </div>
                    </Paper>
                </Grid>
            </Container>
        );
    }

}

export default AndrioidSamsung;