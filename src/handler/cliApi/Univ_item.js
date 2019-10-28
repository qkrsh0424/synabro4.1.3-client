import Axios from 'axios';

//URL
import { serverUrl } from '../../config/serverUrl';

export function __get_OneUnivItem(univ_id, board_type){
    return Axios.get(`${serverUrl}/api/univ_item/${univ_id}`,{
        params:{
            board_type: board_type
        }
    })
    .then(response=>response.data);
}