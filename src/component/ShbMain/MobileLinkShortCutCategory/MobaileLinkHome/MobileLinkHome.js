import React from 'react';
import styled from 'styled-components';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { textAlign } from '@material-ui/system';

const Container=styled.div`

`;
class MobileLinkHome extends React.Component {
    render(){
        const style = {
            paperHeader: {
                padding: "1rem",
                fontSize: "1.5rem"
            },
            paperBody: {
                padding: "1rem",
                fontSize: "1rem",
                textAlign:"center"
            },
            Grid: {
                padding: "8px"
            }
        };
        return(
            <Container>
                <Grid container spacing={2}></Grid>
            <Grid item xs={12} sm={12}>
              <Paper style={style.paperBody}>
              <div className='bodyText font-weight-bold'>
                  <p>다음은 프로세스를 도와주는 단계별 가이드입니다. 이 가이드를 통해 모바일에서 상해봄을 편리하게 사용하실 수 있습니다.</p>
                  <img
            className="user-img"
            src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/ShortCut/Mobile/Home/logo2.png`}
            circular="true"
          />
          </div>
                  </Paper>
            </Grid>
                
            </Container>
        );
    }

}

export default MobileLinkHome;