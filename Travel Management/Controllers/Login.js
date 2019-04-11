var globalOTP = 0, empName = "", empId = 0;

$(document).ready(function () {

    $("#forgotpasswordPage").hide();
    $("#otpPage").hide();
    $("#newpasswordPage").hide();
});

function authenticateEmp() {
    var userobj = {};
    userobj.Email = $('#user-name').val();
    userobj.Password = $('#password').val();

    $.ajax({
        type: "POST",
        url: "WebService.asmx/authenticateUser",
        data: '{employee: ' + JSON.stringify(userobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            if (response.d.EmpId != null) {
                Session.set("Session_User", 'true');
                Session.set("EmpId", response.d.EmpId);
                Session.set("EmpFirstName", response.d.FirstName);
                Session.set("EmpLastName", response.d.LastName);
                Session.set("EmpDepartment", response.d.Department);
                Session.set("EmpEmail", response.d.Email);
                Session.set("EmpPhone", response.d.Phone);
                Session.set("EmpType", response.d.Type);
                getEmployeeApproverManager(response.d.EmpId);

              
            }
            else {
                toastr.warning("Invalid Credentials, Try Again !", {
                    showMethod: "slideDown",
                    hideMethod: "slideUp",
                    timeOut: 2e3
                });
            }
        },
        error: function (response) {
            alert('errorr');
        }

    });
}

function getEmployeeApproverManager(empid)
{
    var userobj = {};
    userobj.EmpId = empid;


    $.ajax({
        type: "POST",
        url: "WebService.asmx/getEmployeeManager",
        data: '{employee: ' + JSON.stringify(userobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            if (response.d.ApproverManagerId != null) {
                Session.set("ApproverManagerId", response.d.ApproverManagerId);
                Session.set("ApproverManagerMapped", 'Yes');
                window.location = "Default.aspx";
            }
            else {
                Session.set("ApproverManagerMapped", 'No');
                
            }
        },
        error: function (response) {
            toastr.warning("No Manager Mapped  !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}

function showForgotPasswordPage()
{
    $("#loginpage").hide();
    $("#forgotpasswordPage").show();
}

function showLoginpage(pagid)
{
    $("#loginpage").show();
    $("#"+pagid).hide();
}

function generateOTP()
{
    var userobj = {};
    userobj.Phone = $("#userPhone").val();


    $.ajax({
        type: "POST",
        url: "WebService.asmx/checkEmployeeByPhone",
        data: '{employee: ' + JSON.stringify(userobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            if (response.d.EmpId != null) {
                empId = response.d.EmpId;
                globalOTP = response.d.OTP;
                empName = response.d.FirstName + " " + response.d.LastName;
                $("#forgotpasswordPage").hide();
                $("#otpPage").show();
                $("#empDisplayName").text(empName);
            }
            else {
                toastr.warning("Employee Not Found, Try Again  !", {
                    showMethod: "slideDown",
                    hideMethod: "slideUp",
                    timeOut: 2e3
                });
            }

        },
        error: function (response) {
            toastr.warning("Problem Sending OTP  !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}

function checkOTP()
{
    var enteredOTP = $("#OTPnumber").val();
    if (enteredOTP == globalOTP)
    {
        $("#otpPage").hide();
        $("#newpasswordPage").show();
    }
    else {
        toastr.warning("Invalid OTP Entered, Try Again  !", {
            showMethod: "slideDown",
            hideMethod: "slideUp",
            timeOut: 2e3
        });
    }
}

function changePassword()
{
    var userobj = {};
    userobj.Password = $("#newpassword").val();
    userobj.EmpId = empId;


    $.ajax({
        type: "POST",
        url: "WebService.asmx/changeEmployeePassword",
        data: '{employee: ' + JSON.stringify(userobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            if (response.d) {
                $("#newpasswordPage").hide();
                $("#loginpage").show();
                toastr.success("Password Changed Successfully   !", {
                    showMethod: "slideDown",
                    hideMethod: "slideUp",
                    timeOut: 2e3
                });
            }
            else {
                toastr.warning("Problem Updating Password   !", {
                    showMethod: "slideDown",
                    hideMethod: "slideUp",
                    timeOut: 2e3
                });
            }

        },
        error: function (response) {
            toastr.warning("Problem Updating Password, Try Again  !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}