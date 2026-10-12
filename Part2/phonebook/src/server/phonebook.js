import axios from 'axios'
const baseUrl = 'https://full-stack-web-development-pivg.onrender.com/api/persons'

const getAll = () => {
   const request = axios.get(baseUrl);
   return request.then(response => response.data);
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response)=>{
    return response.data
  })
  .catch((error)=>{
    console.log(error)
  })
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

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
  .then((response)=>{
    return response.data
  })
  .catch((error)=>{
    console.log(error)
  })
}

export default { getAll, create, update, deletePerson }