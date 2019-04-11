$(document).ready(function () {
    loadTravelRequestStatus();
});

function loadTravelRequestStatus()
{
    var employeeobj = {};
    employeeobj.EmpId = Session.get("EmpId");

    $.ajax({
        type: "POST",
        url: "WebService.asmx/loadTravelRequestStatus",
        data: '{travelRequest: ' + JSON.stringify(employeeobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            
            var table = $("#travelHistory").DataTable();
            table.clear().draw();

            $.each(response.d, function (key, value) {
                table.row.add($('<tr><td>' + value.FirstName + ' ' + value.LastName + '</td><td>' + value.AppliedDate + '</td><td>' + value.TravellingFromCountry + ',' + value.TravellingFromState + ',' + value.TravellingFromCity + '</td><td>' + value.TravellingToCountry + ',' + value.TravellingToState + ',' + value.TravellingToCity + '</td><td>' + value.TravelDate + '</td><td>' + value.ReturnDate + '</td><td>' + value.TravelReason + '</td><td>' + value.Status+'</td></tr>')).draw(false);
            });
        },
        error: function (response) {
            toastr.warning("Problem While Loading Travel Status Details !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}