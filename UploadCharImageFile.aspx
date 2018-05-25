<%@ Page Language="C#" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>FileUpload Class Example</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <h4>Select a file to upload:</h4>

            <asp:FileUpload id="FileUpload1"
                            runat="server">
            </asp:FileUpload>

            <br /><br />

            <asp:Button id="UploadBtn"
                        Text="Upload file"
                        OnClick="UploadBtn_Click"
                        runat="server">
            </asp:Button>

            <hr />

            <asp:Label id="UploadStatusLabel"
                       runat="server">
            </asp:Label>
        </div>
    </form>
</body>
</html>
