$(document).ready(function () {
    TravelReportList();
});


function TravelReportList() {
    $.ajax({
        type: "POST",
        url: "WebService.asmx/TravelReportList",
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
            var table = $("#travelReportListTable").DataTable();
            table.clear().draw();

            $.each(response.d, function (key, value) {
                table.row.add($('<tr>' +
                    'td>' + value.TravelId+'</td>'+
                    '<td>' + value.FirstName + " " + value.LastName + '</td>' +
                    '<td>' + value.TravelDate + '</td>' +
                    '<td>' + value.ReturnDate + '</td>' +
                    '<td>' + value.TravelReason + '</td>' +
                    '<td>' + value.Status + '</td>' +
                   
                    '</tr> ')).draw(false);
            });
        },
        error: function (response) {
            toastr.warning("Problem While Loading Travel Report Details !", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}