import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const handleCreateNewClick = () => {
    navigate('/register'); // Navigate to the registration page
  };

  const navigate = useNavigate(); // Create a navigate function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState(''); // New state variable for the response message

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('API Response:', responseData);

        // Assuming the API response includes a token field
        const token = responseData.token;

        // Save the token in local storage
        localStorage.setItem('token', token);

        // Save the user data in local storage (you can customize this based on your response data)
        localStorage.setItem('user', JSON.stringify(data));
        // Update the response message
        setResponseMessage('Successfully Login');

        setTimeout(() => {
          navigate('/feedback');
        }, 100);
      } else {
        console.error('API Error:', response.status);

        // Update the response message for invalid credentials
        setResponseMessage('Invalid Credentials');
      }
    } catch (error) {
      console.error('An error occurred:', error);

      // Update the response message for errors
      setResponseMessage('An error occurred');
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
                        <br />
                      <p className='text-center'>Please login to your account</p>
                      {/* Display the response message */}
                    {responseMessage && (
                      <p className="text-center text-danger">{responseMessage}</p>
                    )}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example11">
                          Email
                        </label>
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Email address"
                          value={email}
                          onChange={handleEmailChange}
                          required
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      <div className="text-center mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                          Log in
                        </button>
                        &nbsp;
                        &nbsp;
                        <a className="text-muted " href="#!">
                          Forgot password?
                        </a>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button type="button" className="btn btn-outline-danger" onClick={handleCreateNewClick}>
                          Create new
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

export default Login;
