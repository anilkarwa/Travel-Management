<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="New Travel Request.aspx.cs" Inherits="Travel_Management.New_Travel_Request" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/forms/spinner/jquery.bootstrap-touchspin.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/forms/selects/select2.min.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/extensions/datedropper.min.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/extensions/timedropper.min.css">
<script src="Controllers/NewTravelRequest.js"></script>



<div class="content-body"><!-- Basic form layout section start -->
 <section id="basic-form-layouts">
	<div class="row match-height">

       <div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title" id="basic-layout-form">Travel Info</h4>
					<a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
					<div class="heading-elements">
						<ul class="list-inline mb-0">
							<li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
							<li><a data-action="expand"><i class="ft-maximize"></i></a></li>

						</ul>
					</div>
				</div>
				<div class="card-content collapse show">
					<div class="card-body">
						<div class="card-text">
							
						</div>
						<form class="form" onSubmit="saveNewRequest(); return false;">

                            <input type="hidden" id="EmpId" value="" />
                            <div id="overlay" style="display: none;"></div>
                           <img id="loaderImage" src="Scripts/loading.gif" width="150" height="150" style="position:absolute;z-index:1; border-radius : 50%; margin-top:20%;margin-left:40%;display:none; " />
							<div class="form-body">
								<h4 class="form-section"><i class="ft-user"></i> Personal Info</h4>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label for="projectinput1">First Name</label>
											<input type="text" id="EmpFirstName" class="form-control" placeholder="First Name" name="EmpFirstName" readonly="readonly">
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label for="projectinput2">Last Name</label>
											<input type="text" id="EmpLastName" class="form-control" placeholder="Last Name" name="EmpLastName" readonly="readonly">
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
											<label for="projectinput4">Contact Number</label>
											<input type="text" id="EmpPhone" class="form-control" placeholder="Phone" name="EmpPhone" readonly="readonly">
										</div>
									</div>
                                    <div class="col-md-6">
										<div class="form-group">
											<label for="projectinput6">Department</label>
											<input type="text" id="EmpDepartment" class="form-control" placeholder="Phone" name="EmpDepartment" readonly="readonly">
										</div>
									</div>
								</div>

								<h4 class="form-section"><i class="la la-subway"></i> Travel Info</h4>
                                <div class="row">
								<div class="col-md-4">
								    <div class="form-group">
									    <label for="companyName">Travelling From Country</label>
			

                                        <select class="select2 form-control" id="travellingFromCountry" required="required"> </select>

								    </div>

								</div>
                                  <div class="col-md-4">
								    <div class="form-group">
									    <label for="companyName">Travelling From State</label>
				
                                        <select class="select2 form-control" id="travellingFromState" required="required"></select>
								    </div>

								</div>

                                 <div class="col-md-4">
								    <div class="form-group">
									    <label for="companyName">Travelling From City</label>
				
                                        <select class="select2 form-control" id="travellingFromCity" required="required"></select>
								    </div>

								</div>


                                <div class="col-md-4">
								    <div class="form-group">
									    <label for="companyName">Travelling To Country</label>
				
                                         <select class="select2 form-control" id="travellingToCountry" required="required"></select>
								    </div>

								</div>
                                  <div class="col-md-4">
								    <div class="form-group">
									    <label for="companyName">Travelling To State</label>
				
                                          <select class="select2 form-control" id="travellingToState" required="required"></select>
								    </div>

								</div>

                                  <div class="col-md-4">
								    <div class="form-group">
									    <label for="companyName">Travelling To City</label>
				
                                          <select class="select2 form-control" id="travellingToCity" required="required"></select>
								    </div>

								</div>

                                 	<div class="form-group col-md-6 mb-2">
			                            <label for="issueinput3">Travel Date</label>
			                            <%--<input type="date"  class="form-control"  data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Travel Date">--%>
                                         <input type="text" class="form-control animate" id="traveldate" placeholder="Travel Date.." required="required">
			                        </div>
			                        <div class="form-group col-md-6 mb-2">
			                            <label for="issueinput4">Return Date</label>
			                           <input type="text" class="form-control animate " id="returndate" placeholder="Return Date.." required="required">
			                        </div>

                                    <div class="form-group col-md-6 mb-2">
			                        <label >No Of Travel Days</label>
    
						            <fieldset>
							            <div class="input-group">
								            <input type="text" class="touchspin" id="noofdays" value="0" data-bts-postfix="days" required="required" />
							            </div>
						            </fieldset>

                                    </div>
                                   <div class="form-group col-md-6 mb-2">
                                      <div class="form-group">
									    <label for="projectinput8">Travel Reason</label>
									    <textarea  rows="2" id="travelReason" class="form-control" name="comment" placeholder="Travel reason..." required="required"></textarea>
								     </div>
                                    </div>


                               <div class="form-group col-md-12 mb-2">
                                <div class="form-actions right">
								<button type="button" class="btn btn-warning mr-1" onclick="clearform();">
									<i class="ft-x"></i> Reset
								</button>
								<button type="submit" class="btn btn-primary">
									<i class="la la-check-square-o"></i> Save
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
     </section>
    </div>


    <script src="Assets/app-assets/vendors/js/forms/spinner/jquery.bootstrap-touchspin.js" type="text/javascript"></script>
    <script src="Assets/app-assets/js/scripts/forms/input-groups.min.js" type="text/javascript"></script>

</asp:Content>
