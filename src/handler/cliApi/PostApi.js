import Axios from 'axios';

export function __sendPost(univ_id, post_type, post_topic, post_desc) {
    let url = '/api/univ_post/writePost'
    // let formData = new FormData();
    // formData.append("univ_id", univ_id);
    // formData.append("post_type", post_type);
    // formData.append("post_topic", post_topic);
    // formData.append("post_desc", post_desc);

    return Axios.post(url, {
        univ_id: univ_id,
        post_type: post_type,
        post_topic: post_topic,
        post_desc: post_desc,
        headers: {
            'content-type': `multipart/form-data;`,
        },
    })
        .then(response => response.data)
        .catch(function (error) {
            console.log(error);
        });

    // this.setState({
    //     Data: ''
    // });

}