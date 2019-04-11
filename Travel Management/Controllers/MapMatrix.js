var selectedManagerid1 = 0, selectedManagerid2 = 0, selectedManagerid2 = 0, selectedManagerid3 = 0, selectedManagerid4 = 0, selectedManagerid5 = 0;
var mappingid = 0, selecteEmpId = 0;
var selectedManagerName1 = "", selectedManagerName2 = "", selectedManagerName3 = "", selectedManagerName4 = "", selectedManagerName5 = "";
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
        selecteEmpId = data[0].id;
        loadManagerMapping(data[0].id);
    });


    function loadManagerMapping(empid) {
        var empobj = {};
        empobj.EmpId = empid;

        $.ajax({
            type: "POST",
            url: "WebService.asmx/getManagerMapping",
            data: '{mapping: ' + JSON.stringify(empobj) + '}',
            contentType: "application/json",
            dataType: "json",
            success: function (response) {

                if (response.d.EmpId != null) {
                    $("#savebtn").hide();
                    $("#updatebtn").show();
                    $("#updateTable").show();
                    mappingid = response.d.MappingId;
                    loadEmployeeDetailById(response.d.EmpId, "Emp");
                    loadEmployeeDetailById(response.d.ManagerId1, "Manager1");
                    loadEmployeeDetailById(response.d.ManagerId2, "Manager2");
                    loadEmployeeDetailById(response.d.ManagerId3, "Manager3");
                    loadEmployeeDetailById(response.d.ManagerId4, "Manager4");
                    loadEmployeeDetailById(response.d.ManagerId5, "Manager5");       

                }
            },
            error: function (response) {
                toastr.warning("Problem While Loading Manager Mapping !", {
                    showMethod: "slideDown",
                    hideMethod: "slideUp",
                    timeOut: 2e3
                });
            }

        });
    }

    function loadEmployeeDetailById(empid,managerType)
    {
        var empobj = {};
        empobj.EmpId = empid;

        $.ajax({
            type: "POST",
            url: "WebService.asmx/searchEmployeeById",
            data: '{employee: ' + JSON.stringify(empobj) + '}',
            contentType: "application/json",
            dataType: "json",
            async: false,
            success: function (response) {

                if (managerType == "Emp")
                {
                    if (response.d.FirstName != null) {
                        $("#updateEmpId").val(response.d.FirstName + " " + response.d.LastName);
                    }
                    else {
                        $("#updateEmpId").val("");
                    }
                    
                }
                if (managerType == "Manager1") {
                   
                    
                    if (response.d.FirstName != null)
                    {
                       
                        selectedManagerid1 = response.d.EmpId;
                        selectedManagerName1 = response.d.FirstName + " " + response.d.LastName;
                        $("#updateManager1").val(response.d.FirstName + " " + response.d.LastName);
                    }
                    else {
                        $("#updateManager1").val("");
                    }
                    
                }
                if (managerType == "Manager2") {
                    
                    
                    if (response.d.FirstName != null) {
                        
                        selectedManagerid2 = response.d.EmpId;
                        selectedManagerName2 = response.d.FirstName + " " + response.d.LastName;
                        $("#updateManager2").val(response.d.FirstName + " " + response.d.LastName);
                    }
                    else {
                        $("#updateManager2").val("");
                    }
                }
                if (managerType == "Manager3") {
                    
                   
                    if (response.d.FirstName != null) {
                        
                        selectedManagerid3 = response.d.EmpId;
                        selectedManagerName3 = response.d.FirstName + " " + response.d.LastName;
                        $("#updateManager3").val(response.d.FirstName + " " + response.d.LastName);
                    }
                    else {
                        $("#updateManager3").val("");
                    }
                }
                if (managerType == "Manager4") {
                    
                    
                    if (response.d.FirstName != null) {
                        
                        selectedManagerid4 = response.d.EmpId;
                        selectedManagerName4 = response.d.FirstName + " " + response.d.LastName;
                        $("#updateManager4").val(response.d.FirstName + " " + response.d.LastName);
                    }
                    else {
                        $("#updateManager4").val("");
                    }
                }
                if (managerType == "Manager5") {
                    
                    if (response.d.FirstName != null) {
                        
                        selectedManagerid5 = response.d.EmpId;
                        selectedManagerName5 = response.d.FirstName + " " + response.d.LastName;
                        $("#updateManager5").val(response.d.FirstName + " " + response.d.LastName);
                    }
                    else {
                        $("#updateManager5").val("");
                    }
                }


            },
            error: function (response) {

            }

        });
    }




    $("#searchManager1").select2({
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
        templateResult: formatRepo1,
        templateSelection: formatRepoSelection1
    });

    function formatRepo1(repo) {
        if (repo.loading) {
            return repo.text;
        }

        var markup = repo.FirstName + " " + repo.LastName;

        return markup;
    }


    function formatRepoSelection1(repo) {
        return repo.FirstName + " " + repo.LastName || repo.text;

    }

    $("#searchManager1").change(function () {
        var data = $(this).select2('data');
        selectedManagerid1 = data[0].id;
        selectedManagerName1 = data[0].FirstName + " " + data[0].LastName;

    });


    $("#searchManager2").select2({
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
        templateResult: formatRepo2,
        templateSelection: formatRepoSelection2
    });

    function formatRepo2(repo) {
        if (repo.loading) {
            return repo.text;
        }

        var markup = repo.FirstName + " " + repo.LastName;

        return markup;
    }


    function formatRepoSelection2(repo) {
        return repo.FirstName + " " + repo.LastName || repo.text;

    }

    $("#searchManager2").change(function () {
        var data = $(this).select2('data');
        selectedManagerid2 = data[0].id;
        selectedManagerName2 = data[0].FirstName + " " + data[0].LastName;
    });




    $("#searchManager3").select2({
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
        templateResult: formatRepo3,
        templateSelection: formatRepoSelection3
    });

    function formatRepo3(repo) {
        if (repo.loading) {
            return repo.text;
        }

        var markup = repo.FirstName + " " + repo.LastName;

        return markup;
    }


    function formatRepoSelection3(repo) {
        return repo.FirstName + " " + repo.LastName || repo.text;

    }

    $("#searchManager3").change(function () {
        var data = $(this).select2('data');
        selectedManagerid3 = data[0].id;
        selectedManagerName3 = data[0].FirstName + " " + data[0].LastName;
    });





    $("#searchManager4").select2({
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
        templateResult: formatRepo4,
        templateSelection: formatRepoSelection4
    });

    function formatRepo4(repo) {
        if (repo.loading) {
            return repo.text;
        }

        var markup = repo.FirstName + " " + repo.LastName;

        return markup;
    }


    function formatRepoSelection4(repo) {
        return repo.FirstName + " " + repo.LastName || repo.text;

    }

    $("#searchManager4").change(function () {
        var data = $(this).select2('data');
        selectedManagerid4 = data[0].id;
        selectedManagerName4 = data[0].FirstName + " " + data[0].LastName;
    });




    $("#searchManager5").select2({
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
        templateResult: formatRepo5,
        templateSelection: formatRepoSelection5
    });

    function formatRepo5(repo) {
        if (repo.loading) {
            return repo.text;
        }

        var markup = repo.FirstName + " " + repo.LastName;

        return markup;
    }


    function formatRepoSelection5(repo) {
        return repo.FirstName + " " + repo.LastName || repo.text;

    }

    $("#searchManager5").change(function () {
        var data = $(this).select2('data');
        selectedManagerid5 = data[0].id;
        selectedManagerName5 = data[0].FirstName + " " + data[0].LastName;
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

                   
                    if (!response.d[1].managerAdd) {
                        $("#savebtn").hide();
                    }
                    if (!response.d[1].managerEdit) {
                        $("#updatebtn").hide();
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

   

});

function saveManagerMapping() {

    var mappingobj = {};
    mappingobj.EmpId = selecteEmpId;
    mappingobj.ManagerId1 = selectedManagerid1;
    if (selectedManagerid1 == 0) {
        toastr.warning("Please Select Atleast Manager1 For Mapping !", {
            showMethod: "slideDown",
            hideMethod: "slideUp",
            timeOut: 2e3
        });
    }
    mappingobj.ManagerId2 = selectedManagerid2;
    mappingobj.ManagerId3 = selectedManagerid3;
    mappingobj.ManagerId4 = selectedManagerid4;
    mappingobj.ManagerId5 = selectedManagerid5;
    mappingobj.ManagerName1 = selectedManagerName1;
    mappingobj.ManagerName2 = selectedManagerName2;
    mappingobj.ManagerName3 = selectedManagerName3;
    mappingobj.ManagerName4 = selectedManagerName4;
    mappingobj.ManagerName5 = selectedManagerName5;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/saveManagerMapping",
        data: '{mapping: ' + JSON.stringify(mappingobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            toastr.success("Manager Mapping Saved Successfully !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
            location.reload();
        },
        error: function (response) {
            toastr.warning("Problem While Saveing Manager Mapping !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}

function updateManagerMapping() {

    var mappingobj = {};
    mappingobj.MappingId = mappingid;
    mappingobj.ManagerId1 = selectedManagerid1;
    if (selectedManagerid1 == 0)
    {
        toastr.warning("Please Select Manager1 First For Mapping !", {
            showMethod: "slideDown",
            hideMethod: "slideUp",
            timeOut: 2e3
        });
        return false;
    }
    mappingobj.ManagerId2 = selectedManagerid2;
    mappingobj.ManagerId3 = selectedManagerid3;
    mappingobj.ManagerId4 = selectedManagerid4;
    mappingobj.ManagerId5 = selectedManagerid5;
    mappingobj.ManagerName1 = selectedManagerName1;
    mappingobj.ManagerName2 = selectedManagerName2;
    mappingobj.ManagerName3 = selectedManagerName3;
    mappingobj.ManagerName4 = selectedManagerName4;
    mappingobj.ManagerName5 = selectedManagerName5;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/updateMangerMapping",
        data: '{mapping: ' + JSON.stringify(mappingobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            toastr.success("Manager Mapping Updated Successfully !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
            location.reload();
        },
        error: function (response) {
            toastr.warning("Problem While Updating Manager Mapping !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}