<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ReimbursementStatus.aspx.cs" Inherits="Travel_Management.ReimbursementStatus" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" type="text/css" href="Assets/app-assets/vendors/css/tables/datatable/datatables.min.css">
    <link rel="stylesheet" type="text/css" href="Assets/app-assets/css/plugins/animate/animate.min.css">
    <script src="Controllers/ReimbursementStatus.js"></script>
    <!-- END Page Level CSS-->
    <!-- BEGIN Custom CSS-->
    <link rel="stylesheet" type="text/css" href="Assets/assets/css/style.css">

   <div class="content-body">
    <section id="cardAnimation" class="cardAnimation">
     <div class="row">

         <div class="col-md-12 col-sm-12">
            <div class="card box-shadow-0 animated zoomIn" >
                <div class="card-header white bg-success">
                    <h4 class="card-title white">Reimbursement Status</h4>
                </div>
                <div class="card-content collapse show">
                    <div class="card-body border-bottom-success">
                       <div class="table-responsive">
                        <table class="table" id="reimbursementStatusTable">
                            <thead>
                                <tr>
                                    
                                    <th>Reimbursement Id</th>
                                    <th>Employee Name</th>
                                    <th>Submitted Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
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




    <script src="Assets/app-assets/vendors/js/animation/jquery.appear.js" type="text/javascript"></script>
    <script src="Assets/app-assets/js/scripts/animation/animation.js" type="text/javascript"></script>


</asp:Content>
