<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ApproveReimbursement.aspx.cs" Inherits="Travel_Management.ApproveReimbursement" %>
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
<script src="Controllers/ApproveReimbursement.js"></script>



<div class="content-body">
<section id="file-export">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Travel Reimbursement Approval</h4>
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
                        <table class="table table-striped table-bordered file-export" id="approverReimbursementTable">
                            
                            <thead>
                                <tr>
                                    <th>ReimbursementId</th>
                                    <th>Employee Name</th>
                                    <th>Applied Date</th>
                                    <th>Travel Details</th>
                                    <th>Amount</th>
                                    <th>Comments</th>
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
    function confirmRequest(rbId)
    {
        
        swal({
            title: 'Are you sure?',
            text: "You are going to approve travel reimbursement request!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve It!'
        }).then((result) => {
            if (result.value) {
                var approvalobj = {};
                approvalobj.ReimbursementId = rbId;

                $.ajax({
                    type: "POST",
                    url: "WebService.asmx/approveReimbursementRequest",
                    data: '{rbStatus: ' + JSON.stringify(approvalobj) + '}',
                    contentType: "application/json",
                    dataType: "json",
                    success: function (response) {
                        swal("Approved!", "Travel reimbursement request has been approved.", "success");
                        getAppliedReimbursementList();
                    },
                    error: function (response) {
                        toastr.warning("Problem approving request, Try again", {
                            showMethod: "slideDown",
                            hideMethod: "slideUp",
                            timeOut: 2e3
                        });
                    }

                });
            } else {
                swal("Cancelled", "You have cancelled the operation :)", "error");
            }
        });
    }

    function rejectRequest(rbId) {
       
        swal({
            title: 'Travel Reimbursement Rejection Reason',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: (reason) => {
                return new Promise((resolve) => {
                    var approvalobj = {};
                    approvalobj.ReimbursementId = rbId;
                    approvalobj.RejectReason = reason;

                    $.ajax({
                        type: "POST",
                        url: "WebService.asmx/rejectReimbursementRequest",
                        data: '{rbStatus: ' + JSON.stringify(approvalobj) + '}',
                        contentType: "application/json",
                        dataType: "json",
                        success: function (response) {
                            resolve();
                            getAppliedReimbursementList();
                        },
                        error: function (response) {
                            toastr.warning("Problem rejecting request, Try again", {
                                showMethod: "slideDown",
                                hideMethod: "slideUp",
                                timeOut: 2e3
                            });
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

	<!--Travel Modal -->
	<div class="modal animated pulse text-left fade" id="pulse" tabindex="-1" role="dialog" aria-labelledby="myModalLabel38" aria-hidden="true">
		<div class="modal-dialog " role="document">
		<div class="modal-content">
			<div class="modal-header">
			<h4 class="modal-title" id="myModalLabel38">Travel Details</h4>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			</div>
			<div class="modal-body">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label for="projectinput1">Travelled From</label>
						<input type="text" id="travelledFrom" class="form-control" readonly="readonly" />
					</div>
				</div>
				<div class="col-md-12">
					<div class="form-group">
						<label for="projectinput2">Travelled To</label>
						<input type="text" id="travelledTo" class="form-control" readonly="readonly" />
					</div>
				</div>

                <div class="col-md-6">
					<div class="form-group">
						<label for="projectinput1">Travel Date</label>
						<input type="text" id="travelDate" class="form-control" readonly="readonly" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="projectinput2">Return Date</label>
						<input type="text" id="returnDate" class="form-control" readonly="readonly" />
					</div>
				</div>
                 <div class="col-md-6">
					<div class="form-group">
						<label for="projectinput1">No Of Days</label>
						<input type="text" id="noofdays" class="form-control" readonly="readonly" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="projectinput2">Reason</label>
						<textarea  id="travelReason" class="form-control" readonly="readonly" ></textarea>
					</div>
				</div>


			 </div>
			</div>

             <div class="modal-footer">
				<button type="button" class="btn grey btn-outline-secondary" data-dismiss="modal">Close</button>
				
			</div>
			
		</div>
		</div>
	</div>

<!--End Travel Modal -->

   <!-- Expenss Modal -->
	<div class="modal animated rotateInUpLeft text-left fade" id="rotateInUpLeft" tabindex="-1" role="dialog" aria-labelledby="myModalLabel67" aria-hidden="true" >
		<div class="modal-dialog modal-lg" role="document" >
		<div class="modal-content">
			<div class="modal-header">
			<h4 class="modal-title" id="myModalLabel67">Expense Details</h4>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			</div>
			<div class="modal-body">
			 <div class="table-responsive">
                    <table class="table" id="expenseDetailTable">
                        <thead>
                            <tr>
                                
                                <th>Expense Name</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                        </tbody>
                    </table>
                </div>
			</div>
			<div class="modal-footer">
			<button type="button" class="btn grey btn-outline-secondary" data-dismiss="modal">Close</button>
			
			</div>
		</div>
		</div>
	</div>
     <!-- End Expenss Modal -->

<!-- Image preview Modal -->
	<div class="modal fade text-left" id="large" tabindex="-1" role="dialog" aria-labelledby="myModalLabel17" aria-hidden="true">
		<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
			<h4 class="modal-title" id="myModalLabel17">Preview Image</h4>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			</div>
			<div class="modal-body">
			 
                <img id="previeimage"  />
			</div>
			<div class="modal-footer">
			<button type="button" class="btn grey btn-outline-secondary" data-dismiss="modal">Close</button>
			
			</div>
		</div>
		</div>
	</div>
<!-- End Image preview Modal -->
<script src="Assets/app-assets/vendors/js/forms/spinner/jquery.bootstrap-touchspin.js" type="text/javascript"></script>
<script src="Assets/app-assets/js/scripts/forms/input-groups.min.js" type="text/javascript"></script>

<script src="Assets/app-assets/js/scripts/tooltip/tooltip.min.js" type="text/javascript"></script>

<script src="Assets/app-assets/vendors/js/forms/select/select2.full.min.js" type="text/javascript"></script>
<script src="Assets/app-assets/js/scripts/forms/select/form-select2.min.js" type="text/javascript"></script>
<script src="Assets/app-assets/js/scripts/modal/components-modal.min.js" type="text/javascript"></script>


</asp:Content>
