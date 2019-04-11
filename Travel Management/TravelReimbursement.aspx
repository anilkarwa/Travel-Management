<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="TravelReimbursement.aspx.cs" Inherits="Travel_Management.TravelReimbursement" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/forms/selects/select2.min.css">

<script src="Controllers/TrvaelReimbursementRequest.js" ></script>

<div class="content-body"><!-- Default styling start -->
    <!-- Table header styling start -->
<div class="row" id="header-styling">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Travel Anticipated Expenses</h4>
                <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
                <div class="heading-elements">
                    <ul class="list-inline mb-0">
                        <li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
                        <li><a data-action="expand"><i class="ft-maximize"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="card-content collapse show">
               <form class="form" onSubmit="saveExpenseDate(); return false;" id="expenseForm">
                <div id="overlay" style="display: none;"></div>
                 <img id="loaderImage" src="Scripts/loading.gif" width="150" height="150" style="position:absolute;z-index:1; border-radius : 50%; margin-top:20%;margin-left:40%;display:none; " />
                <div class="card-body card-dashboard">
                    <p class="card-text">Please enter you travel expends details and upload the related vouchers images.</p>
                </div>
                   <div class="form-group row">
	                    <label class="col-lg-3 col-md-2 label-control" for="projectinput1">Select your travel :</label>
		                <div class="col-lg-5 col-md-6">
		                    <select class="select2 form-control" id="travelid" required="required"></select>
		                </div>
		          </div>
                <div class="table-responsive">
                    <input type="hidden" id="expenseTableRowCount" value="1" />
                    <table class="table" id="expenseAddTable">
                        <thead class="bg-success white">
                            <tr>
                                <th>Expense Type</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Upload Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" class="form-control" id="expenseName1" value="" placeholder="Enter expense name.."  required="required"/></td>
                                <td><input type="text" class="form-control" id="expenseDescription1" value="" placeholder="Expense description.." required="required" /></td>
                                <td><input type="text" class="form-control" id="expenseAmount1" value="" placeholder="Expense amount.." required="required" /></td>
                                <td><input type="file" class="form-control" id="expenseImage1" required="required"></td>
                                <td></td>
                            </tr>
                            
                        </tbody>
                    </table>
                     
                </div>
                <div class="row">
                <div class="col-md-6 col-sm-4">
                  <button  onclick="addNewExpenseRow(); return false;" class="btn btn-success btn-min-width mr-1 mb-1"><i class="la la-plus"></i> Add Row</button> 
                </div>
                <div class="col-md-6 col-sm-8 text-right">
                  <button type="reset" class="btn btn-warning btn-min-width mr-1 mb-1"><i class="la la-times-circle"></i>Reset </button>
                  <button type="submit" class="btn btn-info btn-min-width mr-1 mb-1 "><i class="la la-check-circle"></i> Save</button>
               </div>
              </div>
           </form>
            </div>
        </div>
    </div>
</div>
<!-- Table header styling end -->
</div>
    <script src="Assets/app-assets/js/scripts/forms/input-groups.min.js" type="text/javascript"></script>

</asp:Content>
