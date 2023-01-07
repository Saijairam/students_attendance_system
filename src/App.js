import './App.css';
import { useState,useEffect } from 'react';


function App() {
  
   const [name, setname] = useState("");
   const [roll,setroll] = useState("");
   const [timein,settimein] = useState("");
   const [timeout,settimeout] = useState("");

   const [list, setlist] = useState([]);

   const fetchData = async()=>{
    await fetch('http://localhost:5000/students').then((res)=>res.json()).then((res)=>setlist(res)).catch((err)=>console.log(err.message));
   }

   useEffect(()=>{
      fetchData();
   },[])

  //  console.log(list);
  const addstudent = async (student)=>{
    await fetch('http://localhost:5000/students',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body : JSON.stringify(student),
    }).then((res)=>res.json()).then((res)=>setlist([...list,res])).catch((err)=>console.log(err.message));  
  }

  const data = {name,roll,timein,timeout};

   const handleSubmit = (e)=>{
      e.preventDefault();
      if(!name){
        alert("Please enter the name of Student");
        return;
      }
      addstudent(data);
      setname("");
      setroll("");
      settimein("");
      settimeout("");
      alert("Student is added")
   }

   const checkAttendance = ()=>{
    // alert("Checking...");
    
    const d = new Date();
    var hr = d.getHours();
    var min = d.getMinutes();
    var checktime = hr + ":" + min;
    console.log(checktime);
    
    var count = 0;

    list.map((item)=>{
     if(item.timein < checktime < item.timeout){
          count++;
      }
      return count;      
    })
 
    alert(`${count} students are present right now..`)

   }

  return (
    <div className="App">
      <div className='heading'>
        <h2>Students Attendance System</h2>
      </div>
      <form onSubmit={handleSubmit} className='form'> 
        <div className='sub-form name_field'>
          <label>Student Name</label>
          <input type='text' name='name'  onChange={(e)=>setname(e.target.value)}/>
        </div>
        <div className='sub-form roll_field'>
           <label>Roll No</label>
           <input type='text' name='roll' onChange={(e)=>setroll(e.target.value)}/>
        </div>
        <div className='sub-form checkin'>
           <label>Checkin Time</label>
           <input type='time' name='checkin'  onChange={(e)=>settimein(e.target.value)}/>
        </div>
        <div className='sub-form checkout'>
           <label>Checkout Time</label>
           <input type='time' name='checkout'  onChange={(e)=>settimeout(e.target.value)}/>
        </div>
        <input type='submit' value='Submit' className='submit'/>
      </form>
      <div className='present'>
         <button onClick={()=>checkAttendance()}>Present attendance</button>
         <p className='text-field'>Click button to know how many students are present right now.</p>
      </div>
      <div className='output'>
         {list.map((item)=>(
          <div className='sub-output' key={item.id}>
            <p>Name : <span>{item.name}</span></p>
            <p>Roll Number : <span>{item.roll}</span></p>
            <p>CheckIn : <span>{item.timein}</span></p>
            <p>CheckOut : <span>{item.timeout}</span></p>
          </div>
         ))}
      </div>
      
    </div>
  );
}

export default App;
