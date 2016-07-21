<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  xid="window" 
  component="$UI/system/components/justep/window/window" 
  extends="../base/main.w" 
  design="device:m;" 
  __id="id_1" 
  sysParam="false" 
  class="window" >

  <div xid="titleBar1" xui:update-mode="delete"/>
    <div class="x-popOver" component="$UI/system/components/justep/popOver/popOver" direction="auto" opacity="0" xid="popOver" xui:before="menuPopOver" xui:parent="window" xui:update-mode="insert" >
<div class="x-popOver-overlay" xid="div1_2" />
<div class="x-popOver-content" xid="div2_2" >
<a class="btn btn-link btn-only-icon" component="$UI/system/components/justep/button/button" icon=" icon-loading-a" label="button" xid="button2" >
<i class="icon-loading-a" style="font-size:30px" xid="i5" />
<span xid="span5" />
</a>
</div>
</div>
    <resource xid="resource2_5" xui:parent="window" xui:update-mode="insert" >
<require url="css!$UI/work/common/css/pub" xid="require1_5" />
</resource>
   <a xid="createGroupBtn" style="    width: 50px;border-radius: 48px;background-color: #2fa4e7;border: 0px;color:#fff;"  xui:update-mode="merge"/>
    <div class="x-panel-bottom" style="background-color:#E3E3E3;" xid="bottom1_2" xui:parent="panel2" xui:update-mode="insert" >
<div class="btn-group-justified" component="$UI/system/components/justep/button/buttonGroup" style="height:100%;margin-top:-5px;color:#666;background-color:#fcfcfc;border-top:1px solid #f3f3f3;outline:none;" tabbed="true" xid="buttonGroup1" >
<a class="btn btn-icon-top" component="$UI/system/components/justep/button/button" icon="icon-chatbox-working" label="消息" target="messageContent" xid="messageBtn" >
<i class="icon-chatbox-working" style="font-size:large;" xid="i11" />
<span style="font-size:small;" xid="span14" >



























消息</span>
</a>
<a class="btn btn-icon-top" component="$UI/system/components/justep/button/button" icon="icon-android-contacts" label="通讯录" target="contactsContent" xid="contactsBtn" >
<i class="icon-android-contacts" style="font-size:large;" xid="i12" />
<span style="font-size:small;" xid="span15" >









通讯录</span>
</a>
<a class="btn btn-icon-top" component="$UI/system/components/justep/button/button" icon="icon-ios7-keypad" label="工作" target="workContent" xid="workBtn" >
<i class="icon-ios7-keypad" style="font-size:large;" xid="i13" />
<span style="font-size:small;" xid="span18" >






工作</span>
</a>
</div>
</div>
    <div class="x-titlebar" component="$UI/system/components/justep/titleBar/titleBar" xid="titleBar4" xui:parent="top2" xui:update-mode="insert" >
<div class="x-titlebar-left" xid="left4" >
<a class="btn btn-link pull-left" component="$UI/system/components/justep/button/button" label="管理组织" onClick="manageGroupBtnClick" style="display:none;font-size:0.8em;" xid="manageGroupBtn" >
<i xid="i6" />
<span xid="span6" >



























管理组织</span>
</a>
</div>
<div class="x-titlebar-title" xid="title2" >
<span xid="span19" >



























铛铛</span>
</div>
<div class="x-titlebar-right flex1 reverse" xid="right2" >
<a class="btn btn-link btn-only-icon x-personal" component="$UI/system/components/justep/button/button" icon="icon-android-more" onClick="personalBtnClick" xid="personalBtn" >
<i class="icon-android-more" xid="i41" />
<span xid="span41" />
</a>
</div>
</div>
    <div class="x-contents-content" xid="workContent" xui:parent="pages" xui:update-mode="insert" >
<div autoLoad="false" class="x-window-container" component="$UI/system/components/justep/windowContainer/windowContainer" src="$UI/work/workHome/process/workHome/mainActivity.m.w" xid="windowContainer" />
</div>
    <div bind-style="{background:val(&quot;fType&quot;)==&quot;group&quot;?&quot;#ffaa99&quot;:&quot;&quot;}" bind-visible=" !$model.getImageUrl(val('fImg'))" class="photoDiv" xid="div15" xui:parent="div2" xui:update-mode="insert" >
<span bind-text="val(&quot;fNickName&quot;)?(val(&quot;fType&quot;) == &quot;group&quot;?(val(&quot;fNickName&quot;) .slice(-2)  == &quot;、、&quot;?&quot;群组&quot; :(val(&quot;fNickName&quot;).slice(0,2))):(val(&quot;fNickName&quot;).slice(-2))):&quot;&quot;" xid="span32" />
</div>
   <img xid="image6" bind-visible=" $model.getImageUrl(val('fImg'))" bind-attr-src=" $model.getImageUrl(val('fImg'))"  xui:update-mode="merge"/>
   <div xid="contactsContainer" activity="mainActivity" process="/SA/OPM/system/systemProcess" src="contactList.w"  xui:update-mode="merge"/>
   <a xid="showMenuPopOverBtn" style="position: absolute;bottom:20px;right:10px;border-radius: 48px;background-color: #2fa4e7;border:0px;color:#fff;"  xui:update-mode="merge"/>

</div>