<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="TravelReport.aspx.cs" Inherits="Travel_Management.TravelReport" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/extensions/sweetalert.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/tables/datatable/datatables.min.css">
<script src="Controllers/TravelReportList.js"></script>

<div class="content-body">
<section id="file-export">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Travel Report List</h4>
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
                        <div id="overlay" style="display: none;"></div>
                           <img id="loaderImage" src="Scripts/loading.gif" width="150" height="150" style="position:absolute;z-index:1; border-radius : 50%; margin-top:20%;margin-left:40%;display:none; " />
                     <div class="table-responsive">
                        <table class="table table-striped table-bordered file-export" id="travelReportListTable">
                            
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Travel Date</th>
                                    <th>Return Date</th>
                                    <th>Travel Reason</th>
                                    <th>Approval Status</th>

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
</asp:Content>
