import React, { useEffect, useState } from 'react';

//API
import * as shbApi from '../../../handler/cliApi/shb';
import * as adminApi from '../../../handler/cliApi/admin';

//Components
import CategoryListBody from './CategoryListBody';
import ControlItemDialog from './ControlItemDialog';
import DataSetLoading from './DataSetLoading';
import AddItemDialog from './AddItemDialog';
const CategoryListMain = (props) =>{
    const [shb_itemHeaders, setShb_itemHeaders] = useState(null);
    const [shb_items, setShb_items] = useState(null);

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectDialogOpen, setSelectDialogOpen] = useState(false);

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
    const [dataSetLoading, setDataSetLoading] = useState(false);

    const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
    const [selectedHeaderItem, setSelectedHeaderItem] = useState(null);
    const [addCategoryName, setAddCategoryName] = useState('');

    const [arraySetVisible, setArraySetVisible] = useState(false);
    const [arraySetHeaderItem, setArraySetHeaderItem] =  useState(null);
    const [arraySetElements, setArraySetElements] = useState([]);

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

    const _handleSelectDialogClose = async() =>{
        setSelectDialogOpen(false);
        setSelectedItem(null);
        setDeleteAlertOpen(false);
    }

    const _handleChageItemName = async(event)=>{
        setSelectedItem({...selectedItem, shb_item_name:event.target.value});
    }

    const _handleUpdateItem = async()=>{
        await setDataSetLoading(true);
        await adminApi.admin_SubCategoryNameUpdate(selectedItem)
        .then(data=>{
            if(data.message==='success'){
                _getShbItem();
                _handleSelectDialogClose();
            }else{
                alert('undefined');
                window.location.reload();
            }
        })
        await setTimeout(()=>{
            setDataSetLoading(false);
        },1000)
    }

    const _handleFinalDeleteAlertOpen = async() =>{
        setDeleteAlertOpen(true);
    }

    const _handleFinalDeleteAlertClose = async() =>{
        setDeleteAlertOpen(false);
    }

    const _handleDeleteSubCategory = async() =>{
        await setDataSetLoading(true);
        await adminApi.admin_SubCategoryDelete(selectedItem)
        .then(data=>{
            if(data.message==='success'){
                _getShbItem();
                _handleSelectDialogClose();
            }else{
                alert('undefined');
                window.location.reload();
            }
        });
        await setTimeout(()=>{
            setDataSetLoading(false);
        },1000)
    }

    const _handleAddCategoryDialogOpen = async(headerItem) =>{
        setSelectedHeaderItem(headerItem);
        setAddCategoryDialogOpen(true);
    }

    const _handleAddCategoryDialogClose = async() =>{
        setAddCategoryDialogOpen(false);
        setSelectedHeaderItem(null);
        setAddCategoryName('');
    }
    const _handleChangeAddCategoryName = async(e) =>{
        setAddCategoryName(e.target.value);
    }
    const _handleAddHeaderCategory = async() =>{
        await setDataSetLoading(true);
        await adminApi.admin_SubCategoryAdd(selectedHeaderItem,addCategoryName)
        .then(data=>{
            if(data.message==='success'){
                _getShbItem();
                _handleAddCategoryDialogClose();
            }else{
                alert('undefined');
                window.location.reload();
            }
        })
        await setTimeout(()=>{
            setDataSetLoading(false);
        },1000)
    }

    const _handleArraySetVisible = async(headerItem) =>{
        await setArraySetHeaderItem(headerItem);
        await _handleConsistArrayElements(headerItem);
        await setArraySetVisible(true);
        await _scrollMoveToComment();
    }

    const _handleConsistArrayElements = async(headerItem)=>{
        let pureElements = [];
        for(let i = 0 ; i< shb_items.length;i++){
            if(headerItem.sih_id===shb_items[i].parent_header){
                pureElements.push(shb_items[i]);
            }
        }
        setArraySetElements(pureElements);
    }
    
    const _scrollMoveToComment = () => {
        document.getElementById('CategoryArraySetArea').scrollIntoView({
            behavior: 'smooth'
        });
    }

    const _handleDataSetLoading = (bool) =>{
        setDataSetLoading(bool);
    }

    return(
        
        <div>
            {/* {console.log(shb_items)} */}
            <CategoryListBody
                {...props}
                shb_itemHeaders={shb_itemHeaders}
                shb_items={shb_items}
                arraySetVisible={arraySetVisible}
                arraySetElements={arraySetElements}
                

                _handleSelectDialogOpen={_handleSelectDialogOpen}
                _handleAddCategoryDialogOpen = {_handleAddCategoryDialogOpen}
                _handleArraySetVisible={_handleArraySetVisible}
                _handleDataSetLoading={_handleDataSetLoading}
                _getShbItem={_getShbItem}
            />
            <ControlItemDialog
                selectedItem={selectedItem}
                selectDialogOpen={selectDialogOpen}
                deleteAlertOpen = {deleteAlertOpen}

                
                _handleSelectDialogClose={_handleSelectDialogClose}
                _handleChageItemName={_handleChageItemName}
                _handleUpdateItem={_handleUpdateItem}
                _handleFinalDeleteAlertOpen = {_handleFinalDeleteAlertOpen}
                _handleFinalDeleteAlertClose = {_handleFinalDeleteAlertClose}
                _handleDeleteSubCategory = {_handleDeleteSubCategory}
            />
            <AddItemDialog
                addCategoryDialogOpen = {addCategoryDialogOpen}
                selectedHeaderItem = {selectedHeaderItem}
                addCategoryName={addCategoryName}

                _handleAddCategoryDialogClose = {_handleAddCategoryDialogClose}
                _handleChangeAddCategoryName={_handleChangeAddCategoryName}
                _handleAddHeaderCategory={_handleAddHeaderCategory}
            />

            <DataSetLoading
                open={dataSetLoading}
            />

        </div>
    );
}

export default CategoryListMain;