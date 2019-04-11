<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ManagerMatrix.aspx.cs" Inherits="Travel_Management.ManagerMatrix" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <link rel="stylesheet" type="text/css" href="Assets/app-assets/css/plugins/animate/animate.min.css">
    <link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/forms/selects/select2.min.css">
    <script src="Controllers/MapMatrix.js"></script>



   <div class="content-body">
    <section id="cardAnimation" class="cardAnimation">
     <div class="row">

         <div class="col-md-12 col-sm-12">
           <form onsubmit="saveManagerMapping(); return false;">
            <div class="card box-shadow-0 animated zoomIn" >
                <div class="card-header white bg-success">
                    <h4 class="card-title white">Map Managers</h4>
                </div>
                <div class="card-content collapse show">
                    <div class="card-body border-bottom-success">
                         <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Search Employee</th>
                                    <th>Search Manager1</th>
                                    <th>Search Manager2</th>
                                    <th>Search Manager3</th>
                                    <th>Search Manager4</th>
                                    <th>Search Manager5</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><select class="select2 form-control" id="searchEmp"></select></td>
                                    <td><select class="select2 form-control" id="searchManager1"></select></td>
                                    <td><select class="select2 form-control" id="searchManager2"></select></td>
                                    <td><select class="select2 form-control" id="searchManager3"></select></td>
                                    <td><select class="select2 form-control" id="searchManager4"></select></td>
                                    <td><select class="select2 form-control" id="searchManager5"></select></td>
                                </tr>
                                
                            </tbody>
                        </table>
                          <table class="table" id="updateTable" style="display:none">
                            
                            <tbody>
                                <tr>
                                    <td><input type="text" class="form-control" id="updateEmpId" readonly="readonly">
                        <p class="badge-default badge-success block-tag text-center"><small class="block-area white">Employee Name</small></p></td>
                                    <td><input type="text" class="form-control" id="updateManager1" readonly="readonly" >
                        <p class="badge-default badge-success block-tag text-center"><small class="block-area white">Manager1</small></p></td>
                                    <td><input type="text" class="form-control" id="updateManager2" readonly="readonly">
                        <p class="badge-default badge-success block-tag text-center"><small class="block-area white">Manager2</small></p></td>
                                    <td><input type="text" class="form-control" id="updateManager3" readonly="readonly" >
                        <p class="badge-default badge-success block-tag text-center"><small class="block-area white">Manager3</small></p></td>
                                    <td><input type="text" class="form-control" id="updateManager4" readonly="readonly">
                        <p class="badge-default badge-success block-tag text-center"><small class="block-area white">Manager4</small></p></td>
                                    <td><input type="text" class="form-control" id="updateManager5" readonly="readonly">
                        <p class="badge-default badge-success block-tag text-center"><small class="block-area white">Manager5</small></p></td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>

                    <div class="form-group col-md-12 mb-2">
                    <div class="form-actions text-right">
	               
	                <button id="savebtn" type="submit" class="btn btn-success">
		                <i class="la la-check-square-o"></i> Save
	                </button>
                     <button id="updatebtn" style="display:none" onclick="updateManagerMapping(); return false;" class="btn btn-success">
		                <i class="la la-check-square-o"></i> Update
	                </button>
	                </div>
                </div>


                    </div>

                   

                </div>
                    
            </div>
         </form>
        </div>
         
     </div>
   </section>


   </div>




    <script src="Assets/app-assets/vendors/js/animation/jquery.appear.js" type="text/javascript"></script>
    <script src="Assets/app-assets/js/scripts/animation/animation.js" type="text/javascript"></script>

</asp:Content>
