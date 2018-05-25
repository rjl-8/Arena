using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

public partial class UploadCharImageFile : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
//        var FU = new FileUpload();
//        FU.
    }

    protected void UploadBtn_Click(object sender, EventArgs e)
    {
        // Specify the path on the server to
        // save the uploaded file to.
        string savePath = @"D:\Hosting\3105596\html";

        // Before attempting to save the file, verify
        // that the FileUpload control contains a file.
        if (FileUpload1.HasFile)
        {
            // Get the name of the file to upload.
            string fileName = Server.HtmlEncode(FileUpload1.FileName);

            // Get the extension of the uploaded file.
            string extension = System.IO.Path.GetExtension(fileName);

            // Allow only files with .doc or .xls extensions
            // to be uploaded.
            if ((extension == ".jpg"))
            {
                // Append the name of the file to upload to the path.
                savePath += fileName;

                // Call the SaveAs method to save the
                // uploaded file to the specified path.
                // This example does not perform all
                // the necessary error checking.
                // If a file with the same name
                // already exists in the specified path,
                // the uploaded file overwrites it.
                FileUpload1.SaveAs(savePath);

                // Notify the user that their file was successfully uploaded.
                UploadStatusLabel.Text = "Your file was uploaded successfully.";
            }
            else
            {
                // Notify the user why their file was not uploaded.
                UploadStatusLabel.Text = "Your file was not uploaded because " +
                                         "it does not have a .doc or .xls extension.";
            }

        }

    }
}
