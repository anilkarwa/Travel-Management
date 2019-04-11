function saveNewEmployee()
{
    var employeeobj = {};

    employeeobj.FirstName = $("#EmpFirstName").val();
    employeeobj.LastName = $("#EmpLastName").val();
    employeeobj.Email = $("#EmpEmail").val();
    employeeobj.Phone = $("#EmpPhone").val();
    employeeobj.Department = $("#EmpDepartment").val();
    employeeobj.DOJ = dateformateChange( $("#DOJ").val());
    employeeobj.Type = $("#designation").val();

    $.ajax({
        type: "POST",
        url: "WebService.asmx/saveNewEmployee",
        data: '{employee: ' + JSON.stringify(employeeobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            toastr.success("New Employee Created Successfully !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
            clearform();
        },
        error: function (response) {
            toastr.warning("Problem While Creating New Employee !", {
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
   $("#DOJ").val('');
   $("#Designation").val('');
}


function dateformateChange(date) {
    var datepart = date.split("/");
    return datepart[2] + "-" + datepart[1] + "-" + datepart[0];
}