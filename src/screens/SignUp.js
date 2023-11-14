import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SignUp() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the registration page
  };
  const [name, setName] = useState(''); // Add state for the name field
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value); // Handle name input changes
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name, // Include the name in the data object
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('API Response:', responseData);
        navigate('/login');
      } else {
        console.error('API Error:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-6">
          <div className="card rounded-3 text-black">
            <div className="row g-0">
              <div className="col-lg-12">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                      <img
                        src="/images/logo.png"
                        style={{ width: '185px' }}
                        alt="logo"
                      />
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p className='text-center'>Please SignUp to your account</p>
                      <div className="form-outline mb-4">
                      <label className="form-label" >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          value={name}
                          onChange={handleNameChange}
                          required
                        />
                       
                      </div>
                      <div className="form-outline mb-4">
                      <label className="form-label" >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email address"
                          value={email}
                          onChange={handleEmailChange}
                          required
                        />
                       
                      </div>
                      <div className="form-outline mb-4">
                      <label className="form-label" >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                        
                      </div>
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                          Create New
                        </button>
                        &nbsp;
                        &nbsp;
                        
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Already a Member?</p>
                        <button type="button" className="btn btn-outline-danger" onClick={handleLoginClick}>
                          Login In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
