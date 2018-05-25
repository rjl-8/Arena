<%@ Page Language="vb" AutoEventWireup="false"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Arena</title>
</head>
<body>

<table style = "width:100%;height:100%" border = "1">
<tr>
    <td colspan = "2" style = "height:15%" align = "center">
    <table border = "1">
    <tr>
<%
    dim i as int16
    for i = 1 to 12
%>
        <td class = "phase_label"><%=i%></td>
<%
    next
%>
    </tr>
    <tr>
<%
    for i = 1 to 12
%>
        <td class = "phase_list"><%=i%></td>
<%
    next
%>
    </tr>
    </table>
    </td>
</tr>
<tr>
    <td style = "width:85%;height=100px">
    <iframe src = "map.aspx" scrolling = "yes" style = "height:500px;width:100%">
    Your browser does not support iframes
    </iframe>
    </td>

    <td style = "width:15%">
<table border = "1">
<tr><td>STR</td><td></td></tr>
<tr><td>DEX</td><td></td></tr>
<tr><td>CON</td><td></td></tr>
<tr><td>EGO</td><td></td></tr>
<tr><td></td><td></td></tr>
<tr><td></td><td></td></tr>
<tr><td></td><td></td></tr>
<tr><td></td><td></td></tr>
<tr><td></td><td></td></tr>
<tr><td></td><td></td></tr>
<tr><td></td><td></td></tr>
<tr><td></td><td></td></tr>
<tr><td></td><td></td></tr>
</table>
<!--
    <iframe src = "character.html" />
-->
    </td>
</tr>
<tr>
    <td colspan = "2">
    <textarea rows = "4" cols = "50">
    </textarea>
    </td>
</tr>
</table>

</body>
</html>
