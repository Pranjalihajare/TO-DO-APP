import { useCookies } from "react-cookie"
import { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";



export function UserDashboard(){
    
    const [cookies, setCookies, removeCookie] = useCookies('userid');
    let navigate = useNavigate();

    const [appointments, setAppointments] = useState([{Appointment_Id:0, Title:'', Description:'', date:Date(), UserId:''}]);
       

    const formik = useFormik({
      initialValues: {
        Appointment_Id:0,
        Title: '',
        Description:'',
        Date: '',
        UserId: cookies['userid']
      },
      onSubmit: (appointment => {
        axios.post('http://127.0.0.1:3300/add-task', appointment)
        .then(()=>{
          alert('Task Added Successfully..');
          window.location.reload();

        })
      })
    })

    

   
      function LoadAppointments(){
        axios.get(`http://127.0.0.1:3300/get-appointments/${cookies['userid']}`)
        .then(response=>{
            setAppointments(response.data);
        })
      }

     useEffect(()=>{
       LoadAppointments();
     },[]);

     function handleSignOut(){
        removeCookie('userid');
        navigate('/');
     }

     function handleRemoveClick(id){
      axios.delete(`htpp://127.0.0.1:3300/remove-task${id}`)
      .then(()=>{
        alert('Task Removed');
      });
      window.location.reload();
    }

     

    return(
        <div className="row pt-4">
            <div className="col-7">
                <button data-bs-target="#AddTask" data-bs-toggle="modal" style={{marginLeft:'300px', marginTop:'300px'}} className="bi bi-calendar btn btn-warning"> Add Appointment</button>
                <div className="modal fade" id="AddTask">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <form onSubmit={formik.handleSubmit} >
                      <div className="modal-header">
                        <h2>Add New Appointment</h2>
                        <button type="button" className="btn btn-close" data-bs-dismiss="modal"></button>
                      </div>
                      <div className="modal-body">
                        <dl>
                          <dt>Appointmemt Id</dt>
                          <dd><input type="number" className="form-control" name="Appointment_Id" onChange={formik.handleChange}/></dd>
                          <dt>Title</dt>
                          <dd><input type="text" name="Title" onChange={formik.handleChange} className="form-control" /></dd>
                          <dt>Description</dt>
                          <dd>
                            <textarea name="Description" onChange={formik.handleChange} className="form-control" cols="40" rows="4"></textarea>
                          </dd>
                          <dt>Date</dt>
                          <dd>
                            <input type="date" name="Date" onChange={formik.handleChange} className="form-control" />
                          </dd>
                        </dl>
                      </div>
                      <div className="modal-footer">
                        <button data-bs-dismiss="modal" className="bi bi-calendar-date btn btn-info">Add task</button>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
            </div>
            <div className="col-5">
              <h3>{cookies['userid']} - Dashboard <button onClick={handleSignOut} className="btn btn-danger">Signout</button> </h3>
              <div className="mt-4">
                {
                    appointments.map(appointment=>
                        <div key={appointment.Appointment_Id} className="alert alert-success alert-dismissible">
                           <button onClick={()=> {handleRemoveClick(appointment.Appointment_Id)}} data-bs-dismiss="alert" className="btn btn-close"></button>
                           <h2 className="alert-title">{appointment.Title}</h2>
                           <p className="alert-text">{appointment.Description}</p>
                           <p>
                             {appointment.Date}
                           </p>
                           <button className="btn btn-warning bi bi-pen-fill">Edit Task</button>
                        </div>
                        )

              }
                
            </div>
        </div>
        </div>
    )
}