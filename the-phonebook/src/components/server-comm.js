import axios from 'axios'
const baseUrl ='/api/persons'

const getPeople= ()=>{
    const req=axios.get(baseUrl);
    return req.then(response => response.data);
}

const createPerson= (newObj)=>
{
    const sentData=axios.post(baseUrl,newObj);
    return sentData.then(response=>response.data);
}

const deletePerson= (id)=>
{
    const deleted=axios.delete(`${baseUrl}/${id}`);
    return deleted;
}

const updatePerson= (id,newObj)=>
{
    const updated=axios.put(`${baseUrl}/${id}`,newObj);
    return updated.then(response=> response.data);
}

export default { getPeople,createPerson,deletePerson,updatePerson}