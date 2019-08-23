import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import '../UnivNav.css';

const propTypes = {

}

const defaultProps = {

}

class UnivNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const AdapterLink = React.forwardRef((props, ref) => <NavLink activeStyle={activeStyle} innerRef={ref} {...props} />);
        const activeStyle = {
            color: 'green',
        }
        return (
            <div>
                <div className="nav-scroller bg-white shadow-sm fixed_top_second align-center">
                    <nav className="nav nav-underline">
                        {this.props.univ_item_list ? this.props.univ_item_list.map((row,index) => {
                            if (row.univ_item_address === null) {
                                return (
                                    <Link
                                        key={index}
                                        className="align-text-bottom title_font"
                                        to={'/univ/' + this.props.univ_id}
                                    >
                                        {this.props.univ_title}
                                    </Link>
                                );
                            }
                            return (
                                <NavLink
                                    key={index}
                                    className="nav-link"
                                    activeStyle={activeStyle}
                                    to={'/univ/' + this.props.univ_id + '/' + row.univ_item_address}
                                >
                                    {row.univ_item_title}
                                </NavLink>
                            );
                        }) : ""}
                    </nav>
                </div>
            </div>
        );
    }
}

UnivNav.propTypes = propTypes;

UnivNav.defaultProps = defaultProps;

export default (UnivNav);