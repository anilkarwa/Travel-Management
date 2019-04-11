$(document).ready(function () {

    if (Session.get("ApproverManagerMapped") != 'Yes')
    {
        swal("Error", "Approver Manager Not Mapped, can not book new travel request.", "error");
        window.location = "Default.aspx";
    }

    if (Session.get("Session_User") == 'true') {
      
        $("#EmpId").val(Session.get("EmpId"));
        $("#EmpFirstName").val(Session.get("EmpFirstName"));
        $("#EmpLastName").val(Session.get("EmpLastName"));
        $("#EmpEmail").val(Session.get("EmpEmail"));
        $("#EmpPhone").val(Session.get("EmpPhone"));
        $("#EmpDepartment").val(Session.get("EmpDepartment"));
    }


    var selectFromCountryid = 0; selectFromStateid = 0, selectedToCountryid = 0, selectedToStateid = 0, selectedFromCityid=0, selectedToCityid=0;

    $("#travellingFromCountry").select2({
        ajax: {
            url: "WebService.asmx/getCountriesList",
            dataType: 'json',
            method: 'POST',
            contentType: "application/json",
            data: function (params) {
                return '{q: ' + JSON.stringify(params.term) + '}'
            },
            processResults: function (data,params) {


                return { results: data.d};
            },
            cache: true
        },
        placeholder: 'Search From Countries',
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 1,
        templateResult: formatRepo,
        templateSelection: formatRepoSelection
    });

    function formatRepo(repo) {
        if (repo.loading) {
            return repo.text;
        }

        var markup =repo.CountryName ;

        return markup;
    }


    function formatRepoSelection(repo) {
        selectFromCountryid = repo.id;
        return repo.CountryName || repo.text;
        
    }

    $("#travellingFromCountry").change(function () {
      
        var data = $(this).select2('data');
        selectFromCountryid = data[0].id;
    });

    $("#travellingFromState").select2({
        ajax: {
            url: "WebService.asmx/getStateList",
            dataType: 'json',
            method: 'POST',
            contentType: "application/json",
            data: function (params) {
                return '{q: ' + JSON.stringify(params.term) + ',cid:' + JSON.stringify(selectFromCountryid)+'}'
            },
            processResults: function (data, params) {


                return { results: data.d };
            },
            cache: true
        },
        placeholder: 'Search From State',
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 1,
        templateResult: formatRepo2,
        templateSelection: formatRepoSelection2
    });

    function formatRepo2(repo) {
        if (repo.loading) {
            return repo.text;
        }

        var markup = repo.StateName;

        return markup;
    }


    function formatRepoSelection2(repo) {
        return repo.StateName || repo.text;

    }

    $("#travellingFromState").change(function () {

   
        var data = $(this).select2('data');
        selectFromStateid = data[0].id;
    });


    $("#travellingFromCity").select2({
        ajax: {
            url: "WebService.asmx/getCityList",
            dataType: 'json',
            method: 'POST',
            contentType: "application/json",
            data: function (params) {
                return '{q: ' + JSON.stringify(params.term) + ',sid:' + JSON.stringify(selectFromStateid) + '}'
            },
            processResults: function (data, params) {


                return { results: data.d };
            },
            cache: true
        },
        placeholder: 'Search From City',
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 1,
        templateResult: formatRepo3,
        templateSelection: formatRepoSelection3
    });

    function formatRepo3(repo) {
        if (repo.loading) {
            return repo.text;
        }

        var markup = repo.CityName;

        return markup;
    }


    function formatRepoSelection3(repo) {
        return repo.CityName || repo.text;

    }
    $("#travellingFromCity").change(function () {


        var data = $(this).select2('data');
        selectedFromCityid= data[0].id;
    });

    // select To Travel 

    $("#travellingToCountry").select2({
        ajax: {
            url: "WebService.asmx/getCountriesList",
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
        placeholder: 'Search To Countries',
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 1,
        templateResult: formatRepo,
        templateSelection: formatRepoSelection
    });

    $("#travellingToCountry").change(function () {

        var data = $(this).select2('data');
        selectedToCountryid = data[0].id;
    });

    $("#travellingToState").select2({
        ajax: {
            url: "WebService.asmx/getStateList",
            dataType: 'json',
            method: 'POST',
            contentType: "application/json",
            data: function (params) {
                return '{q: ' + JSON.stringify(params.term) + ',cid:' + JSON.stringify(selectedToCountryid) + '}'
            },
            processResults: function (data, params) {


                return { results: data.d };
            },
            cache: true
        },
        placeholder: 'Search To State',
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 1,
        templateResult: formatRepo2,
        templateSelection: formatRepoSelection2
    });


    $("#travellingToState").change(function () {


        var data = $(this).select2('data');
        selectedToStateid = data[0].id;
    });


    $("#travellingToCity").select2({
        ajax: {
            url: "WebService.asmx/getCityList",
            dataType: 'json',
            method: 'POST',
            contentType: "application/json",
            data: function (params) {
                return '{q: ' + JSON.stringify(params.term) + ',sid:' + JSON.stringify(selectedToStateid) + '}'
            },
            processResults: function (data, params) {


                return { results: data.d };
            },
            cache: true
        },
        placeholder: 'Search To City',
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 1,
        templateResult: formatRepo3,
        templateSelection: formatRepoSelection3
    });
    $("#travellingToCity").change(function () {


        var data = $(this).select2('data');
         selectedToCityid=data[0].id;
    });

  
});


function saveNewRequest()
{


    var newrequestobj = {};
    newrequestobj.EmpId = $("#EmpId").val();
    newrequestobj.FirstName = $("#EmpFirstName").val();
    newrequestobj.LastName = $("#EmpLastName").val();
    newrequestobj.Email = $("#EmpEmail").val();
    newrequestobj.Phone = $("#EmpPhone").val();
    newrequestobj.Department = $("#EmpDepartment").val();
    newrequestobj.TravellingFromCountry = $("#travellingFromCountry").select2('data')[0].CountryName;
    newrequestobj.TravellingFromState = $("#travellingFromState").select2('data')[0].StateName;
    newrequestobj.TravellingFromCity = $("#travellingFromCity").select2('data')[0].CityName;
    newrequestobj.TravellingToCountry = $("#travellingToCountry").select2('data')[0].CountryName;
    newrequestobj.TravellingToState = $("#travellingToState").select2('data')[0].StateName;
    newrequestobj.TravellingToCity = $("#travellingToCity").select2('data')[0].CityName;
    newrequestobj.TravelDate = dateformateChange($('#traveldate').val());
    newrequestobj.ReturnDate = dateformateChange($('#returndate').val());
    newrequestobj.NoOfDays = $('#noofdays').val();
    newrequestobj.TravelReason = $('#travelReason').val();
    newrequestobj.ApproverManagerId = Session.get("ApproverManagerId");

    if (!compareDates(dateformateChange($('#traveldate').val()), dateformateChange($('#returndate').val())))
    {
        return false;
    }


    $.ajax({
        type: "POST",
        url: "WebService.asmx/saveNewTravelRequest",
        data: '{travelRequest: ' + JSON.stringify(newrequestobj) + '}',
        contentType: "application/json",
        dataType: "json",
        beforeSend: function () {
            $('#loaderImage').show();
            $('#overlay').show();
        },
        complete: function () {
            $('#loaderImage').hide();
            $('#overlay').hide();
        },
        success: function (response) {
            toastr.success("Travel Request Save Successfully", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
            clearform();
        },
        error: function (response) {
            toastr.warning("Error Saving New Travel Request", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 2e3
            });
        }

    });
}

function clearform()
{

    $("#travellingFromCountry").html('').select2();
    $("#travellingFromState").html('').select2();
    $("#travellingFromCity").html('').select2();
    $("#travellingToCountry").html('').select2();
    $("#travellingToState").html('').select2();
    $("#travellingToCity").html('').select2();
    $('#traveldate').val('');
    $('#returndate').val('');
    $('#noofdays').val('');
    $('#travelReason').val('');

}

function dateformateChange(date) {
    var datepart = date.split("/");
    return datepart[2] + "-" + datepart[1] + "-" + datepart[0];
}

function compareDates(date1, date2) {

    var datepart = date1.split("-");
    var datepart2 = date2.split("-");

    if (datepart2[2] < datepart[2]) {

        if (datepart2[1] < datepart[1]) {

            alert('To date should be greater then from date');
            return false;
        }

        if (datepart2[1] == datepart[1]) {
            alert('To date should be greater then from date');
            
            return false;
        }
    }
    else {

        if (datepart2[1] < datepart[1]) {
            alert('To date should be greater then from date');
            
            return false;
        }
    }

    return true;
}
