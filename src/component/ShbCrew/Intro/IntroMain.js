import React from 'react';

import {connect} from'react-redux';
//API
import * as api from '../../../handler/cliApi/shb';
//Component
import Nav from '../../Nav/Nav';
import IntroBody from './IntroBody';

class IntroMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shb: null,
            shbParentRoute:null
        }
    }

    componentDidMount = () => {
        this._getShb();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.location !== this.props.location) {
            this._getShb();
        }
    }

    _getShb = async () => {
        // await api.shb_getShbAllList("crew") //crew는 선택사항.
        // .then(data=>this.setState({shb:data.data, shbParentRoute:'crew'}));
        await api.shb_getShbAllList(this.props.match.params.crew) //crew는 선택사항.
            .then(data => this.setState({ shb: data.data,shbParentRoute:this.props.match.params.crew }));
    }

    render() {
        // console.log(this.state.shb);
        return (
            <div>
                <Nav />
                <IntroBody
                    {...this.props}
                    {...this.state}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        parentRoute: state.parent_route.parentRoute,
    }
}

export default connect(mapStateToProps)(IntroMain);