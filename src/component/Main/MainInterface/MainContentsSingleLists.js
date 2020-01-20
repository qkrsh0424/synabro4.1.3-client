import React from 'react';
import styled from 'styled-components';

//React Dom
import { Link } from 'react-router-dom';
//Core
import IconButton from '@material-ui/core/IconButton';

const Body = styled.div`
    // border:1px solid black;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075) !important;
    margin: 8px 0;
`;

const ListContainer = styled.div`
    margin: 0 1rem;
    padding: 8px 8px;
    list-style-type:none;
    white-space:nowrap;
    overflow-x:auto;
`;

const ListItem = styled.div`
    display:inline-block;
    padding:8px;
    text-align:center;
`;

const IconImage = styled.img`
    width:60px;
    height:60px;
    border-radius:15px;
`;
const ItemIcon = styled.div`
    
`;

const ItemTitle = styled.div`
    font-weight:500;
    font-size:14px;
`

const PageLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const MainContentsSingleLists = (props) => {
    return (
        <Body>
            <ListContainer>
                {props.shb_lists ? props.shb_lists.map(rows => {
                    if (rows.shb_num === 1101001) {
                        return (
                            <ListItem>
                                <ItemIcon>
                                    <IconButton
                                        to={`/${rows.shb_classify}`}
                                        // onClick={this.memoryScroll}
                                        component={PageLink}
                                    >
                                        {rows.shb_icon_url ?
                                            <IconImage src={rows.shb_icon_url} /> :
                                            <IconImage src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/categoryIcons/android-icon-144x144.png`} />
                                        }
                                    </IconButton>
                                </ItemIcon>
                                <ItemTitle>
                                    {rows.shb_name}
                                </ItemTitle>
                            </ListItem>
                        );
                    }
                }) : ""}

                {props.shb_main_items ? props.shb_main_items.map(rows => {
                    if (rows.shb_item_classify!=='board') {
                        if(rows.shb_item_classify==='partner' || rows.shb_item_classify==='ads'){
                            return (
                                <ListItem>
                                    <ItemIcon>
                                        <IconButton
                                            to={`/${rows.parent_route}/category/${rows.shb_item_id}?BomNo=${rows.shb_num}`}
                                            // onClick={this.memoryScroll}
                                            component={PageLink}
                                            style={{opacity:'0.4'}}
                                            disabled
                                        >
                                            {rows.shb_item_icon_url ?
                                                <IconImage src={rows.shb_item_icon_url} /> :
                                                <IconImage src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/categoryIcons/android-icon-144x144.png`} />
                                            }
                                        </IconButton>
                                    </ItemIcon>
                                    <ItemTitle style={{opacity:'0.4', fontSize:'10px'}}>
                                        {rows.shb_item_name}<br/>(준비중..)
                                    </ItemTitle>
                                </ListItem>
                            );
                        }else{
                            return (
                                <ListItem>
                                    <ItemIcon>
                                        <IconButton
                                            to={`/${rows.parent_route}/category/${rows.shb_item_id}?BomNo=${rows.shb_num}`}
                                            // onClick={this.memoryScroll}
                                            component={PageLink}
                                        >
                                            {rows.shb_item_icon_url ?
                                                <IconImage src={rows.shb_item_icon_url} /> :
                                                <IconImage src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/categoryIcons/android-icon-144x144.png`} />
                                            }
                                        </IconButton>
                                    </ItemIcon>
                                    <ItemTitle>
                                        {rows.shb_item_name}
                                    </ItemTitle>
                                </ListItem>
                            );
                        }
                        
                    }
                }) : ""}
            </ListContainer>
        </Body>
    );
}

export default MainContentsSingleLists;