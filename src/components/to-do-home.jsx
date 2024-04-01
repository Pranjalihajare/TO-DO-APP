import { Link } from "react-router-dom"

export function ToDoHome(){
    return(
        <div>
            <h1 className="text-end text-white pt-4">Your Appointments - To-Do</h1>
            <main style={{height:'px'}} className=" me-4 pe-4 d-flex justify-content-end align-item-center">
                <Link to='/register' className="btn btn-info me-2">New User Register</Link>
                <Link to='/login' className="btn btn-warning">User Login</Link>
            </main>
        </div>
    )
}