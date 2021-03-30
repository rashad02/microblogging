import React from 'react';
import SignIn from './sign-in.jsx';
import Register from './register.jsx';

import './landing-page.css';
// import './main.min.css';

const LandingPage = ({isSignIn, isRegister}) => {
    return (
		<div className="theme-layout">
			<div className="container-fluid pdng0">
					<div className="row merged">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
							<div className="land-featurearea">
								<img src="images/landing-image.jpg" alt=""/>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
							<div className="login-reg-bg">
								{isSignIn ? <SignIn /> : null}
								{isRegister ? <Register /> : null}
							</div>
						</div>
					</div>
				</div>
		</div>
       
    )
};

export default LandingPage;