<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:210px;left:78px;"
    onModelConstructDone="modelModelConstructDone" onInactive="modelInactive"/>  
  <div class="x-panel x-full x-cards" component="$UI/system/components/justep/panel/panel"
    xid="panel"> 
    <div class="x-panel-top" xid="top1">
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar top-background"
        xid="titleBar1"> 
        <div class="return-div" xid="div4"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="button" xid="button1" icon="icon-arrow-left-c" onClick="{operation:'window.close'}"> 
            <i xid="i1" class="icon-arrow-left-c" style="font-size:larger;"/>  
            <span xid="span2"/>
          </a> 
        </div>  
        <span xid="title" class="x-titlebar-left">部门</span>  
        <div xid="right1" style="padding:3px 5px 0px 0px;"> 
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
      <div class="panel panel-body x-card" component="$UI/system/components/bootstrap/panel/panel"
        style="margin:0;" xid="panel5"> 
        <div class="media-left" xid="div6"> 
          <img alt="" class="o-img" xid="avatar" src="$UI/chat/base/img/org.png"/> 
        </div>  
        <div class="media-body" xid="div7" xui:update-mode="merge"> 
          <span class="group-name" xid="deptName" bind-text="deptName"/>  
          <div xid="div14"/> 
        </div> 
      </div>  
      <div class="panel list-group o-noStytle" component="$UI/system/components/bootstrap/panel/panel"
        style="border:none;" xid="panel1"> 
        <div class="list-group-item item-container" xid="div1"> 
          <div class="setup-title" xid="div2">选项</div>  
          <div style="clear:both;" xid="div3"/> 
        </div> 
      </div>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-lg"
        style="position:absolute; top:80px; right:20px; border-radius:48px; background-color:rgb(75,115,164); border:0px;height:51px;width:51px;"
        xid="sendMessageBtn" icon="icon-chatbox-working" onClick="sendMessageBtnClick"> 
        <i xid="i6" class="icon-chatbox-working" style="font-size:18pt;"/>  
        <span xid="span6"/>
      </a>
    </div> 
  </div> 
</div>
