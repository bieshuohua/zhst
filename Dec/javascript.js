//View:
/*
<div>
    <input type="button" id="file_upload" style="width: 84px; height: 29px;" class="uploadify-button uploadify uploadify-button-text" value="上传文档" />
</div>
*/

//附件上传
var config = {
    id: "file_upload",
    auto: true,
    formKey: "formData",
    formData: {
        "guid": $("#GUID").val(), "moduleType": $("#moduleType").val(), "attType": $("#attachTypeID").val(), "attName": $("#attachType").val(), "fpath": "/UploadFile/AcademicActivitiesFundCostMan/", "isNewShow": true, "isNew": true
    },
    fileTypeDesc: '内容附件',
    sfdisable: false
};
//调用Upload.js
upload(config);

//View:
/*
@if (Model.Attachments != null)
{
    <tr>
        <td>
            <ul class="ulfile" data-tag='ulfileUp' style="padding-left: 20px;">
                @foreach (var attach in Model.Attachments)
                {
                    var downloadUrl = string.Format("/HanNeng/DownFile?filePath={0}&fileName={1}&fileId={2}", attach.FilePath, attach.FileName, attach.GUID);
                    <li style='list-style: disc; line-height: 25px;'>
                        <a href="@downloadUrl">@attach.FileName</a>
                        <div style="float: right">
                            <a class="btn_a1" href="@downloadUrl">下载</a>
                            <a class="btn_a1" data-nodelete="@NoDeleteFile(attach.CreateUserID)" name="deleteImg" curid="@attach.ID">删除</a>
                        </div>
                        <div class="dvname">@attach.CreateUserName</div>
                        <div class="dvtime">@string.Format("{0:yyyy-MM-dd}", attach.CreateTime)</div>
                    </li>
                }
            </ul>
        </td>
    </tr>
}
*/
//删除按钮
$("a[data-nodelete=True]").css({ "color": "#bbb", "cursor": "default" }).unbind("mouseenter mouseleave");
$("a[data-nodelete=False]").live({
    "click": function (event) {
        DeleteFile(this, '', delCallback, true)
    }
});
