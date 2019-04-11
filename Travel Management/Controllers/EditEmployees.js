$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('editempid')) {
        var empid = urlParams.get('editempid');

        loadEditEmployee(empid);
    }

});

function loadEditEmployee(empid) {

    var employeeobj = {};

    employeeobj.EmpId = empid;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/searchEmployeeById",
        data: '{employee: ' + JSON.stringify(employeeobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $("#empId").val(empid);
            $("#EmpFirstName").val(response.d.FirstName);
            $("#EmpLastName").val(response.d.LastName);
            $("#EmpEmail").val(response.d.Email);
            $("#EmpPhone").val(response.d.Phone);
            $("#EmpDepartment").val(response.d.Department);
            $("#designation").val(response.d.Type);
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
    employeeobj.EmpId = $("#empId").val();
    employeeobj.FirstName = $("#EmpFirstName").val();
    employeeobj.LastName = $("#EmpLastName").val();
    employeeobj.Email = $("#EmpEmail").val();
    employeeobj.Phone = $("#EmpPhone").val();
    employeeobj.Department = $("#EmpDepartment").val();
    employeeobj.Type = $("#designation").val();

    $.ajax({
        type: "POST",
        url: "WebService.asmx/updateEmployee",
        data: '{employee: ' + JSON.stringify(employeeobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            toastr.success("Employee Details Updated Successfully !", {
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

function clearform() {

    $("#EmpFirstName").val('');
    $("#EmpLastName").val('');
    $("#EmpEmail").val('');
    $("#EmpPhone").val('');
    $("#EmpDepartment").val('');
    $("#Password").val('');
}