import axios from 'axios'

const path = window.location.host;

export const postFile = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    axios.post(``, formData).then(resp => resp.data);
};