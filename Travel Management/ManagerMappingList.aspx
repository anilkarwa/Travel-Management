<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ManagerMappingList.aspx.cs" Inherits="Travel_Management.ManagerMappingList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/extensions/sweetalert.css">
<link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/tables/datatable/datatables.min.css">
<script src="Controllers/ManagerMappingList.js"></script>

<div class="content-body">
<section id="file-export">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Manager Mapping List</h4>
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
                        <table class="table table-striped table-bordered file-export" id="mappingListTable">
                            
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Manager 1</th>
                                    <th>Manager 2</th>
                                    <th>Manager 3</th>
                                    <th>Manager 4</th>
                                    <th>Manager 5</th>
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

</asp:Content>
