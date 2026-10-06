import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
   const request = axios.get(baseUrl);
   return request.then(response => response.data);
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, changedObject) => {
  return axios.put(`${baseUrl}/${id}`, changedObject)
  .then((response)=>{
    return response.data
  })
  .catch((error)=>{
    console.log(error)
  })
}

export default { getAll, create, update }