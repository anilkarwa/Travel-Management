$(document).ready(function () {
    getTravelRequestApprovalList();
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


                if (!response.d[2].TravelEdit) {
                    $(".travelEditRole").hide();

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

function getTravelRequestApprovalList()
{
    var approvalobj = {};
    approvalobj.ApproverManagerId = Session.get("EmpId");


    $.ajax({
        type: "POST",
        url: "WebService.asmx/loadTravelRequestApprovalByManagerId",
        data: '{travelRequest: ' + JSON.stringify(approvalobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var table = $("#approverTable").DataTable();
            table.clear().draw();

            $.each(response.d, function (key, value) {
                table.row.add($('<tr><td>'+value.FirstName+' '+ value.LastName+ '</td>'+
                    '<td>' + value.AppliedDate+'</td >'+
                    '<td>' + value.TravellingFromCountry + ',' + value.TravellingFromState + ',' + value.TravellingFromCity+'</td>'+
                    '<td>' + value.TravellingToCountry + ',' + value.TravellingToState + ',' + value.TravellingToCity+'</td>'+
                    '<td>' + value.TravelDate+'</td>' +
                    '<td>' + value.ReturnDate+'</td>' +
                    '<td>' + value.NoOfDays+'</td>' +
                    '<td>' + value.TravelReason +'</td>' +
                    '<td style="display:flex;"><a id="' + value.TravelId + '" class="travelEditRole" onclick="confirmRequest(this.id)" data-toggle="tooltip" data-placement="top" title="Approve Request" style="color:yellowgreen; margin-left:10px;"><i class="la la-check-circle" style="font-size:25px!important;cursor:pointer;"></i></a><a id="' + value.TravelId + '" class="travelEditRole" onclick="rejectRequest(this.id)" data-toggle="tooltip" data-placement="top" title="Reject Request" style="color:orangered;margin-left:10px;"> <i class="la la-times-circle" style="font-size:25px!important;cursor:pointer;"></i></a><a id="' + value.TravelId +'" class="travelEditRole" onclick="loadEditTravelDetails(this.id);" style="color:orange; margin-left:10px;" data-toggle="modal" data-target="#zoomInUp"><i class="la la-pencil-square" style="font-size:25px!important;cursor:pointer;"></i></a> </td></tr>')).draw(false);
            });
            loadUserSettingForEdit(Session.get("EmpId"));
        },
        error: function (response) {
            toastr.warning("Problem While Loading Travel Requestes !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}

function loadEditTravelDetails(travelId)
{

    var approvalobj = {};
    approvalobj.TravelId = travelId;


    $.ajax({
        type: "POST",
        url: "WebService.asmx/loadEditTravelDetails",
        data: '{travelRequest: ' + JSON.stringify(approvalobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $("#travelId").val(travelId);
            $("#EmpFirstName").val(response.d.FirstName + " "+ response.d.LastName );
            $("#EmpPhone").val(response.d.Phone);
            $("#EmpEmail").val(response.d.Email);
            $("#EmpDepartment").val(response.d.Department);
            $("#travellingFromCountry").val(response.d.TravellingFromCountry);
            $("#travellingFromState").val(response.d.TravellingFromState);
            $("#travellingFromCity").val(response.d.TravellingFromCity);
            $("#travellingToCountry").val(response.d.TravellingToCountry);
            $("#travellingToState").val(response.d.TravellingToState);
            $("#travellingToCity").val(response.d.TravellingToCity);
            $("#traveldate").val(response.d.TravelDate);
            $("#returndate").val(response.d.ReturnDate);
            $("#noofdays").val(response.d.NoOfDays);
            $("#travelReason").val(response.d.TravelReason);

        },
        error: function (response) {
            toastr.warning("Problem While Loading Travel Details !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });

}

function updateTravelRequest()
{
    var updaterequestobj = {};
    updaterequestobj.TravelId = $("#travelId").val();
    updaterequestobj.TravelDate = dateformateChange($('#traveldate').val());
    updaterequestobj.ReturnDate = dateformateChange($('#returndate').val());
    updaterequestobj.NoOfDays = $('#noofdays').val();
    updaterequestobj.TravelReason = $('#travelReason').val();

    $.ajax({
        type: "POST",
        url: "WebService.asmx/updateTravelRequest",
        data: '{travelRequest: ' + JSON.stringify(updaterequestobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            toastr.success("Travel Details Updated Successfully !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
            getTravelRequestApprovalList();
            $('#zoomInUp').modal('hide');
        },
        error: function (response) {
            toastr.warning("Problem While Updating Travel Details !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });

}

function dateformateChange(date) {
    var datepart = date.split("/");
    return datepart[2] + "-" + datepart[1] + "-" + datepart[0];
}