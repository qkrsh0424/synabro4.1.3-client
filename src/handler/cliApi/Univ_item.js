import Axios from 'axios';

export function __get_OneUnivItem(univ_id, board_type){
    return Axios.get('/api/univ_item/'+univ_id,{
        params:{
            board_type: board_type
        }
    })
    .then(response=>response.data);
}