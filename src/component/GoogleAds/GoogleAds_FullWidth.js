import React from 'react';
import PropTypes from 'prop-types';

import uuidv4 from 'uuid/v4';
const initAd = () => {
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
    window.onload = function() {(window.adsbygoogle = window.adsbygoogle || []).push({})};
};

class Adsense extends React.Component {
    componentDidMount() {
        initAd();
    }

    shouldComponentUpdate(nextProps) {
        const { props: { path } } = this;
        return nextProps.path !== path;
    }

    componentDidUpdate() {
        console.log('update');
        initAd();
    }

    render() {
        const { children, className, path } = this.props;
        // console.log(path);
        return (
            // <div key={'adsense'+uuidv4()} className={`adsense`}>
            //     <ins
            //         className="adsbygoogle"
            //         style={{ display: 'block' }}
            //         data-ad-client="ca-pub-2340864651976007"
            //         data-ad-slot="7610136091"
            //         data-ad-format="auto"
            //         data-full-width-responsive="true"
            //     />
            // </div>
            <html>
            <head>
            </head>
            <body>
                <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-2340864651976007"
                    data-ad-slot="7610136091"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </body>
            </html>
        );
    }
}

Adsense.propTypes = {
    path: PropTypes.string.isRequired,
    className: PropTypes.string,
};

Adsense.defaultProps = {
    className: '',
};

export default Adsense;