$(document).ready(function () {
    loadAllEmployees();

   
});



  function loadUserSettingForEdit(usercode) {

    var settingobj = {};
    settingobj.Empid = usercode;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getUserSettingsById",
        data: '{setting: ' + JSON.stringify(settingobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            if (response.d[0] !== "" || response.d[0] !== null || response.d[0] !== undefined) {
                updateingUserSetting = true

                // Employee
                if (!response.d[0].empEdit) {
                    $(".empEditRole").hide();
                }
                
                if (!response.d[0].empDelete) {
                   $(".empDeleteRole").hide();
                }
                
                
             
            }
        },
        error: function (response) {
            $.toast({
                heading: 'Error Load User Settings',
                text: 'Please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function loadAllEmployees() {

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getAllEmployeeList",
        contentType: "application/json",
        dataType: "json",
        cache: true,
        beforeSend: function () {
            $('#loaderImage').show();
            $('#overlay').show();
        },
        complete: function () {
            $('#loaderImage').hide();
            $('#overlay').hide();
        },
        success: function (response) {
            var table = $("#employeeListTable").DataTable();
            table.clear().draw();

            $.each(response.d, function (key, value) {
                table.row.add($('<tr>' +
                    '<td>' + value.EmpId + '</td>' +
                    '<td>'+value.DOJ+'</td>' +
                    '<td>'+value.FirstName+ value.LastName + '</td>' +
                    '<td>'+value.Email+'</td>' +
                    '<td>'+value.Phone+'</td>' +
                    '<td>'+value.Department+'</td>' +
                    '<td>'+value.Type+'</td>' +
                    '<td><a id="' + value.EmpId + '" onclick="loadEditEmployeeDetails(this.id)"  style="color:yellowgreen; margin-left:10px;"><i class="la la-edit empEditRole" style="font-size:20px!important;"></i></a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a id="' + value.EmpId + '" onclick="DeleteEmployee(this.id)"  style="color:red; margin-left:10px;"><i class="la la-archive empDeleteRole" style="font-size:20px!important;"></i></a> </td></tr> ')).draw(false);
            });
            loadUserSettingForEdit(Session.get("EmpId"));
        },
        error: function (response) {
            toastr.warning("Problem Loading Employees List !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}

function loadEditEmployeeDetails(empid)
{
    window.location.href = "http://47.23.106.203/travelmanagement/EditEmployees.aspx?editempid=" + empid;
}

function DeleteEmployee(empid)
{
    swal({
        title: 'Are you sure?',
        text: "You are going to delete employee!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
        if (result.value) {
            var approvalobj = {};
            approvalobj.EmpId = empid;

            $.ajax({
                type: "POST",
                url: "WebService.asmx/deleteEmployee",
                data: '{employee: ' + JSON.stringify(approvalobj) + '}',
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    swal("Deleted!", "Employee successfully deleted.", "success");
                    loadAllEmployees();
                },
                error: function (response) {
                    toastr.warning("Problem Deleting Employee !", {
                        showMethod: "slideDown",
                        hideMethod: "slideUp",
                        timeOut: 2e3
                    });
                }

            });
        } else {
            swal("Cancelled", "You have cancelled the operation :)", "error");
        }
    });

}
