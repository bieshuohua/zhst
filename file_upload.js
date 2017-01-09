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

//文件存在验证
function beforeSubmit() {
    if (!$("form").eq(0).Validform().check()) {
        return false;
    } else {
        var flag = true;
        $.ajax({
            url: "/PaperWorks/CheckFile",
            dataType: "json",
            type: "POST",
            data: { guid: $("#GUID").val() },
            async: false,
            success: function (data) {
                if (!data.isOk) {
                    artDialog.alert("经费拨付文件未上传！");
                    flag = false;
                }
            }
        });
        return flag;
    }
    showLoading();
}
//js调用的c#控制器方法，查询Attachment表外键为原GUID的项是否存在
public JsonResult CheckFile(string guid)//c# code
{
    var criteria = new NameValueCollection();
    criteria.Add(GetPropertyName<Model.Attachment>(m => m.FID), guid);
    criteria.Add(CreateWhereCriteria<Model.Attachment>(m => m.IsDeleted, "1", Configuration.Enums.MeanOperator.NotEqual));
    var isExists = new BLL.Attachment().Exists(criteria);
    return Json(new { isExist = isExists });
}
//删除按钮回调函数，即时的在页面删除文件
function afterDelete(curid) {
    $("a[curid=" + curid + "]").parents("li").remove();
}
