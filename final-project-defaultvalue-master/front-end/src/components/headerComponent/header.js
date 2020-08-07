import React from 'react';
import Popup from 'reactjs-popup';
import {Link} from 'react-router-dom'


// function Header(){
//     return(
//         <header>
//             <nav class="navbar navbar-expand-lg navbar-light bg-light">
//                 <a class="navbar-brand" href="#">Navbar</a>
//                 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span class="navbar-toggler-icon"></span>
//                 </button>
//                 <div class="collapse navbar-collapse" id="navbarNav">
//                     <ul class="navbar-nav">
//                         <li class="nav-item active">
//                             <Link to="/">Home</Link>
//                         </li>
//                         <li class="nav-item">
//                             <Link to="/resume">Resume</Link>
//                         </li>
//                         <li class="nav-item">
//                             <Link to="/projects">Projects</Link>
//                         </li>
//                     </ul>
//                     <Popup trigger={<button> Login</button>} modal closeOnDocumentClick>
//                         <form action="http://localhost:9000/login" method="post">
//                             <div class="form-group">
//                                 <label for="usernameLabel">Username</label>
//                                 <input type="text" class="form-control" id="usernameLabel" placeholder="enter username"/>
//                             </div>
//                             <div class="form-group">
//                                 <label for="passwordLabel">Password</label>
//                                 <input type="password" class="form-control" id="passwordLabel"/>
//                             </div>

//                             <button type="submit" class="btn btn-success">Submit</button>
//                         </form>
//                     </Popup>
//                 </div>
//             </nav>
//         </header>
//     )
// }

// export default Header


class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {username:'',password:'',message:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event){
        //
        // alert(this.state.username +" "+ this.state.password);
        // alert("Hello World")
        if(this.state.username === '' || this.state.password === ''){
            alert('Empty input')
            return;
        }
        fetch('http://localhost:9000/login',{
            method:'post',
            body: `username=${this.state.username}&password=${this.state.password}` 
        })
        .then((any)=> console.log(any))
        .then((response) => response.json )
        .then((result) => console.log('Success', result))
        .catch((error)=> console.log('Error',error) )
        event.preventDefault();
    }

    render(){
        return (
        <header >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Resume App</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className='nav-link' to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/resume">Resume</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/projects">Projects</Link>
                        </li>
                    </ul>
                    <Popup trigger={<button className="btn btn-primary btn-lg"> Login</button>} modal closeOnDocumentClick>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="usernameLabel">Username</label>
                                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} className="form-control" id="usernameLabel" placeholder="enter username"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordLabel">Password</label>
                                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="passwordLabel"/>
                            </div>
                            {`[[username=${this.state.username}+password=${this.state.password}`}
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </Popup>
                </div>
            </nav>
        </header> 
        )
    }
}

export default Header