<!-- https://github.com/cfmaniac/JSP-Info/blob/master/info.jsp -->

Server info = <%= application.getServerInfo() %> <br>
Servlet engine version = <%=  application.getMajorVersion() %>.<%= application.getMinorVersion() %><br>
JSP version = <%= JspFactory.getDefaultFactory().getEngineInfo().getSpecificationVersion()  %> <br>
Java version = <%= System.getProperty("java.vm.version") %><br>


<%@page import="static Pckg.JC.*"%><%
  jspinfo(pageContext);
%> 
