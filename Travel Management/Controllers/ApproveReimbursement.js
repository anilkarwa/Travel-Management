$(document).ready(function () {
    getAppliedReimbursementList();
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
                if (!response.d[2].TravelView) {
                    $(".travelViewRole").hide();

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

function getAppliedReimbursementList()
{
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getAppliedReimbursementList",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var table = $("#approverReimbursementTable").DataTable();
            table.clear().draw();

            $.each(response.d, function (key, value) {
                table.row.add($('<tr><td>' + value.ReimbursementId + '</td><td>' + value.FirstName + ' ' + value.LastName + '</td><td>' + value.SubmittedDate + '</td><td><a id="' + value.TravelId +'" onclick="loadTravelDetails(this.id);" style="color:orange; margin-left:10px;" data-toggle="modal" data-target="#pulse"><i class="la la-eye" style="font-size:40px!important;"></i></a> <td>' + value.Amount + '</td><td>'+value.RejectReason+'</td>'+
                    '<td style="display:flex"><a id="' + value.ReimbursementId + '" class="travelEditRole" onclick="confirmRequest(this.id)" data-toggle="tooltip" data-placement="top" title="Approve Request" style="color:yellowgreen; margin-left:10px;"><i class="la la-check-circle" style="font-size:25px!important;cursor:pointer;"></i></a><a id="' + value.ReimbursementId + '" class="travelEditRole" onclick="rejectRequest(this.id)" data-toggle="tooltip" data-placement="top" title="Reject Request" style="color:orangered;margin-left:10px;"> <i class="la la-times-circle" style="font-size:25px!important;cursor:pointer"></i></a><a id="' + value.ReimbursementId +'" onclick="loadravelExpnessDetails(this.id);" class="travelViewRole" style="color:orange; margin-left:10px;" data-toggle="modal" data-target="#rotateInUpLeft"><i class="la la-eye" style="font-size:25px!important;cursor:pointer;"></i></a> </td></tr> ')).draw(false);
            });
            loadUserSettingForEdit(Session.get("EmpId"));
        },
        error: function (response) {
            toastr.warning("Problem in loading reimbursement list !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}

function loadTravelDetails(travelId)
{
    var travelRequestobj = {};
    travelRequestobj.TravelId = travelId;
    $.ajax({
        type: "POST",
        url: "WebService.asmx/loadEditTravelDetails",
        contentType: "application/json",
        data: '{travelRequest: ' + JSON.stringify(travelRequestobj) + '}',
        dataType: "json",
        success: function (response) {
            $("#travelledFrom").val(response.d.TravellingFromCountry + "," + response.d.TravellingFromState + "," + response.d.TravellingFromCity);
            $("#travelledTo").val(response.d.TravellingToCountry + "," + response.d.TravellingToState + "," + response.d.TravellingToCity);
            $("#travelDate").val(response.d.TravelDate);
            $("#returnDate").val(response.d.ReturnDate);
            $("#noofdays").val(response.d.NoOfDays);
            $("#travelReason").val(response.d.TravelReason);
           
        },
        error: function (response) {
            toastr.warning("Problem in loading travel details !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}

function loadravelExpnessDetails(reimbursementId)
{
    $("#expenseDetailTable tbody").empty();

    var travelRequestobj = {};
    travelRequestobj.ReimbursementId = reimbursementId;
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getTravelExpenseDetails",
        contentType: "application/json",
        data: '{travelExpense: ' + JSON.stringify(travelRequestobj) + '}',
        dataType: "json",
        success: function (response) {

            $.each(response.d, function (key, value) {
                $("#expenseDetailTable tbody").append('<tr>' +
                    '<td>' + value.ExpenseType + '</td>' +
                    '<td>' + value.Amount + '</td>' +
                    '<td>' + value.Description + '</td>' +
                    '<td><img  src="Uploads/Expense/' + value.ExpenseImage + '"  width=100 height=100 /></td>' +
                    '<td><a id="' + value.ExpenseImage + ' " onclick="previewImage(this.id);" data-toggle="modal" data-target="#large"><i class="la la-external-link"></i></a></td>'+
                    '</tr>');
            });

        },
        error: function (response) {
            toastr.warning("Problem in loading express details !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}

function previewImage(imgscr)
{
    var data = $("#previeimage");
    data.attr("src","Uploads/Expense/"+imgscr);
}