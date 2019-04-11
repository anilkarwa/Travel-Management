<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ApproveRequest.aspx.cs" Inherits="Travel_Management.ApproveRequest" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/tables/datatable/datatables.min.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/css/core/colors/palette-gradient.min.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/css/core/colors/palette-tooltip.min.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/extensions/sweetalert.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/css/plugins/animate/animate.min.css">     
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/forms/selects/select2.min.css"> 
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/forms/spinner/jquery.bootstrap-touchspin.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/extensions/datedropper.min.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/extensions/timedropper.min.css">
<script src="Controllers/TravelRequestApproval.js"></script>


<div class="content-body">
<section id="file-export">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Travel Request Approval</h4>
                    <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
                    <div class="heading-elements">
                        <ul class="list-inline mb-0">
                            <li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
                            <li><a data-action="expand"><i class="ft-maximize"></i></a></li>

                        </ul>
                    </div>
                </div>
                <div class="card-content collapse show">
                    <div class="card-body card-dashboard">
                     <div class="table-responsive">
                        <table class="table table-striped table-bordered file-export" id="approverTable">
                            
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Requested Date</th>
                                    <th>Travelling From</th>
                                    <th>Travelling To</th>
                                    <th>Travel Date</th>
                                    <th>Return Date</th>
                                    <th>No Of Days</th>
                                    <th>Reason</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                               
                               
                            </tbody>
                           
                    
                        </table>
                      </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
 </section>
   </div>

   

<script>
    function confirmRequest(travelId)
    {
        
        swal({
            title: 'Are you sure?',
            text: "You are going to approve travel request!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve It!'
        }).then((result) => {
            if (result.value) {
                var approvalobj = {};
                approvalobj.travelId = travelId;

                $.ajax({
                    type: "POST",
                    url: "WebService.asmx/approveTravelRequest",
                    data: '{travelRequest: ' + JSON.stringify(approvalobj) + '}',
                    contentType: "application/json",
                    dataType: "json",
                    success: function (response) {
                        swal("Approved!", "Travel request has been approved.", "success");
                        getTravelRequestApprovalList();
                    },
                    error: function (response) {
                        swal("Error", "Try again", "error");
                    }

                });
            } else {
                swal("Cancelled", "You have cancelled the operation :)", "error");
            }
        });
    }

    function rejectRequest(travelId) {
       
        swal({
            title: 'Travel Rejection Reason',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: (reason) => {
                return new Promise((resolve) => {
                    var approvalobj = {};
                    approvalobj.travelId = travelId;
                    approvalobj.RejectReason = reason;

                    $.ajax({
                        type: "POST",
                        url: "WebService.asmx/rejectTravelRequest",
                        data: '{travelRequest: ' + JSON.stringify(approvalobj) + '}',
                        contentType: "application/json",
                        dataType: "json",
                        success: function (response) {
                            resolve()
                            getTravelRequestApprovalList();
                        },
                        error: function (response) {
                            swal("Error", "Try again", "error");
                        }
                    });
                })
            },
            allowOutsideClick: () => !swal.isLoading()
        }).then((result) => {
            if (result.value) {
                swal({
                    type: 'success',
                    title: 'Rejected Successfully!',
                    html: 'Submitted reason: ' + result.value
                })
            }
        })

    }

</script>


	
         <!-- Modal -->
	<div class="modal animated zoomInUp text-left  fade" id="zoomInUp">
		<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
			<h4 class="modal-title" id="myModalLabel73">Edit Travel Request </h4>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			</div>
			<div class="modal-body">
				<div class="row match-height">

       <div class="col-md-12">
			<div class="card">
				<div class="card-content collapse show">
					<div class="card-body">
						<div class="card-text">
							
						</div>
						<form class="form" onsubmit="updateTravelRequest(); return false;">
                            <input type="hidden" id="travelId" value="" />
							<div class="form-body">
								<h4 class="form-section"><i class="ft-user"></i> Personal Info</h4>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label for="projectinput1"> Name</label>
											<input type="text" id="EmpFirstName" class="form-control" placeholder="First Name" name="EmpFirstName"  readonly="readonly">
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label for="projectinput4">Contact Number</label>
											<input type="text" id="EmpPhone" class="form-control" placeholder="Phone" name="EmpPhone" readonly="readonly">
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label for="projectinput3">E-mail</label>
											<input type="text" id="EmpEmail" class="form-control" placeholder="E-mail" name="EmpEmail" readonly="readonly">
										</div>
									</div>
									
                                    <div class="col-md-6">
										<div class="form-group">
											<label for="projectinput6">Department</label>
											<input type="text" id="EmpDepartment" class="form-control" placeholder="Phone" name="EmpDepartment" readonly="readonly">
										</div>
									</div>
								</div>

								<h4 class="form-section"><i class="la la-road"></i> Travel Info</h4>
                                <div class="row">
								<div class="col-md-4">
								    <div class="form-group">
									    <label for="companyName">Travelling From Country</label>
				
                                         <input type="text" class="form-control  from-country" id="travellingFromCountry" placeholder="Select Country"  readonly="readonly" / >
								    </div>

								</div>
                                  <div class="col-md-4">
								    <div class="form-group">
									    <label for="companyName">Travelling From State</label>
				
                                         <input type="text" class="form-control  from-state" id="travellingFromState" placeholder="Select State" readonly="readonly" />
								    </div>

								</div>
                                 <div class="col-md-4">
								    <div class="form-group">
									    <label for="companyName">Travelling From City</label>
				
                                         <input type="text" class="form-control  from-state" id="travellingFromCity" placeholder="Select State" readonly="readonly" />
								    </div>

								</div>

                                <div class="col-md-4">
								    <div class="form-group">
									    <label for="companyName">Travelling To Country</label>
				
                                         <input type="text" class="form-control  to-country" id="travellingToCountry" placeholder="Select Country" readonly="readonly" />
								    </div>

								</div>
                                  <div class="col-md-4">
								    <div class="form-group">
									    <label for="companyName">Travelling To State</label>
				
                                         <input type="text" class="form-control  to-state" id="travellingToState" placeholder="Select State" readonly="readonly" />
								    </div>

								</div>
                                 <div class="col-md-4">
								    <div class="form-group">
									    <label for="companyName">Travelling To City</label>
				
                                         <input type="text" class="form-control  to-state" id="travellingToCity" placeholder="Select State" readonly="readonly" />
								    </div>

								</div>

                                 	<div class="form-group col-md-6 mb-2">
			                            <label for="issueinput3">Travel Date</label>
			                            <%--<input type="date"  class="form-control"  data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Travel Date">--%>
                                         <input type="text" class="form-control animate" id="traveldate" placeholder="Date Dropper">
			                        </div>
			                        <div class="form-group col-md-6 mb-2">
			                            <label for="issueinput4">Return Date</label>
			                           <input type="text" class="form-control animate " id="returndate" placeholder="Date Dropper">
			                        </div>

                                    <div class="form-group col-md-6 mb-2">
			                        <label >No Of Travel Days</label>
    
						            <fieldset>
							            <div class="input-group">
								            <input id="noofdays" type="text" class="touchspin" value="0" data-bts-postfix="days"/>
							            </div>
						            </fieldset>

                                    </div>
                                   <div class="form-group col-md-6 mb-2">
                                      <div class="form-group">
									    <label for="projectinput8">Travel Reason</label>
									    <textarea id="travelReason" rows="2" class="form-control" name="comment" placeholder="Travel reason..."></textarea>
								     </div>
                                    </div>


                               <div class="form-group col-md-12 mb-2">
                                <div class="form-actions right">
								
								<button type="submit" class="btn btn-primary">
									<i class="la la-check-square-o"></i> Update
								</button>
							 </div>
                            </div>
						</div>
                      </div>
						</form>
					</div>
				</div>
			</div>
		</div>


       </div>
    </div>

  </div>
</div>
</div>

<!-- End Moddel -->


<script src="Assets/app-assets/vendors/js/forms/spinner/jquery.bootstrap-touchspin.js" type="text/javascript"></script>
<script src="Assets/app-assets/js/scripts/forms/input-groups.min.js" type="text/javascript"></script>

<script src="Assets/app-assets/js/scripts/tooltip/tooltip.min.js" type="text/javascript"></script>

<script src="Assets/app-assets/vendors/js/forms/select/select2.full.min.js" type="text/javascript"></script>
<script src="Assets/app-assets/js/scripts/forms/select/form-select2.min.js" type="text/javascript"></script>
<script src="Assets/app-assets/js/scripts/modal/components-modal.min.js" type="text/javascript"></script>

</asp:Content>
