$(document).ready(function () {
    managerMappingList();
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


                if (!response.d[1].managerDelete) {
                    $(".managerDeleteRole").hide();

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

function managerMappingList() {
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getManagerMappingList",
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
            var table = $("#mappingListTable").DataTable();
            table.clear().draw();

            $.each(response.d, function (key, value) {
                table.row.add($('<tr>' +
                    '<td>'+value.FirstName +" " +value.LastName + '</td>' +
                    '<td>' + value.ManagerName1+'</td>' +
                    '<td>' + value.ManagerName2 +'</td>' +
                    '<td>' + value.ManagerName3 +'</td>' +
                    '<td>' + value.ManagerName4 +'</td>' +
                    '<td>' + value.ManagerName5 +'</td>' +
                    '<td><a id="' + value.MappingId + '" class="managerDeleteRole" onclick="DeleteMapping(this.id)"  style="color:red; margin-left:10px;"><i class="la la-archive" style="font-size:20px!important;"></i></a></td></tr> ')).draw(false);
            });
            loadUserSettingForEdit(Session.get("EmpId"));
        },
        error: function (response) {
            toastr.warning("Problem Loading Manager Mapping List !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}

function DeleteMapping(mappingid)
{

    swal({
        title: 'Are you sure?',
        text: "You are going to delete manager mappping!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
        if (result.value) {
            var approvalobj = {};
            approvalobj.MappingId = mappingid;

            $.ajax({
                type: "POST",
                url: "WebService.asmx/deleteManagerMapping",
                data: '{mapping: ' + JSON.stringify(approvalobj) + '}',
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    swal("Deleted!", "Employee manager mapping deleted.", "success");
                    managerMappingList();
                },
                error: function (response) {
                    toastr.warning("Problem In Deleting Manager Mapping  !", {
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

