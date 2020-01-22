import React from 'react';
import styled from 'styled-components';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Container = styled.div``;
class IOSChrome extends React.Component {
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
                            <h2>아이폰 및 아이패드의 크롬에서 상해봄을 여는 방법</h2>
                            <p>크롬에서는 도메인 바로 가기 기능을 지원하지 않습니다. </p>

                            <p>1단계. 먼저 앱스토어에서 ‘단축어’(Shortcuts) 어플을 다운로드 합니다.( 아이폰 ios13 버전 이상은 자동으로 다운로드가 되어있습니다)</p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/IOSChrome/1.PNG`}
                                circular="true"
                            />
                            <p>2단계. 단축어어플을 실행한 후에 단축어 생성을 누릅니다.</p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/IOSChrome/2.PNG`}
                                circular="true"
                            />
                            <p>3단계. 동작 추가를 누른 후 웹을 누릅니다.</p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/IOSChrome/3.PNG`}
                                circular="true"
                            />
                            <p>4단계. 하단의 Chorm 메뉴에서 Chrome에서 URL 열기를 누릅니다.</p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/IOSChrome/4.PNG`}
                                circular="true"
                            />
                            <p>5단계. 입력창에 http://shbom.com을 입력한 후 상단 오른쪽에 메뉴를 클릭합니다.</p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/IOSChrome/5.PNG`}
                                circular="true"
                            />
                            <p>6단계. 단축어의 이름을 설정한 후에 홈 화면의 추가를 누릅니다.</p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/IOSChrome/6.PNG`}
                                circular="true"
                            />
                            <p>7단계. 상해봄 혹은 원하시는 이름과 아이콘을 설정한 후 추가 버튼을 누릅니다.</p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/IOSChrome/7.PNG`}
                                circular="true"
                            />
                            <p>8단계. 바탕화면의 ‘상해봄’ 아이콘을 클릭하면 편리하게 상해봄을 사용하실 수 있습니다. </p>
                            <img
                                className="user-image"
                                src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/IOSChrome/8.PNG`}
                                circular="true"
                            />
                        </div>
                    </Paper>
                </Grid>
            </Container>
        );
    }

}

export default IOSChrome;