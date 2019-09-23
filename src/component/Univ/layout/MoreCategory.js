import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class MoreCategory extends React.Component {
    render() {
        const style = {
            Panel: {
                marginBottom: '15px',

            },
            // Summary:{
            //     textAlign:'center',
            // }
            Categorys: {
                maxHeight: '50vh'
            }
        }
        return (
            <ExpansionPanel style={style.Panel}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>카테고리</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {/* <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography> */}
                    <div className="container overflow-auto" style={style.Categorys}>
                        <div className="row">
                            <div className="col-sm">
                                <p>동아리</p>
                                <div className="list-group">
                                    <a href="#" className="list-group-item list-group-item-action">
                                        Cras justo odio
                                    </a>
                                </div>
                            </div>
                            {/* <div class="col-sm">
                            <p>카테2</p>
                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action">
                                        Cras justo odio
                                    </a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default MoreCategory;