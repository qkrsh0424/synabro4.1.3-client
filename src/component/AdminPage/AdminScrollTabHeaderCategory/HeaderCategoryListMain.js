import React, { useEffect, useState } from 'react';

//API
import * as shbApi from '../../../handler/cliApi/shb'
import * as adminApi from '../../../handler/cliApi/admin'

//Components
import HeaderCategoryListBody from './HeaderCategoryListBody';
import ControlItemDialog from './ControlItemDialog';
import RenameLoading from './RenameLoading';
import AddItemDialog from './AddItemDialog';

const CategoryListMain = (props) =>{
    const [shb_itemHeaders, setShb_itemHeaders] = useState(null);
    const [shb_items, setShb_items] = useState(null);

    const [selectDialogOpen, setSelectDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [renameLoading, setRenameLoading] = useState(false);

    const [lastDeleteAlert, setLastDeleteAlert] = useState(false);

    const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
    const [addCategoryName, changeAddCategoryName] = useState('');

    useEffect(() =>{
        _getShbItemHeader();
        _getShbItem();
    },[])

    const _getShbItemHeader = async()=>{
        await shbApi.shb_getShbAllItemHeader(props.group.shb_num)
        .then(data=>{
            setShb_itemHeaders(data.data);
        });
    }

    const _getShbItem = async() => {
        await adminApi.admin_getSubCategoryListAll(props.group.shb_num)
        .then(data=>setShb_items(data.data));
    }

    const _handleSelectDialogOpen = async(item) =>{
        setSelectedItem(item);
        setSelectDialogOpen(true);
    }

    const _handleSelectDialogClose = async()=>{
        setSelectDialogOpen(false);
        setSelectedItem(null);
        setLastDeleteAlert(false);
    }

    const _handleChageItemName = async(event) =>{
        setSelectedItem({
            ...selectedItem,
            sih_name:event.target.value
        });
    }

    const _handleUpdateItem = async() =>{
        // console.log(selectedItem);
        setRenameLoading(true);
        await adminApi.admin_HeaderCategoryNameUpdate(selectedItem)
        .then(data=>{
            if(data.message==='success'){
                _handleSelectDialogClose()
                _getShbItemHeader();
            }else{
                alert('undefined');
                window.location.reload();
            }
        })
        await setTimeout(()=>{
            setRenameLoading(false);
        },1000)
    }

    const _handleLastDeleteAlertOpen = async()=>{
        setLastDeleteAlert(true)
    }

    const _handleLastDeleteAlertClose = async()=>{
        setLastDeleteAlert(false);

    }

    const _handleDeleteHeaderCategory = async() =>{
        setRenameLoading(true);
        await adminApi.admin_HeaderCategoryDelete(selectedItem)
        .then(data=>{
            if(data.message==='success'){
                _handleSelectDialogClose();
                _getShbItemHeader();
            }else{
                alert('undefined');
                window.location.reload();
            }
        })
        await setTimeout(()=>{
            setRenameLoading(false);
        },1000)
    }

    const _handleAddCategoryDialogOpen = async() =>{
        setAddCategoryDialogOpen(true);
    }

    const _handleChageAddCategoryName = async(event) =>{
        changeAddCategoryName(event.target.value);
    }

    const _handleAddCategoryDialogClose = async() =>{
        setAddCategoryDialogOpen(false);
        changeAddCategoryName('');
    }

    const _handleAddHeaderCategory = async() =>{
        setRenameLoading(true);
        await adminApi.admin_HeaderCategoryAdd(props.group.shb_num, addCategoryName, props.group.shb_classify)
        .then(data=>{
            if(data.message==='success'){
                setAddCategoryDialogOpen(false);
                changeAddCategoryName('');
                _getShbItemHeader();
            }else{
                alert('undefined');
                window.location.reload();
            }
        })
        await setTimeout(()=>{
            setRenameLoading(false);
        },1000)
    }

    const _handleSetRenameLoading = async(bool) =>{
        setRenameLoading(bool);
    }

    return(
        
        <div>
            <HeaderCategoryListBody
                {...props}
                shb_itemHeaders={shb_itemHeaders}
                shb_items={shb_items}

                _getShbItemHeader={_getShbItemHeader}
                _getShbItem={_getShbItem}
                _handleSelectDialogOpen={_handleSelectDialogOpen}
                _handleAddCategoryDialogOpen={_handleAddCategoryDialogOpen}
                _handleSetRenameLoading={_handleSetRenameLoading}
            />

            <ControlItemDialog
                selectDialogOpen={selectDialogOpen}
                selectedItem = {selectedItem}
                lastDeleteAlert = {lastDeleteAlert}

                _handleSelectDialogClose = {_handleSelectDialogClose}
                _handleChageItemName = {_handleChageItemName}
                _handleUpdateItem = {_handleUpdateItem}
                _handleLastDeleteAlertOpen={_handleLastDeleteAlertOpen}
                _handleLastDeleteAlertClose = {_handleLastDeleteAlertClose}
                _handleDeleteHeaderCategory = {_handleDeleteHeaderCategory}
            />

            <AddItemDialog
                addCategoryDialogOpen = {addCategoryDialogOpen}
                addCategoryName = {addCategoryName}

                _handleAddCategoryDialogClose = {_handleAddCategoryDialogClose}
                _handleChageAddCategoryName = {_handleChageAddCategoryName}
                _handleAddHeaderCategory = {_handleAddHeaderCategory}
            />

            <RenameLoading
                open={renameLoading}
            />
        </div>
    );
}

export default CategoryListMain;