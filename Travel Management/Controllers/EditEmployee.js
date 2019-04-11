$(document).ready(function () {

    loadEditEmployee();
});

function loadEditEmployee()
{

    var employeeobj = {};

    employeeobj.EmpId = Session.get("EmpId");

    $.ajax({
        type: "POST",
        url: "WebService.asmx/searchEmployeeById",
        data: '{employee: ' + JSON.stringify(employeeobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $("#EmpFirstName").val(response.d.FirstName);
            $("#EmpLastName").val(response.d.LastName);
            $("#EmpEmail").val(response.d.Email);
            $("#EmpPhone").val(response.d.Phone);
            $("#EmpDepartment").val(response.d.Department);
            $("#Password").val(response.d.Password);
        },
        error: function (response) {
            toastr.warning("Problem in loading employee details !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}

function updateNewEmployee() {
    var employeeobj = {};
    employeeobj.EmpId = Session.get("EmpId");
    employeeobj.FirstName = $("#EmpFirstName").val();
    employeeobj.LastName = $("#EmpLastName").val();
    employeeobj.Email = $("#EmpEmail").val();
    employeeobj.Phone = $("#EmpPhone").val();
    employeeobj.Department = $("#EmpDepartment").val();
    employeeobj.Password = $("#Password").val();

    $.ajax({
        type: "POST",
        url: "WebService.asmx/updateEmployee",
        data: '{employee: ' + JSON.stringify(employeeobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            toastr.success("Employee Details Updated Successfullly !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
            clearform();
        },
        error: function (response) {
            toastr.warning("Problem in updating employee details !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}

function clearform()
{

    $("#EmpFirstName").val('');
    $("#EmpLastName").val('');
    $("#EmpEmail").val('');
    $("#EmpPhone").val('');
    $("#EmpDepartment").val('');
    $("#Password").val('');
}