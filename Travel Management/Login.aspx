<!DOCTYPE html>
<html class="loading" lang="en" data-textdirection="ltr">
  <head>
    <title>Travel Management</title>

     <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <link rel="apple-touch-icon" href="Assets/app-assets/images/ico/apple-icon-120.png">
    <link rel="shortcut icon" type="image/x-icon" href="Assets/app-assets/images/ico/favicon.ico">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Quicksand:300,400,500,700" rel="stylesheet">
    <link href="Assets/app-assets/fonts/line-awesome/css/line-awesome.min.css" rel="stylesheet">
    <!-- BEGIN VENDOR CSS-->
    <link rel="stylesheet" type="text/css" href="Assets/app-assets/css/vendors.min.css">

    <link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/forms/icheck/icheck.css">
    <link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/forms/icheck/custom.css">
    <link rel="stylesheet" type="text/css" href="Assets/app-assets/css/pages/login-register.min.css">
<!-- END VENDOR CSS-->
    <!-- BEGIN MODERN CSS-->
    <link rel="stylesheet" type="text/css" href="Assets/app-assets/css/app.min.css">
    <!-- END MODERN CSS-->
    <!-- BEGIN Page Level CSS-->
    <link rel="stylesheet" type="text/css" href="Assets/app-assets/css/core/menu/menu-types/vertical-content-menu.min.css">
    <link rel="stylesheet" type="text/css" href="Assets/app-assets/css/core/colors/palette-gradient.min.css">
    <link rel="stylesheet" type="text/css" href="Assets/app-assets/css/pages/login-register.min.css">
    <!-- END Page Level CSS-->
    <!-- BEGIN Custom CSS-->
    <link rel="stylesheet" type="text/css" href="Assets/assets/css/style.css">
    <link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/extensions/toastr.css">
    <link rel="stylesheet" type="text/css" href="Assets/app-assets/css/plugins/extensions/toastr.min.css">
    <!-- END Custom CSS-->

    <script src="Controllers/Login.js" type="text/javascript"></script>
    <script src="Scripts/session.js" type="text/javascript"></script>
    <script src="Scripts/json-serialization.js"></script>

    <script>
    $(document).ready(function () {

        if ( Session.get("Session_User") !== undefined) {

            window.location = 'Default.aspx';
            return false;
        }
    });
</script>

  </head>
    <body class="vertical-layout vertical-content-menu 1-column  bg-full-screen-image menu-expanded blank-page blank-page" data-open="click" data-menu="vertical-content-menu" data-col="1-column">

 <div class="app-content content">
      <div class="content-wrapper">
        <div class="content-header row">
        </div>
        <div class="content-body"><section class="flexbox-container">

    <div class="col-12 d-flex align-items-center justify-content-center" >
        <div class="col-md-4 col-10 box-shadow-2 p-0">
			<div class="card border-grey border-lighten-3 m-0">
              <div id="loginpage">
				<div class="card-header border-0">
					<div class="card-title text-center">
						<i style="font-size:100px" class="la la-user"></i>
					</div>
					<h6 class="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span>Login in Account</span></h6>
				</div>
				<div class="card-content">
					<div class="card-body">
						<form class="form-horizontall" onsubmit="authenticateEmp(); return false;" >
							<fieldset class="form-group position-relative has-icon-left">
								<input type="email" class="form-control input-lg" id="user-name" placeholder="Your Username" tabindex="1" required data-validation-required-message= "Please enter your username.">
								<div class="form-control-position">
								    <i class="ft-user"></i>
								</div>
								<div class="help-block font-small-3"></div>
							</fieldset>
							<fieldset class="form-group position-relative has-icon-left">
								<input type="password" class="form-control input-lg" id="password" placeholder="Enter Password" tabindex="2" required data-validation-required-message= "Please enter valid passwords.">
								<div class="form-control-position">
								    <i class="la la-key"></i>
								</div>
								<div class="help-block font-small-3"></div>
							</fieldset>
							
							<button type="submit" class="btn btn-danger btn-block btn-lg"><i class="ft-unlock"></i> Login</button>
						</form>
					</div>
				</div>
				<div class="card-footer border-0">
					<p class="card-subtitle line-on-side text-muted text-center font-small-3 mx-2 my-1"><span>Forgot Password ?</span></p>
					<a href="#" onclick="showForgotPasswordPage(); return false;" class="btn btn-info btn-block btn-lg mt-3"><i class="ft-user"></i> Reset</a>
				</div>
			</div>
     <!-- Forgort Password -->
 
               <div id="forgotpasswordPage">
                <div class="card-header border-0 pb-0">
                    <div class="card-title text-center">
                        <h2>Forgot Password</h2>
                    </div>
                    <h6 class="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span>We will send you OTP  to reset password.</span></h6>
                </div>
                <div class="card-content">
                    <div class="card-body">
                        <form class="form-horizontal" onsubmit="generateOTP(); return false;"  >
                            <fieldset class="form-group position-relative has-icon-left">
                                <input type="text" class="form-control form-control-lg input-lg" id="userPhone" maxlength="10" pattern="[\d0-9]{10}" placeholder="Your Registered Mobile Number" required>
                                <div class="form-control-position">
                                    <i class="la la-phone"></i>
                                </div>
                            </fieldset>
                            <button type="submit" class="btn btn-outline-info btn-lg btn-block"><i class="la la-envelope"></i> Request OTP</button>
                        </form>
                    </div>
                </div>
                <div class="card-footer border-0">
                    
                    <p class="float-sm-right text-center">Already Registered ? <a href="#" onclick="showLoginpage('forgotpasswordPage')" class="card-link">Login</a></p>
                </div>
           </div>

   <!-- OTP Form -->
            <div id="otpPage">
                <div class="card-header border-0 pb-0">
                    <div class="card-title text-center">
                        <h2>Enter OTP</h2>
                    </div>
                    <h6 class="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span><span id="empDisplayName"></span>Shortly you will receive OTP on your registered number.</span></h6>
                </div>
                <div class="card-content">
                    <div class="card-body">
                        <form class="form-horizontal" onsubmit="checkOTP(); return false;">
                            <fieldset class="form-group position-relative has-icon-left">
                                <input type="text" class="form-control form-control-lg input-lg" id="OTPnumber" maxlength="5" pattern="[\d0-9]{5}" placeholder="Enter 5 digit OTP" required>
                                <div class="form-control-position">
                                    <i class="la la-phone"></i>
                                </div>
                            </fieldset>
                            <button type="submit" class="btn btn-outline-info btn-lg btn-block"><i class="la la-check-circle"></i> Submit </button>
                        </form>
                    </div>
                </div>
                <div class="card-footer border-0">
                    
                    <p class="float-sm-right text-center">Already Registered ? <a href="#" onclick="showLoginpage('otpPage')" class="card-link">Login</a></p>
                </div>
            </div>


<!-- New Password Form -->

              <div id="newpasswordPage">
                <div class="card-header border-0 pb-0">
                    <div class="card-title text-center">
                        <h2>New Password</h2>
                    </div>
                    <h6 class="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span>Please enter new password for your account.</span></h6>
                </div>
                <div class="card-content">
                    <div class="card-body">
                        <form class="form-horizontal"  onsubmit="changePassword(); return false;" >
                            <fieldset class="form-group position-relative has-icon-left">
                                <input type="password" class="form-control form-control-lg input-lg" id="newpassword"  placeholder="Enter new password" required>
                                <div class="form-control-position">
                                    <i class="la la-chevron-right"></i>
                                </div>
                            </fieldset>
                            <button type="submit" class="btn btn-outline-info btn-lg btn-block"><i class="la la-check-circle"></i> Save Password </button>
                        </form>
                    </div>
                </div>
                <div class="card-footer border-0">
                    
                    <p class="float-sm-right text-center">Already Registered ? <a href="#" onclick="showLoginpage('newpasswordPage')" class="card-link">Login</a></p>
                </div>

            </div>
          </div>
		</div>
    </div>


</section>
        </div>
      </div>
    </div>


    <!-- BEGIN VENDOR JS-->
    <script src="Assets/app-assets/vendors/js/vendors.min.js" type="text/javascript"></script>
    <!-- BEGIN VENDOR JS-->
    <!-- BEGIN PAGE VENDOR JS-->
    <script src="Assets/app-assets/vendors/js/ui/headroom.min.js" type="text/javascript"></script>
    <script src="Assets/app-assets/vendors/js/forms/validation/jqBootstrapValidation.js" type="text/javascript"></script>
    <script src="Assets/app-assets/vendors/js/forms/icheck/icheck.min.js" type="text/javascript"></script>
    <!-- END PAGE VENDOR JS-->
    <!-- BEGIN MODERN JS-->
    <script src="Assets/app-assets/js/core/app-menu.min.js" type="text/javascript"></script>
    <script src="Assets/app-assets/js/core/app.min.js" type="text/javascript"></script>
    <script src="Assets/app-assets/vendors/js/extensions/toastr.min.js" type="text/javascript"></script>
    <!-- END MODERN JS-->
    <!-- BEGIN PAGE LEVEL JS-->
<%--    <script src="Assets/app-assets/js/scripts/forms/form-login-register.min.js" type="text/javascript"></script>--%>
    <!-- END PAGE LEVEL JS-->
  </body>
</html>

