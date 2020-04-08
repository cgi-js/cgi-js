<form action="index">
    <input type="text" name="uname">
    <input type="submit" value="go"><br />
</form>
<%
if (request.getParameter("uname")) {
    out.print("Welcome "+request.getParameter("uname"));  
  
    String driver=config.getInitParameter("dname");  
    out.print("driver name is="+driver); 
}
%>
