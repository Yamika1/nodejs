import { useState } from 'react'; 
import { apiRequest } from '../services/api'; 
import StatusMessage from './StatusMessage'; 

function GadgetForm({ onCreated }) { 
  const [form, setForm] = useState({ 
    name: '', 
    category: '', 
    condition: 'New', 
    description: '' 
  }); 

  const [status, setStatus] = useState(''); 
  const updateField = (event) => { 
    setForm({ 
      ...form, 
      [event.target.name]: event.target.value 
    }); 
      }; 

  const handleSubmit = async (event) => { 
    event.preventDefault(); 
    setStatus(''); 
    if (!form.name || !form.category || !form.condition || !form.description) { 
      setStatus('All fields are required.'); 
      return; 
    } 
    if (form.description.length > 250) { 
      setStatus('Description must not exceed 250 characters.'); 
      return; 
    } 
    try {
      await apiRequest('/api/gadgets', { 
        method: 'POST', 
        body: JSON.stringify(form) 
      }); 
      setForm({ name: '', category: '', condition: 'New', description: '' }); 
      setStatus('Gadget created.'); 
      onCreated(); 
    } catch (error) { 
      setStatus(error.message); 
    } 
  }; 

  return ( 
    <section> 
      <h2>Add Gadget</h2> 
      <form onSubmit={handleSubmit}> 
        <div> 
          <label htmlFor="name">Name</label> 
          <input id="name" name="name" value={form.name} onChange={updateField} /> 
        </div> 
        <div> 
          <label htmlFor="category">Category</label> 
          <input id="category" name="category" value={form.category} onChange={updateField} /> 
                  </div> 
        <div> 
          <label htmlFor="condition">Condition</label> 
          <select id="condition" name="condition" value={form.condition} onChange={updateField}> 
            <option value="New">New</option> 
            <option value="Used">Used</option> 
            <option value="Refurbished">Refurbished</option> 
          </select> 
        </div> 
        <div> 
          <label htmlFor="description">Description</label> 
          <textarea 
            id="description" 
            name="description" 
            value={form.description} 
            onChange={updateField} 
          /> 
        </div> 
        <button type="submit">Create Gadget</button> 
      </form> 
      <StatusMessage message={status} /> 
    </section> 
  ); 
} 

export default GadgetForm; 
