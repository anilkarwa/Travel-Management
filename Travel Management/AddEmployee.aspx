<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddEmployee.aspx.cs" Inherits="Travel_Management.AddEmployee" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/forms/spinner/jquery.bootstrap-touchspin.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/forms/selects/select2.min.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/extensions/datedropper.min.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/extensions/timedropper.min.css">

<script src="Controllers/Employee.js"></script>

    <div class="content-body"><!-- Basic form layout section start -->
 <section id="basic-form-layouts">
	<div class="row match-height">

       <div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title" id="basic-layout-form">Add Employee</h4>
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
						<form class="form" onSubmit="saveNewEmployee(); return false;">

                            <input type="hidden" id="EmpId" value="" />

							<div class="form-body">
								<h4 class="form-section"><i class="ft-user"></i> Personal Info</h4>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label for="projectinput1">First Name</label>
											<input type="text" id="EmpFirstName" class="form-control" placeholder="First Name" name="EmpFirstName" required="required">
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label for="projectinput2">Last Name</label>
											<input type="text" id="EmpLastName" class="form-control" placeholder="Last Name" name="EmpLastName" required="required">
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label for="projectinput3">E-mail</label>
											<input type="text" id="EmpEmail" pattern="/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/" class="form-control" placeholder="E-mail" name="EmpEmail" required="required">
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label for="projectinput4">Mobile Number</label>
											<input type="text" id="EmpPhone" class="form-control" maxlength="10" pattern="[\d0-9]{10}" placeholder="Phone" name="EmpPhone" required="required">
										</div>
									</div>
                                    
								</div>

								<h4 class="form-section"><i class="la la-file-text-o"></i> Other Info</h4>
                                <div class="row">
								
								 
                                    <div class="form-group col-md-6 mb-2">
			                            <label for="issueinput3">Date Of Joining</label>
			                            <%--<input type="date"  class="form-control"  data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Travel Date">--%>
                                         <input type="text" class="form-control animate" id="DOJ" placeholder="Date of Joining.." required="required">
			                        </div>


								   <div class="form-group col-md-6 mb-2">
											<label for="projectinput6">Department</label>
											<input type="text" id="EmpDepartment" class="form-control" placeholder="Department" name="EmpDepartment" required="required">
										</div>
									
                                    <div class="form-group col-md-6 mb-2">
											<label for="projectinput6">Designation</label>
                                        <fieldset class="form-group position-relative">
											<select class="form-control" name="designation" id="designation"  required="required">
                                                <option value="">--Select--</option>
                                                <option value="Developer">Developer</option>
                                                <option value="Manager">Manager</option>
                                                <option value="Sales_Person">Sales Person</option>
                                                <option value="Tester">Tester</option>
											</select>
                                           </fieldset>
                                       
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

    <script src="Assets/app-assets/vendors/js/forms/tags/form-field.js" type="text/javascript"></script>
</asp:Content>
