import React from 'react';
import styled from 'styled-components';

const MainBanner = styled.div`
.carousel-inner{
    border-radius:30px;
}

.carousel{
    border-radius:30px;
    height: 21vw;
}
.main {
    height: 21vw;
    color: white;
}
.mainBene {
    font-size: 200px;
    height: 21vw;
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    padding: 0px;
    color: #636e72;
}

.mainBene img {
    /* background-color: #e9ecef; */
    height: 21vw;
    border: none;
    padding: 0px 0px;
    border-radius: 0.25rem;
}
.bene_Big_Size {
    width: 100%;
}
@media screen and (max-width:800px){
    margin-bottom:15px;
    .carousel{
        border-radius:15px;
        height: 45vw;
    }   
    .carousel-inner{
        border-radius:15px;
    }
    .main {
        height: 45vw;
        color: white;
    }
    .mainBene {
        font-size: 200px;
        height: 45vw;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        padding: 0px;
        color: #636e72;
    }

    .mainBene img {
        /* background-color: #e9ecef; */
        height: 45vw;
        border: none;
        padding: 0px 0px;
        border-radius:15px;
    }
`;

class HomeBigBanner extends React.Component{
    render(){
        // console.log(this.props.bannerHeader);
        const bannerLoading = (
            <div className="progress d-block bene_Big_Size">
                <div className="progress-bar progress-bar-striped progress-bar-animated bene_Big_Size bg-light">
                    <span className="text-secondary">image Loading...</span>
                </div>  
            </div>
        );
        const nullBanner = (
            <div className="progress d-block bene_Big_Size">
                <div className="progress-bar progress-bar-striped progress-bar-animated bene_Big_Size bg-light">
                    <span className="text-secondary">등록된 베너가 없습니다.</span>
                </div>  
            </div>
        );
        return(
            <MainBanner>
                <div id="carouselExampleControls" className="carousel slide shadow-sm animate slideIn" data-ride="carousel">
                    <div className="carousel-inner card mainBene">
                        {this.props.bannerHeader?this.props.bannerHeader.map((rows,index)=>{
                            if(rows==='nonBanner'){
                                return(nullBanner);
                            }
                            if(rows && index===0){
                                return(
                                    <div
                                        className="carousel-item active main"
                                        data-interval="4000"
                                    >
                                        <img
                                            // src={require("../../asset/6.jpg")}
                                            src={rows.banner_image}
                                            className="d-block bene_Big_Size"
                                            alt="..."
                                        />
                                    </div>
                                );
                            }
                            return(
                                <div
                                    className="carousel-item main"
                                    data-interval="4000"
                                >
                                    <img
                                        // src={require("../../asset/6.jpg")}
                                        src={rows.banner_image}
                                        className="d-block bene_Big_Size"
                                        alt="..."
                                    />
                                </div>
                            )
                        })
                        :
                        (bannerLoading)}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </MainBanner>
        );
    }
}

export default HomeBigBanner;