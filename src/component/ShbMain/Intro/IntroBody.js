import React from 'react';
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Container = styled.div`

  .title {
    padding:200px 0;
    width:80%;
    /* padding:0 140; */
    margin:0 auto;
    text-align: center;
    text-rendering:optimizeLegibility;
    font-weight:500;
    /* font-size:3vw; */
    word-break:keep-all;
    
    
    align-items:center;
    @media only screen and (max-width:800px){
        padding:120px 0;
    font-size:24px;
    }
  }
  .pink {
    color: #eaa4bc;
  }
  .blue {
    color: #4285f4;
  }
  .red {
    color: #ea4334;
  }
  .green {
    color: #34a853;
  }
  .yellow {
    color: #f9ab00;
  }
  .intro {
    padding-top: 60px;
    text-align: center;
  }
  .box {
    margin-bottom: 10px;
    font-size: 20px;
    padding: 30px 100px 70px 100px;
    opacity: 0.9;
    @media only screen and (max-width:800px){
        padding: 10px 40px 40px 40px;
    }
  }

  .introBox {
      margin:0 auto;
      width:82%;
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
    @media only screen and (max-width:800px){
        width:100%;
    }
  }
`;
class IntroBody extends React.Component {
    render() {
        const style = {
            paperHeader: {
                padding: "1rem",
                fontSize: "1.5rem",
                marginTop:'1rem',
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
                <div className="container shadow-sm animate slideIn clearfix">
                    <div style={style.Grid}>
                        <Grid container spacing={2}></Grid>
                        <Grid item xs={12} sm={12}>
                            <Paper style={style.paperHeader}>상해봄 소개</Paper>
                        </Grid>
                        <h1 className="title">
                            <span className="pink">상해봄</span>의 목표는 상해 내의
                            <span className="blue"> 정보</span>를
                            <span className="red"> 효율적</span>으로 관리해
                            <span className="green"> 한인들의 삶의 질</span>을
                            <span className="yellow"> 향상</span>시키는 것입니다.
                        </h1>
                        <div className="introBox">
                            <h2 className="intro">인사말</h2>
                            <div className="box">
                                안녕하세요. 저희는 현재 상해에서 유학 생활을 하고 있는
                                상해봄팀 입니다. 2018년 10월 이후 중국정부는 네이버
                                블로그, 카페, 다음 카페 등 접속을 차단하였습니다. 이러한
                                사이트들은 저희 한인들이 많은 정보를 교류하는 곳이었지만,
                                현재 VPN을 사용하지 않으면 접속할 수 없게 되었습니다. 그
                                후 웨이신 단톡방들이 정보교류의 역할을 대신해주고 있지만,
                                한인들이 정보교류를 효율적으로 하기에는 기능이 제한적이고
                                정보의 다양성이나 활용성 또한 많이 부족하다고 판단을
                                하였습니다. 그래서 저희는 한인들이 훨씬 더 효율적으로
                                정보를 교류하고 더 나아가 삶의 질을 향상시킬 수 있는
                                플랫폼을 필요성을 느끼게 되었고 개발했습니다. 저희의
                                상해봄 커뮤니티는 앞으로 유학생부터 시작하여 상해에
                                거주하시는 직장인분들까지 많은 정보교류를 할 수 있도록
                                다양한 콘텐츠와 필요한 기능들을 지속적으로 개발할
                                계획입니다. 저희의 상해봄 플랫폼이 많은 분들의 다양한
                                문제를 해결해드리고 도움이 되기를 바라면서 상해봄을 통해
                                정말로 많은 분들의 삶의 질이 향상되기를 기원하겠습니다.
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default IntroBody;