<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="UserSettings.aspx.cs" Inherits="Travel_Management.UserSettings" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/css/plugins/animate/animate.min.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/forms/selects/select2.min.css">
<script src="Scripts/UserRoles.js"></script>

 <div class="content-body"><!-- Basic form layout section start -->
 <section id="basic-form-layouts">
	<div class="row match-height">

       <div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title" id="basic-layout-form">User Settings</h4>
					 <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
					 <div class="heading-elements">
						<ul class="list-inline mb-0">
							<li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
							<li><a data-action="expand"><i class="ft-maximize"></i></a></li>

						</ul>
					</div>
				</div>
                 <div class="form-group row">
		                <div class="col-lg-3 col-md-3">
		                    Select Employee :<select class="select2 form-control" id="searchEmp" required="required"></select>
		                </div>
		          </div>
				<div class="card-content collapse show">
					<div class="card-body">
						<div class="card-text">
							
						</div>
						<form class="form" onSubmit="saveUserRoles(); return false;">
                            <table class="table table-bordered table-striped table-hover " id="tableMasters">
                                 <thead>
									<tr>
										<td  align="center">SlNo</td>
										<td  align="center">Menu Caption</td>
										<td  align="center">Add</td>
										<td  align="center">Edit</td>
										<td  align="center">Delete</td>
										<td  align="center">Print</td>
										<td  align="center">View</td>
									</tr>
							     </thead>
                                 <tr id="tbltrM">
									<td   align="center"> </td>
									<td   align="center"><label id="lblmenuM"></label></td>
									<td  align="center">
									<input class="AddM" id="chkAdd" onchange="onCheckAllAddClick();"  type="checkbox">
									</td>
									<td   align="center">
									<input class="EditM" id="chkEdit" onchange="onCheckAllEditClick();"  type="checkbox">
									</td>
									<td   align="center">
									<input class="DeleteM" id="chkDelete" onchange="onCheckAllDeleteClick();" type="checkbox">
									</td>
									<td   align="center">
									<input class="PrintM" id="chkPrint"  onchange="onCheckAllPrintClick();" type="checkbox">
									</td>
									<td   align="center">
									<input class="ViewM" id="chkView" onchange="onCheckAllViewClick();" type="checkbox">
									</td>
								</tr>
                                 <tr class="rowM" >
								    <td  align="center"> 1 </td>
								    <td align="center"> <label >Employees </label></td>
								    <td align="center"><input  id="empAdd"  type="checkbox"></td>
								    <td align="center"><input  id="empEdit"  type="checkbox"></td>
								    <td align="center"><input  id="empDelete"  type="checkbox"></td>
								    <td align="center"><input  id="empPrint"  type="checkbox"></td>
								    <td align="center"><input  id="empView"  type="checkbox"></td>
							    </tr>
                                 <tr class="rowM" >
								    <td  align="center"> 2 </td>
								    <td align="center"> <label >Managers </label></td>
								    <td align="center"><input  id="managerAdd"  type="checkbox"></td>
								    <td align="center"><input  id="managerEdit"  type="checkbox"></td>
								    <td align="center"><input  id="managerDelete"  type="checkbox"></td>
								    <td align="center"><input  id="managerPrint"  type="checkbox"></td>
								    <td align="center"><input  id="managerView"  type="checkbox"></td>
							    </tr>
                                <tr class="rowM" >
								    <td  align="center"> 3 </td>
								    <td align="center"> <label >Travel</label></td>
								    <td align="center"><input  id="TravelAdd"  type="checkbox"></td>
								    <td align="center"><input  id="TravelEdit"  type="checkbox"></td>
								    <td align="center"><input  id="TravelDelete"  type="checkbox"></td>
								    <td align="center"><input  id="TravelPrint"  type="checkbox"></td>
								    <td align="center"><input  id="TravelView"  type="checkbox"></td>
							    </tr>
                                <tr class="rowM" >
								    <td  align="center"> 4 </td>
								    <td align="center"> <label >Report</label></td>
								    <td align="center"><input  id="ReportAdd"  type="checkbox"></td>
								    <td align="center"><input  id="ReportEdit"  type="checkbox"></td>
								    <td align="center"><input  id="ReportDelete"  type="checkbox"></td>
								    <td align="center"><input  id="ReportPrint"  type="checkbox"></td>
								    <td align="center"><input  id="ReportView"  type="checkbox"></td>
							    </tr>
                                <tr class="rowM" >
								    <td  align="center"> 5 </td>
								    <td align="center"> <label >User Roles</label></td>
								    <td align="center"><input  id="rolesAdd"  type="checkbox"></td>
								    <td align="center"><input  id="rolesEdit"  type="checkbox"></td>
								    <td align="center"><input  id="rolesDelete"  type="checkbox"></td>
								    <td align="center"><input  id="rolesPrint"  type="checkbox"></td>
								    <td align="center"><input  id="rolesView"  type="checkbox"></td>
							    </tr>
                            </table>
                            <div class="row pull-right">
							<button id="UpdateUserSettings" style="display:none" type="submit"  class="btn btn-primary "><a> <i class="la la-check-circle-o"></i> Update </a></button>
							<button id="submitUserSettings" style="display:none" type="submit"  class="btn btn-primary "><a> <i class="la la-check-circle-o"></i> Save </a></button>
							
							</div>

                            <br /><br /><br />

						</form>
					</div>
                </div>
			  </div>
			</div>
		</div>


   
     </section>
    </div>

  <script src="Assets/app-assets/vendors/js/animation/jquery.appear.js" type="text/javascript"></script>
  <script src="Assets/app-assets/js/scripts/animation/animation.js" type="text/javascript"></script>

</asp:Content>
