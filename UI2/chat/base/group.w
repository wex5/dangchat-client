<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="main13" component="$UI/system/components/justep/window/window"
  design="device:mobile;" xid="window" sysParam="false" xmlns:xui="http://www.justep.com/xui">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:246px;top:163px;"
    onModelConstruct="modelModelConstruct" onunLoad="modelUnLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="groupMembersData" idColumn="fID"> 
      <column name="fID" type="String" xid="xid1"/>  
      <column name="fName" type="String" xid="xid2"/>  
      <column name="fImg" type="String" xid="xid3"/>  
      <column name="fIsAdmin" type="String" xid="xid4"/>  
      <column name="fIsOnline" type="String" xid="xid5"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full x-cards"
    xid="panel"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar top-background"
        xid="titleBar1"> 
        <div class="return-div"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="button" xid="button1" icon="icon-arrow-left-c" onClick="{operation:'window.close'}"> 
            <i xid="i1" class="icon-arrow-left-c" style="font-size:larger;"/>  
            <span xid="span2"/> 
          </a> 
        </div>  
        <span xid="title" class="x-titlebar-left"><![CDATA[群组信息]]> </span>  
        <div xid="right1" style="padding:3px 5px 0px 0px;"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="button" xid="addMemberBtn" icon="icon-android-add-contact" style="height:100%;width:50px;"> 
            <i xid="i4" class="icon-android-add-contact"/>  
            <span xid="span4"/> 
          </a>  
          <a class="btn btn-link btn-only-icon" component="$UI/system/components/justep/button/button"
            icon="icon-android-more" label="button" xid="personalBtn" onClick="personalBtnClick"
            style="width:50px;height:100%;"> 
            <i class="icon-android-more" xid="i7"/>  
            <span xid="span8"/> 
          </a> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content2"> 
      <div class="panel panel-body x-card" style="margin:0;" component="$UI/system/components/bootstrap/panel/panel"
        xid="panel5"> 
        <div class="media-left" xid="div6"> 
          <img xid="avatar" alt="" class="o-img"/> 
        </div>  
        <div class="media-body" xid="div7" bind-click="groupTitleClick"> 
          <span xid="groupName" class="group-name"/>  
          <span xid="span11" bind-if="isAdmin"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button2" icon="icon-edit" style="padding:0px;font-size:12pt;"> 
              <i xid="i2" class="icon-edit"/>  
              <span xid="span7"/> 
            </a> 
          </span>  
          <div xid="div14"/> 
        </div> 
      </div>  
      <div class="panel list-group o-noStytle" style="border:none;" component="$UI/system/components/bootstrap/panel/panel"> 
        <div component="$UI/system/components/justep/panel/panel" xid="groupAboutPanel"
          class="list-group-item item-container" bind-click="groupAboutPanelClick"> 
          <div class="item-row"> 
            <span style="font-size:12pt;color:#111;margin-left:12px;"><![CDATA[关于群]]></span>  
            <span xid="span12"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
                label="button" xid="button5" icon="icon-edit" style="padding:0px;font-size:12pt;"
                bind-visible="isAdmin"> 
                <i xid="i8" class="icon-edit"/>  
                <span xid="span10"/> 
              </a> 
            </span>  
            <br/>  
            <span xid="groupAbout" class="item-value" style="margin-left:12px;"><![CDATA[]]></span> 
          </div>  
          <div style="clear:both; height:0px;"/> 
        </div>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-lg"
          style="position:absolute; top:80px; right:20px; border-radius:48px; background-color:rgb(75,115,164); border:0px;height:51px;width:51px;"
          xid="sendMessageBtn" icon="icon-chatbox-working" onClick="sendMessageBtnClick"> 
          <i xid="i6" class="icon-chatbox-working" style="font-size:18pt;"/>  
          <span xid="span6"/> 
        </a> 
      </div>  
      <div class="panel list-group o-noStytle" style="border:none;" component="$UI/system/components/bootstrap/panel/panel"> 
        <div class="list-group-item item-container"> 
          <div class="setup-title">设置</div>  
          <div style="clear:both;"/> 
        </div>  
        <div class="list-group-item item-container"> 
          <div class="item-image"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button1" icon="icon-android-reminder"> 
              <i xid="i1" class="icon-android-reminder" style="font-size:20pt;"/>  
              <span xid="span2"/> 
            </a> 
          </div>  
          <div style="float:left;width:130px;margin-top:12px;font-size:12pt;color:#111;margin-left:12px;">推送通知</div>  
          <span component="$UI/system/components/justep/button/toggle" class="x-toggle"
            xid="isSendByEnterEnabled" style="width:78px; margin:1px 0px 0px 186px;"
            ON=" " OFF=" "/>  
          <div style="clear:both;"/> 
        </div> 
      <div class="list-group-item item-container" xid="div19" bind-visible="isAdmin" style="display:none;">
   <div class="item-image" xid="div20">
    <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="button" xid="button7" icon="icon-android-reminder">
     <i xid="i10" class="icon-android-reminder" style="font-size:20pt;"></i>
     <span xid="span15"></span></a> 
  </div> 
   <div style="float:left;width:130px;margin-top:12px;font-size:12pt;color:#111;margin-left:12px;" xid="div21">共享群组</div>
   <span component="$UI/system/components/justep/button/toggle" class="x-toggle" xid="isShareGroup" style="width:78px; margin:1px 0px 0px 186px;" ON=" " OFF=" " onChange="isShareGroupChange"></span>
   <div xid="div23"><span xid="span16" style="margin-left: 15px;"><![CDATA[如果设置为共享，新加入的用户可以浏览历史消息。]]></span></div><div style="clear:both;" xid="div22"></div>
  </div></div>  
      <div class="panel list-group o-noStytle" style="border:none;" component="$UI/system/components/bootstrap/panel/panel"
        xid="panel1"> 
        <div class="list-group-item item-container" xid="div1"> 
          <div class="setup-title" xid="div2">成员</div>  
          <div style="clear:both;" xid="div3"/> 
        </div>  
        <div component="$UI/system/components/justep/list/list" class="x-list"
          xid="list1" data="groupMembersData"> 
          <ul class="x-list-template" xid="listTemplateUl1" style="margin-bottom:0px;"> 
            <li xid="li1" bind-click="deleteMember"> 
              <div class="list-group-item item-container" xid="div4" style="border-bottom:0px;"> 
                <div class="item-image" xid="div5"> 
                  <img src="" alt="" xid="image1" height="50px" style="width:50px;border-radius:50px;"
                    bind-attr-src=" $object.val(&quot;fImg&quot;)"/> 
                </div>  
                <div class="setup-item" style="width:130px;margin-top:15px;"
                  xid="div8"> 
                  <span xid="span5" bind-text="ref('fName')"><![CDATA[]]></span> 
                </div>  
                <span xid="span13" class="pull-right" style="font-size:12pt;margin-top:7px;color:red;font-weight:bolder;"
                  bind-if="$model.currentPersonIsAdmin( val(&quot;fIsAdmin&quot;))"> 
                  <a component="$UI/system/components/justep/button/button"
                    class="btn btn-link btn-only-icon" label="button" xid="button6"
                    icon="icon-android-remove"> 
                    <i xid="i9" class="icon-android-remove"/>  
                    <span xid="span14"/> 
                  </a> 
                </span>  
                <span xid="span1" class="pull-right" style="font-size:12pt;margin-top:13px;color:red;font-weight:bolder;"
                  bind-if="$object.val(&quot;fIsAdmin&quot;)"><![CDATA[管理员]]></span>  
                <div style="clear:both;" xid="div9"/> 
              </div> 
            </li> 
          </ul> 
        </div>  
        <div class="list-group-item item-container" xid="div13"> 
          <div class="item-image" xid="div12"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button3" icon="icon-android-add-contact"> 
              <i xid="i3" class="icon-android-add-contact" style="font-size:20pt;"/>  
              <span xid="span3"/> 
            </a> 
          </div>  
          <div class="setup-item" style="width:130px;margin-top:10px;" xid="div11">添加成员</div>  
          <div style="clear:both;" xid="div10"/> 
        </div>  
        <div class="list-group-item item-container" xid="div16" bind-click="dismiss"
          bind-if="isAdmin"> 
          <div class="item-image" xid="div15"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button4" icon="icon-close"> 
              <i xid="i5" class="icon-close" style="font-size:20pt;"/>  
              <span xid="span9"/> 
            </a> 
          </div>  
          <div class="setup-item" style="width:130px;margin-top:10px;" xid="div18">解散群</div>  
          <div style="clear:both;" xid="div17"/> 
        </div> 
      <div bind-if="isAdmin" class="list-group-item item-container" xid="div111" xui:parent="panel1" xui:update-mode="insert">
   <div style="clear:both;" xid="div211"></div>
   <a class="btn btn-default" component="$UI/system/components/justep/button/button" label="删除并退出" onClick="leaveGroupBtnClick" style="background-color: rgb(75,115,164);width:100%;" xid="leaveGroupBtn">
    <i xid="i211"></i>
    <span xid="span211">删除并退出</span></a> </div></div> 
    </div> 
  </div> 
</div>
