$(document).ready(function () {
    reimbursementStatus();
});


function reimbursementStatus()
{
    var reimbursementobj = {};
    reimbursementobj.EmpId = Session.get("EmpId");

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getReimbursementStatusList",
        data: '{reimbursementStatus: ' + JSON.stringify(reimbursementobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var table = $("#reimbursementStatusTable").DataTable();
            table.clear().draw();

            $.each(response.d, function (key, value) {
                table.row.add($('<tr><td>' + value.ReimbursementId + '</td><td>' + value.FirstName + ' ' + value.LastName + '</td><td>' + value.SubmittedDate + '</td><td>' + value.Amount +'</td><td>'+value.Status+'</td></tr>')).draw(false);
            });
        },
        error: function (response) {
            toastr.warning("Problem While Loading Reimbursement List !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}