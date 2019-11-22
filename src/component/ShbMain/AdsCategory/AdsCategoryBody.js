import React from 'react';
import styled from "styled-components";
//Material Core
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Container = styled.div`
    .title {
        font-size: 36px;
    }

    .intro {
        margin: 40px 0px;
        padding:auto;
    }
    .img{
        box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
    }
    .card-text {
        font-weight: 400;
        margin: 40px 0;
        width: 85%;
    }

    .bene_Big_Size{
        width:100%;
    }

`;

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
class AdsCategoryBody extends React.Component{
    render(){
        return(
            <div>
                <div className="container shadow-sm animate slideIn clearfix">
                    <Container>
                        <div style={style.Grid}>
                            <Grid container spacing={2}></Grid>

                            <Grid item xs={12} sm={12}>
                                <Paper style={style.paperHeader}>봄 Ads</Paper>
                            </Grid>

                            <div className="row">
                                <div className="col-md-6">
                                    <div class="intro">
                                        <div class="card-body mt-8">
                                            <h1 class="card-title mb-10">
                                                상해봄Ads와 함께 비즈니스의 성장을 이루세요
                                            </h1>
                                            <h4 class="card-text mb-40">
                                                상해봄에서는 광고주분들이 간편하고 효과적으로 광고를 할 수
                                                있게 도와드립니다.
                                            </h4>
                                            <button class="btn btn-primary" disabled>
                                            준비 중 입니다...
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="intro img">
                                        <img
                                            src={`
                                            https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/categoryIcons/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-11-15%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.44.42.png
                                            `}
                                            className="d-block bene_Big_Size"
                                            alt="..."
                                        />
                                    </div>
              
                                </div>
                                <p className="font-weight-bold py-4">
                                    현재 상해봄 Ads 프로그램은 활성화 되지 않았습니다.
                                </p>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default AdsCategoryBody;