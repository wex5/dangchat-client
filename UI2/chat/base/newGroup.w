<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="main13" component="$UI/system/components/justep/window/window"
  design="device:mobile;" xid="window" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:216px;top:48px;"
    onLoad="modelLoad" onModelConstruct="modelModelConstruct" onParamsReceive="modelParamsReceive" onInactive="modelInactive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="contactsData" idColumn="fID" limit="-1" confirmDelete="false"> 
      <column label="ID" name="fID" type="String" xid="xid1"/>  
      <column label="账号" name="fAccountID" type="String" xid="xid2"/>  
      <column label="昵称" name="fNickName" type="String" xid="xid3"/>  
      <column label="姓名" name="fName" type="String" xid="xid4"/>  
      <column label="性别" name="fGender" type="String" xid="xid5"/>  
      <column label="头像" name="fImg" type="String" xid="xid6"/>  
      <column label="电话号码" name="fTel" type="String" xid="xid7"/>  
      <column label="地区" name="fRegion" type="String" xid="xid8"/>  
      <column label="备注" name="fRemark" type="String" xid="xid9"/>  
      <column label="二维码" name="fCode" type="String" xid="xid10"/>  
      <column label="首字母拼音" name="fPinyin" type="String" xid="xid11"/>  
      <column label="关于" name="fAbout" type="String" xid="xid12"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full x-cards"
    xid="panel"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar o-top"
        xid="titleBar1"> 
        <div class="x-titlebar-left flex3" xid="left1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="button" xid="button1" icon="icon-arrow-left-c" onClick="{operation:'window.close'}"> 
            <i xid="i1" class="icon-arrow-left-c" style="font-size:larger;"/>  
            <span xid="span2"/> 
          </a>  
          <span xid="span1" class=" o-name h4"><![CDATA[发起群聊]]></span> 
        </div>  
        <div class="x-titlebar-title" xid="title1"/>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="确定" style="height:100%;padding-top:10px;" onClick="createGroupBtnClick" xid="createBtn"> 
          <i xid="i4"/>  
          <span xid="span11">确定</span> 
        </a> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content2"> 
      <div class="panel panel-default x-card panel-body" component="$UI/system/components/bootstrap/panel/panel"
        xid="panel1"> 
        <div class="form-group has-feedback o-seach" xid="formGroup1"> 
          <input component="$UI/system/components/justep/input/input" class="form-control "
            xid="groupName" placeholder="群名称" style="box-shadow: none;border:0px;border-bottom:2px solid red;"/>  
          <i class="icon-ios7-people form-control-feedback" xid="col3"/> 
        </div>  
        <a component="$UI/system/components/justep/button/button" class="btn x-gray btn-sm btn-icon-left pull-right text-black"
          label="添加成员" xid="addBtn" icon="icon-person-stalker"> 
          <i xid="i2" class="icon-person-stalker"/>  
          <span xid="span8">添加成员</span> 
        </a> 
      </div>  
      <div class="panel panel-body x-card o-newfirend" component="$UI/system/components/bootstrap/panel/panel"
        xid="newfirend" style="margin-bottom:0px;"> 
        <div component="$UI/system/components/justep/list/list" class="x-list o-nopadding"
          xid="list1" data="contactsData"> 
          <ul class="x-list-template" xid="listTemplateUl1"> 
            <li xid="li1" class="list-group-item o-noStytle o-nopadding" bind-click="deleteMember"> 
              <div class="media-left" xid="div3"> 
                <img alt="" class="o-img" bind-attr-src="val(&quot;fImg&quot;)" xid="image2"/> 
              </div>  
              <div class="media-body x-name" xid="div2"> 
                <div xid="div4"> 
                  <span bind-text="ref('fNickName')" class="text-black" xid="span5"/>  
                  <span xid="span6">(</span>  
                  <span bind-text="ref('fName')" class="text-black" xid="span7"/>  
                  <span xid="span10">)</span>  
                  <a component="$UI/system/components/justep/button/button"
                    class="btn btn-link btn-only-icon pull-right" label="button" xid="button4"
                    icon="icon-android-remove"> 
                    <i xid="i6" class="icon-android-remove"/>  
                    <span xid="span13"/> 
                  </a> 
                </div> 
              </div> 
            </li> 
          </ul> 
        </div>  
        <div xid="div6" class="panel-body o-nopadding" style="display:none;"> 
          <a component="$UI/system/components/justep/button/button" class="btn x-createGroup btn-only-label btn-block"
            label="确 定" xid="createGroupBtn" onClick="createGroupBtnClick"> 
            <i xid="i3"/>  
            <span xid="span9" style="color:white;">确 定</span> 
          </a> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
