var selectedTravelId = 0;
$(document).ready(function () {

    $("#travelid").select2({
        ajax: {
            url: "WebService.asmx/searchTravelDetails",
            dataType: 'json',
            method: 'POST',
            contentType: "application/json",
            data: function (params) {
                return '{q: ' + JSON.stringify(params.term) + ',empid:' + JSON.stringify(Session.get("EmpId")) +'}'
            },
            processResults: function (data, params) {

                return { results: data.d };
            },
            cache: true
        },
        placeholder: 'Search Your Travel....',
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 2,
        templateResult: formatRepo,
        templateSelection: formatRepoSelection
    });

    function formatRepo(repo) {
        if (repo.loading) {
            return repo.text;
        }
        var markup = "<div class='select2-result-repository clearfix'>" +
            "<div class='select2-result-repository__meta'>" +
            "<div class='select2-result-repository'><b>" + repo.TravellingFromCountry + "," + repo.TravellingFromState + "," + repo.TravellingFromCity + " -- " + repo.TravellingToCountry + "," + repo.TravellingToState + "," + repo.TravellingToCity +"</b></div>";

        if (repo.TravelReason) {
            markup += "<div class='select2-result-repository__description'>" + repo.TravelReason + "</div>";
        }

        markup += "<div class='select2-result-repository__statistics'>" +
            "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i>Travel Date - " + repo.TravelDate + " </div>" +
            "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> Return Date - " + repo.ReturnDate + " </div>" +
            "</div>" +
            "</div></div>";

        return markup;
    }


    function formatRepoSelection(repo) {
        return repo.TravelId || repo.text;

    }

    $("#travelid").change(function () {

        var data = $(this).select2('data');
        selectedTravelId = data[0].id;
    });

});

function addNewExpenseRow()
{
    var count = $("#expenseTableRowCount").val();
    count = parseInt(count) + 1;
    $("#expenseAddTable tbody").append('<tr id="row'+count+'">' +
        '<td> <input type="text" class="form-control" id="expenseName' + count +'" value="" placeholder="Enter expense name.." required="required" /></td>'+
        '<td><input type="text" class="form-control" id="expenseDescription' + count +'" value="" placeholder="Expense description.." required="required" /></td>'+
        '<td><input type="text" class="form-control" id="expenseAmount' + count +'" value="" placeholder="Expense amount.." required="required" /></td>'+
        '<td><input type="file" class="form-control" id="expenseImage' + count + '" required="required"></td>' +
        '<td><a id="deleteoption' + count + '" onclick="deleteTableRow(row' + count +')"><i class="la la-close" style="color:red;font-size:30px;" required="required"></i></a></td>'+
        '</tr>');
    $("#expenseTableRowCount").val(count);

    for (var i = 1; i < count; i++)
    {
        $("#deleteoption" + i).hide();
    }
}

function deleteTableRow(rowid)
{
    
    var count = $("#expenseTableRowCount").val();

    count = parseInt(count) - 1;
    $("#"+rowid.id).remove();
    $("#deleteoption" + count).show();

    for (var i = 1; i < count; i++) {
        $("#deleteoption" + i).hide();
    }
    $("#expenseTableRowCount").val(count);
}

function saveExpenseDate()
{
    var count = $("#expenseTableRowCount").val();


    var reimbursementobj = {};
     reimbursementobj = new FormData();

    reimbursementobj.append('TravelId', selectedTravelId);
    reimbursementobj.append('EmpId', Session.get("EmpId"));
    reimbursementobj.append('count', count);
    for (var i = 1; i <= count; i++) {

            reimbursementobj.append('expenseName' + i, $("#expenseName" + i).val());
            reimbursementobj.append('expenseDescription' + i, $("#expenseDescription" + i).val());
            reimbursementobj.append('expenseAmount' + i, $("#expenseAmount" + i).val());
            reimbursementobj.append('expenseImage' + i, $("#expenseImage" + i).val().substr(12));
            reimbursementobj.append('expenseImageData' + i, $('#expenseImage' + i)[0].files[0]);


    }

    $.ajax({

            type: "POST",
            url: "WebService.asmx/saveNewReimbursementRequest",
            data: reimbursementobj,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('#loaderImage').show();
                $('#overlay').show();
            },
            complete: function () {
                $('#loaderImage').hide();
                $('#overlay').hide();
            },
            success: function (response) {
                toastr.success("Reimbursement Request Saved Successfully !", {
                    showMethod: "slideDown",
                    hideMethod: "slideUp",
                    timeOut: 2e3
                });
                document.getElementById("expenseForm").reset();
            },
            error: function (response) {
                 toastr.warning("Problem While Saving Reimbursement Request !", {
                    showMethod: "slideDown",
                    hideMethod: "slideUp",
                    timeOut: 2e3
                });
            }
        });
}