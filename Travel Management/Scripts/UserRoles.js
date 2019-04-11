var selectEmpId = 0;
var updateingUserSetting = false;
$(document).ready(function () {
    loadUserSettingForEdit(Session.get("EmpId"));
    $("#searchEmp").select2({
        ajax: {
            url: "WebService.asmx/searchEmployeeByName",
            dataType: 'json',
            method: 'POST',
            contentType: "application/json",
            data: function (params) {
                return '{q: ' + JSON.stringify(params.term) + '}'
            },
            processResults: function (data, params) {


                return { results: data.d };
            },
            cache: true
        },

        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 1,
        templateResult: formatRepo,
        templateSelection: formatRepoSelection
    });

    function formatRepo(repo) {
        if (repo.loading) {
            return repo.text;
        }

        var markup = repo.FirstName + " " + repo.LastName;

        return markup;
    }


    function formatRepoSelection(repo) {

        var FullName = repo.FirstName + " " + repo.LastName;
        return FullName || repo.text;

    }

    $("#searchEmp").change(function () {
        var data = $(this).select2('data');
        selectEmpId = data[0].id;
        loadUserSettingForEdit(data[0].id);
    });


    /*function loadUserSettingForEdit(usercode) {

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

                    if (response.d[4].rolesAdd) {
                        $("#submitUserSettings").show();
                    }
                    if (!response.d[4].rolesEdit) {
                        $("#UpdateUserSettings").hide();
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
    }*/

});

function onCheckAllAddClick() {
    if ($('#chkAdd').is(":checked")) {
        $('#empAdd').prop('checked', true);
        $('#managerAdd').prop('checked', true);
        $('#TravelAdd').prop('checked', true);
        $('#ReportAdd').prop('checked', true);
        $('#rolesAdd').prop('checked', true);
       
    }
    else {
        $('#empAdd').prop('checked', false);
        $('#managerAdd').prop('checked', false);
        $('#TravelAdd').prop('checked', false);
        $('#ReportAdd').prop('checked', false);
        $('#rolesAdd').prop('checked', false);
    }
}

function onCheckAllEditClick()
{
    if ($('#chkEdit').is(":checked")) {
        $('#empEdit').prop('checked', true);
        $('#managerEdit').prop('checked', true);
        $('#TravelEdit').prop('checked', true);
        $('#ReportEdit').prop('checked', true);
        $('#rolesEdit').prop('checked', true);

    }
    else {
        $('#empEdit').prop('checked', false);
        $('#managerEdit').prop('checked', false);
        $('#TravelEdit').prop('checked', false);
        $('#ReportEdit').prop('checked', false);
        $('#rolesEdit').prop('checked', false);
    }
}

function onCheckAllDeleteClick()
{
    if ($('#chkDelete').is(":checked")) {
        $('#empDelete').prop('checked', true);
        $('#managerDelete').prop('checked', true);
        $('#TravelDelete').prop('checked', true);
        $('#ReportDelete').prop('checked', true);
        $('#rolesDelete').prop('checked', true);

    }
    else {
        $('#empDelete').prop('checked', false);
        $('#managerDelete').prop('checked', false);
        $('#TravelDelete').prop('checked', false);
        $('#ReportDelete').prop('checked', false);
        $('#rolesDelete').prop('checked', false);
    }
}

function onCheckAllPrintClick() {

    if ($('#chkPrint').is(":checked")) {
        $('#empPrint').prop('checked', true);
        $('#managerPrint').prop('checked', true);
        $('#TravelPrint').prop('checked', true);
        $('#ReportPrint').prop('checked', true);
        $('#rolesPrint').prop('checked', true);

    }
    else {
        $('#empPrint').prop('checked', false);
        $('#managerPrint').prop('checked', false);
        $('#TravelPrint').prop('checked', false);
        $('#ReportPrint').prop('checked', false);
        $('#rolesPrint').prop('checked', false);
    }
}

function onCheckAllViewClick()
{
    if ($('#chkView').is(":checked")) {
        $('#empView').prop('checked', true);
        $('#managerView').prop('checked', true);
        $('#TravelView').prop('checked', true);
        $('#ReportView').prop('checked', true);
        $('#rolesView').prop('checked', true);

    }
    else {
        $('#empView').prop('checked', false);
        $('#managerView').prop('checked', false);
        $('#TravelView').prop('checked', false);
        $('#ReportView').prop('checked', false);
        $('#rolesView').prop('checked', false);
    }
}


function saveUserRoles()
{
    if (updateingUserSetting !== false) {
        updateUserRoles();
    } else {

        var settingObj = {};

        settingObj.Empid = selectEmpId;

        var empAdd = false, empEdit = false, empDelete = false, empView = false, empPrint = false;

        if ($('#empAdd').is(":checked")) {
            empAdd = true;
        }
        if ($('#empEdit').is(":checked")) {
            empEdit = true;
        }
        if ($('#empDelete').is(":checked")) {
            empDelete = true;
        }
        if ($('#empPrint').is(":checked")) {
            empPrint = true;
        }
        if ($('#empView').is(":checked")) {
            empView = true;
        }

        settingObj.empAdd = empAdd;
        settingObj.empEdit = empEdit;
        settingObj.empDelete = empDelete;
        settingObj.empPrint = empPrint;
        settingObj.empView = empView;


        var managerAdd = false, managerEdit = false, managerDelete = false, managerView = false, managerPrint = false;

        if ($('#managerAdd').is(":checked")) {
            managerAdd = true;
        }
        if ($('#managerEdit').is(":checked")) {
            managerEdit = true;
        }
        if ($('#managerDelete').is(":checked")) {
            managerDelete = true;
        }
        if ($('#managerPrint').is(":checked")) {
            managerPrint = true;
        }
        if ($('#managerView').is(":checked")) {
            managerView = true;
        }

        settingObj.managerAdd = managerAdd;
        settingObj.managerEdit = managerEdit;
        settingObj.managerDelete = managerDelete;
        settingObj.managerPrint = managerPrint;
        settingObj.managerView = managerView;



        var TravelAdd = false, TravelEdit = false, TravelDelete = false, TravelView = false, TravelPrint = false;

        if ($('#TravelAdd').is(":checked")) {
            TravelAdd = true;
        }
        if ($('#TravelEdit').is(":checked")) {
            TravelEdit = true;
        }
        if ($('#TravelDelete').is(":checked")) {
            TravelDelete = true;
        }
        if ($('#TravelPrint').is(":checked")) {
            TravelPrint = true;
        }
        if ($('#TravelView').is(":checked")) {
            TravelView = true;
        }

        settingObj.TravelAdd = TravelAdd;
        settingObj.TravelEdit = TravelEdit;
        settingObj.TravelDelete = TravelDelete;
        settingObj.TravelPrint = TravelPrint;
        settingObj.TravelView = TravelView;



        var ReportAdd = false, ReportEdit = false, ReportDelete = false, ReportView = false, ReportPrint = false;

        if ($('#ReportAdd').is(":checked")) {
            ReportAdd = true;
        }
        if ($('#ReportEdit').is(":checked")) {
            ReportEdit = true;
        }
        if ($('#ReportDelete').is(":checked")) {
            ReportDelete = true;
        }
        if ($('#ReportPrint').is(":checked")) {
            ReportPrint = true;
        }
        if ($('#ReportView').is(":checked")) {
            ReportView = true;
        }

        settingObj.ReportAdd = ReportAdd;
        settingObj.ReportEdit = ReportEdit;
        settingObj.ReportDelete = ReportDelete;
        settingObj.ReportPrint = ReportPrint;
        settingObj.ReportView = ReportView;

        var rolesAdd = false, rolesEdit = false, rolesDelete = false, rolesView = false, rolesPrint = false;

        if ($('#rolesAdd').is(":checked")) {
            rolesAdd = true;
        }
        if ($('#rolesEdit').is(":checked")) {
            rolesEdit = true;
        }
        if ($('#rolesDelete').is(":checked")) {
            rolesDelete = true;
        }
        if ($('#rolesPrint').is(":checked")) {
            rolesPrint = true;
        }
        if ($('#rolesView').is(":checked")) {
            rolesView = true;
        }

        settingObj.rolesAdd = rolesAdd;
        settingObj.rolesEdit = rolesEdit;
        settingObj.rolesDelete = rolesDelete;
        settingObj.rolesPrint = rolesPrint;
        settingObj.rolesView = rolesView;



        $.ajax({
            type: "POST",
            url: "WebService.asmx/saveUserRoles",
            data: '{userRoles: ' + JSON.stringify(settingObj) + '}',
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                swal("Saved", "User roles saved ", "success");
                clearForm();
            },
            error: function (response) {
                swal("Error", "Try again", "error");
            }

        });
    }

   
}


function updateUserRoles() {
    var settingObj = {};

    settingObj.Empid = selectEmpId;

    var empAdd = false, empEdit = false, empDelete = false, empView = false, empPrint = false;

    if ($('#empAdd').is(":checked")) {
        empAdd = true;
    }
    if ($('#empEdit').is(":checked")) {
        empEdit = true;
    }
    if ($('#empDelete').is(":checked")) {
        empDelete = true;
    }
    if ($('#empPrint').is(":checked")) {
        empPrint = true;
    }
    if ($('#empView').is(":checked")) {
        empView = true;
    }

    settingObj.empAdd = empAdd;
    settingObj.empEdit = empEdit;
    settingObj.empDelete = empDelete;
    settingObj.empPrint = empPrint;
    settingObj.empView = empView;


    var managerAdd = false, managerEdit = false, managerDelete = false, managerView = false, managerPrint = false;

    if ($('#managerAdd').is(":checked")) {
        managerAdd = true;
    }
    if ($('#managerEdit').is(":checked")) {
        managerEdit = true;
    }
    if ($('#managerDelete').is(":checked")) {
        managerDelete = true;
    }
    if ($('#managerPrint').is(":checked")) {
        managerPrint = true;
    }
    if ($('#managerView').is(":checked")) {
        managerView = true;
    }

    settingObj.managerAdd = managerAdd;
    settingObj.managerEdit = managerEdit;
    settingObj.managerDelete = managerDelete;
    settingObj.managerPrint = managerPrint;
    settingObj.managerView = managerView;



    var TravelAdd = false, TravelEdit = false, TravelDelete = false, TravelView = false, TravelPrint = false;

    if ($('#TravelAdd').is(":checked")) {
        TravelAdd = true;
    }
    if ($('#TravelEdit').is(":checked")) {
        TravelEdit = true;
    }
    if ($('#TravelDelete').is(":checked")) {
        TravelDelete = true;
    }
    if ($('#TravelPrint').is(":checked")) {
        TravelPrint = true;
    }
    if ($('#TravelView').is(":checked")) {
        TravelView = true;
    }

    settingObj.TravelAdd = TravelAdd;
    settingObj.TravelEdit = TravelEdit;
    settingObj.TravelDelete = TravelDelete;
    settingObj.TravelPrint = TravelPrint;
    settingObj.TravelView = TravelView;



    var ReportAdd = false, ReportEdit = false, ReportDelete = false, ReportView = false, ReportPrint = false;

    if ($('#ReportAdd').is(":checked")) {
        ReportAdd = true;
    }
    if ($('#ReportEdit').is(":checked")) {
        ReportEdit = true;
    }
    if ($('#ReportDelete').is(":checked")) {
        ReportDelete = true;
    }
    if ($('#ReportPrint').is(":checked")) {
        ReportPrint = true;
    }
    if ($('#ReportView').is(":checked")) {
        ReportView = true;
    }

    settingObj.ReportAdd = ReportAdd;
    settingObj.ReportEdit = ReportEdit;
    settingObj.ReportDelete = ReportDelete;
    settingObj.ReportPrint = ReportPrint;
    settingObj.ReportView = ReportView;

    var rolesAdd = false, rolesEdit = false, rolesDelete = false, rolesView = false, rolesPrint = false;

    if ($('#rolesAdd').is(":checked")) {
        rolesAdd = true;
    }
    if ($('#rolesEdit').is(":checked")) {
        rolesEdit = true;
    }
    if ($('#rolesDelete').is(":checked")) {
        rolesDelete = true;
    }
    if ($('#rolesPrint').is(":checked")) {
        rolesPrint = true;
    }
    if ($('#rolesView').is(":checked")) {
        rolesView = true;
    }

    settingObj.rolesAdd = rolesAdd;
    settingObj.rolesEdit = rolesEdit;
    settingObj.rolesDelete = rolesDelete;
    settingObj.rolesPrint = rolesPrint;
    settingObj.rolesView = rolesView;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/updateUserRoles",
        data: '{userRoles: ' + JSON.stringify(settingObj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            swal("Success", "User roles updated", "success");
            clearForm();
        },
        error: function (response) {
            swal("Error", "Try again", "error");
        }

    });

}

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
            if (response.d.length > 0) {
                updateingUserSetting = true
                $("#submitUserSettings").hide();
                $("#UpdateUserSettings").show();
                // Employee
                if (response.d[0].empAdd) {
                    $('#empAdd').prop('checked', true);
                }
                else {
                    $('#empAdd').prop('checked', false);
                }
                if (response.d[0].empEdit) {
                    $('#empEdit').prop('checked', true);
                }
                else {
                    $('#empEdit').prop('checked', false);
                }
                if (response.d[0].empDelete) {
                    $('#empDelete').prop('checked', true);
                }
                else {
                    $('#empDelete').prop('checked', false);
                }
                if (response.d[0].empPrint) {
                    $('#empPrint').prop('checked', true);
                }
                else {
                    $('#empPrint').prop('checked', false);
                }
                if (response.d[0].empView) {
                    $('#empView').prop('checked', true);
                }
                else {
                    $('#empView').prop('checked', false);
                }


                // Manager
                if (response.d[1].managerAdd) {
                    $('#managerAdd').prop('checked', true);
                }
                else {
                    $('#managerAdd').prop('checked', false);
                }
                if (response.d[1].managerEdit) {
                    $('#managerEdit').prop('checked', true);
                }
                else {
                    $('#managerEdit').prop('checked', false);
                }
                if (response.d[1].managerDelete) {
                    $('#managerDelete').prop('checked', true);
                }
                else {
                    $('#managerDelete').prop('checked', false);
                }
                if (response.d[1].managerPrint) {
                    $('#managerPrint').prop('checked', true);
                }
                else {
                    $('#managerPrint').prop('checked', false);
                }
                if (response.d[1].managerView) {
                    $('#managerView').prop('checked', true);
                }
                else {
                    $('#managerView').prop('checked', false);
                }

                // Reports
                if (response.d[3].ReportAdd) {
                    $('#ReportAdd').prop('checked', true);
                }
                else {
                    $('#ReportAdd').prop('checked', false);
                }
                if (response.d[3].ReportEdit) {
                    $('#ReportEdit').prop('checked', true);
                }
                else {
                    $('#ReportEdit').prop('checked', false);
                }
                if (response.d[3].ReportDelete) {
                    $('#ReportDelete').prop('checked', true);
                }
                else {
                    $('#ReportDelete').prop('checked', false);
                }
                if (response.d[3].ReportPrint) {
                    $('#ReportPrint').prop('checked', true);
                }
                else {
                    $('#ReportPrint').prop('checked', false);
                }
                if (response.d[3].ReportView) {
                    $('#ReportView').prop('checked', true);
                }
                else {
                    $('#ReportView').prop('checked', false);
                }

                // Travel
                if (response.d[2].TravelAdd) {
                    $('#TravelAdd').prop('checked', true);
                }
                else {
                    $('#TravelAdd').prop('checked', false);
                }
                if (response.d[2].TravelEdit) {
                    $('#TravelEdit').prop('checked', true);
                }
                else {
                    $('#TravelEdit').prop('checked', false);
                }
                if (response.d[2].TravelDelete) {
                    $('#TravelDelete').prop('checked', true);
                }
                else {
                    $('#TravelDelete').prop('checked', false);
                }
                if (response.d[2].TravelPrint) {
                    $('#TravelPrint').prop('checked', true);
                }
                else {
                    $('#TravelPrint').prop('checked', false);
                }
                if (response.d[2].TravelView) {
                    $('#TravelView').prop('checked', true);
                }
                else {
                    $('#TravelView').prop('checked', false);
                }

                // Roles
                if (response.d[4].rolesAdd) {
                    $('#rolesAdd').prop('checked', true);
                }
                else {
                    $('#rolesAdd').prop('checked', false);
                }
                if (response.d[4].rolesEdit) {
                    $('#rolesEdit').prop('checked', true);
                }
                else {
                    $('#rolesEdit').prop('checked', false);
                }
                if (response.d[4].rolesDelete) {
                    $('#rolesDelete').prop('checked', true);
                }
                else {
                    $('#rolesDelete').prop('checked', false);
                }
                if (response.d[4].rolesPrint) {
                    $('#rolesPrint').prop('checked', true);
                }
                else {
                    $('#rolesPrint').prop('checked', false);
                }
                if (response.d[4].rolesView) {
                    $('#rolesView').prop('checked', true);
                }
                else {
                    $('#rolesView').prop('checked', false);
                }
            } else {
                updateingUserSetting = false;
                clearForm();
                $("#submitUserSettings").show();
                $("#UpdateUserSettings").hide();
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


function clearForm()
{
    $('#chkAdd').prop('checked', false);
    $('#empAdd').prop('checked', false);
    $('#managerAdd').prop('checked', false);
    $('#TravelAdd').prop('checked', false);
    $('#ReportAdd').prop('checked', false);
    $('#rolesAdd').prop('checked', false);

    $('#chkEdit').prop('checked', false);
    $('#empEdit').prop('checked', false);
    $('#managerEdit').prop('checked', false);
    $('#TravelEdit').prop('checked', false);
    $('#ReportEdit').prop('checked', false);
    $('#rolesEdit').prop('checked', false);

    $('#chkDelete').prop('checked', false);
    $('#empDelete').prop('checked', false);
    $('#managerDelete').prop('checked', false);
    $('#TravelDelete').prop('checked', false);
    $('#ReportDelete').prop('checked', false);
    $('#rolesDelete').prop('checked', false);


    $('#chkPrint').prop('checked', false);
    $('#empPrint').prop('checked', false);
    $('#managerPrint').prop('checked', false);
    $('#TravelPrint').prop('checked', false);
    $('#ReportPrint').prop('checked', false);
    $('#rolesPrint').prop('checked', false);

    $('#chkView').prop('checked', false);
    $('#empView').prop('checked', false);
    $('#managerView').prop('checked', false);
    $('#TravelView').prop('checked', false);
    $('#ReportView').prop('checked', false);
    $('#rolesView').prop('checked', false);
}