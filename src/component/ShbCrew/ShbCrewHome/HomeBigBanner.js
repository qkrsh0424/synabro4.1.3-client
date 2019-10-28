import React from 'react';

class HomeBigBanner extends React.Component{
    render(){
        const beneLoading = (
            <div className="progress d-block bene_Big_Size">
                <div className="progress-bar progress-bar-striped progress-bar-animated bene_Big_Size bg-light">
                    <span className="text-secondary">image Loading...</span>
                </div>  
            </div>
        );
        return(
            <div id="carouselExampleControls" className="carousel slide shadow-sm animate slideIn" data-ride="carousel">
                <div className="carousel-inner">
                {this.props.beneBig?this.props.beneBig.map((row,index)=>{
                    if(index===0){
                        return(
                            <div key={index} className="carousel-item active" data-interval="2000">
                                <img src={row.bene_image} className="d-block bene_Big_Size" alt="..."/>
                            </div>
                        );
                    }else{
                        return(
                            <div key={index} className="carousel-item" data-interval="2000">
                                <img src={row.bene_image} className="d-block bene_Big_Size" alt="..."/>
                            </div>
                        );
                    }
                }):beneLoading}
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
        );
    }
}

export default HomeBigBanner;