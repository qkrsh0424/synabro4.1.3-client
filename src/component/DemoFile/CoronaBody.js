import React from 'react';
import styled from 'styled-components';

//react dom
import { Link } from 'react-router-dom';

//Core
import Grid from '@material-ui/core/Grid';

// corona
const CoronaWrapper = styled.div`
    
`;

const CoronaBox = styled.div`
    text-align:center;
    font-size:15px;
    .textRed{
        color:#bb1b1b;
    }
    .textYello{
        color:#d2a00d;
    }
    .textBlue{
        color:darkblue;
    }
    .textGreen{
        color:green;
    }
    .textTitle{
        color:#d47979;
    }

    .wrapper{
        border:1px solid #f1f1f1;
        border-radius:15px;
        margin:8px;
        padding:8px;
    }
`;

const CoronaBody = (props) => {
    const {
        coronaData,
        coronaDataKorea,
        coronaDataShanghai
    } = props;
    return (
        <div>
            <CoronaWrapper>
                <CoronaBox>
                    <h3 className='textTitle'>코로나 현황 실시간 데이터</h3>
                    {coronaData && <div>{coronaData.currentDate}</div>}
                    {coronaData?
                        <div className='wrapper'>
                            <h4>전세계(22개국)</h4>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <CoronaBox>
                                        <div className='textRed'>
                                            <div>
                                                확진자
                                        </div>
                                            <div>
                                                {coronaData.confirm}명
                                            </div>
                                        </div>

                                    </CoronaBox>
                                </Grid>
                                <Grid item xs={3}>
                                    <CoronaBox>
                                        <div className='textYello'>
                                            <div>
                                                의심환자
                                            </div>
                                            <div>
                                                {coronaData.suspect}명
                                            </div>
                                        </div>
                                    </CoronaBox>
                                </Grid>
                                <Grid item xs={3}>
                                    <CoronaBox>
                                        <div className='textBlue'>
                                            <div>
                                                사망자
                                            </div>
                                            <div>
                                                {coronaData.dead}명
                                            </div>
                                        </div>
                                    </CoronaBox>
                                </Grid>
                                <Grid item xs={3}>
                                    <CoronaBox>
                                        <div className='textGreen'>
                                            <div>
                                                치유환자
                                            </div>
                                            <div>
                                                {coronaData.heal}명
                                            </div>
                                        </div>
                                    </CoronaBox>
                                </Grid>
                            </Grid>
                        </div>
                        :
                        ''
                    }
                    {coronaDataKorea ?
                        <div className='wrapper'>
                            <h4>한국</h4>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <CoronaBox>
                                        <div className='textRed'>
                                            <div>
                                                확진자
                                        </div>
                                            <div>
                                                {coronaDataKorea.confirm}명
                                            </div>
                                        </div>

                                    </CoronaBox>
                                </Grid>
                                <Grid item xs={3}>
                                    <CoronaBox>
                                        <div className='textYello'>
                                            <div>
                                                의심환자
                                            </div>
                                            <div>
                                                {coronaDataKorea.suspect}명
                                            </div>
                                        </div>
                                    </CoronaBox>
                                </Grid>
                                <Grid item xs={3}>
                                    <CoronaBox>
                                        <div className='textBlue'>
                                            <div>
                                                사망자
                                            </div>
                                            <div>
                                                {coronaDataKorea.dead}명
                                            </div>
                                        </div>
                                    </CoronaBox>
                                </Grid>
                                <Grid item xs={3}>
                                    <CoronaBox>
                                        <div className='textGreen'>
                                            <div>
                                                치유환자
                                            </div>
                                            <div>
                                                {coronaDataKorea.heal}명
                                            </div>
                                        </div>
                                    </CoronaBox>
                                </Grid>
                            </Grid>
                        </div>
                        :
                        ''
                    }
                    {coronaDataShanghai ?
                        <div className='wrapper'>
                            <h4>상해</h4>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <CoronaBox>
                                        <div className='textRed'>
                                            <div>
                                                확진자
                                        </div>
                                            <div>
                                                {coronaDataShanghai.confirm}명
                                            </div>
                                        </div>

                                    </CoronaBox>
                                </Grid>
                                <Grid item xs={3}>
                                    <CoronaBox>
                                        <div className='textYello'>
                                            <div>
                                                의심환자
                                            </div>
                                            <div>
                                                {coronaDataShanghai.suspect}명
                                            </div>
                                        </div>
                                    </CoronaBox>
                                </Grid>
                                <Grid item xs={3}>
                                    <CoronaBox>
                                        <div className='textBlue'>
                                            <div>
                                                사망자
                                            </div>
                                            <div>
                                                {coronaDataShanghai.dead}명
                                            </div>
                                        </div>
                                    </CoronaBox>
                                </Grid>
                                <Grid item xs={3}>
                                    <CoronaBox>
                                        <div className='textGreen'>
                                            <div>
                                                치유환자
                                            </div>
                                            <div>
                                                {coronaDataShanghai.heal}명
                                            </div>
                                        </div>
                                    </CoronaBox>
                                </Grid>
                            </Grid>
                        </div>
                        :
                        ''
                    }

                </CoronaBox>
                <div className='text-center'><a href='https://news.qq.com/' target='_blank'>출처 : 腾讯新闻</a></div>
                <div style={{ border: '1px solid #f1f1f1', borderRadius: '15px', margin: '8px', padding: '15px' }} className='text-center'>
                    <Link to='/main/category/71?BomNo=1101001' style={{ fontSize: '20px' }}>코로나 게시판 바로가기</Link>
                </div>
            </CoronaWrapper>
        </div>
    );
}

export default CoronaBody;