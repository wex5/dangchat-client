<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="main13" component="$UI/system/components/justep/window/window"
  design="device:mobile;" xid="window" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:201px;left:327px;"
    onParamsReceive="modelParamsReceive" onunLoad="modelUnLoad" onInactive="modelInactive"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full x-cards"
    xid="panel"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar top-background"
        xid="titleBar1"> 
        <div class="x-titlebar-left flex3" xid="left1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="button" xid="button1" icon="icon-arrow-left-c" onClick="{operation:'window.close'}"> 
            <i xid="i1" class="icon-arrow-left-c" style="font-size:larger;"/>  
            <span xid="span2"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="title1"/>  
        <div xid="right1" style="padding:3px 5px 0px 0px;"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon x-personal"
            label="button" xid="personalBtn" icon="icon-android-more" onClick="personalBtnClick"> 
            <i xid="i2" class="icon-android-more"/>  
            <span xid="span2"/> 
          </a> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content2"> 
      <div class="panel panel-body x-card" style="margin:0;" component="$UI/system/components/bootstrap/panel/panel"
        xid="panel5"> 
        <div class="media-left" xid="div6"> 
          <img xid="avatar" alt="" class="o-img" /> 
        </div>  
        <div class="media-body" xid="div7"> 
          <div> 
            <span xid="accountName" class="account-name"/> 
          </div>  
          <span xid="userStatus" class="user-status"/> 
        </div> 
      </div>  
      <div class="panel list-group o-noStytle" style="margin:0;" component="$UI/system/components/bootstrap/panel/panel"> 
        <div component="$UI/system/components/justep/panel/panel" xid="aboutMePanel"
          class="list-group-item item-container item-container-temp"> 
          <div class="item-image"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button1" icon="icon-android-chat"> 
              <i xid="i1" class="icon-android-chat" style="font-size:20pt;"/>  
              <span xid="span2"/> 
            </a> 
          </div>  
          <div class="item-row"> 
            <span xid="aboutMe" class="item-value"/>  
            <br/>  
            <span class="item-desc">关于我</span> 
          </div>  
          <div style="clear:both; height:0px;"/> 
        </div> 
      </div>  
      <div class="panel list-group o-noStytle" style="margin-top:16px;" component="$UI/system/components/bootstrap/panel/panel"
        xid="edit"> 
        <div class="list-group-item item-container"> 
          <div class="setup-title">设置</div>  
          <div style="clear:both;"/> 
        </div>  
        <div class="list-group-item item-container"> 
          <div class="item-image"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button1" icon="icon-forward"> 
              <i xid="i1" class="icon-forward" style="font-size:20pt;"/>  
              <span xid="span2"/> 
            </a> 
          </div>  
          <div class="setup-item" style="width:130px;">推送通知</div>  
          <span component="$UI/system/components/justep/button/toggle" class="x-toggle"
            xid="isNotificationsEnabled" style="width:78px; margin:1px 0px 0px 136px;"
            ON=" " OFF=" " onChange="isNotificationsEnabledChange"/> 
        </div> 
      </div>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-lg"
        style="position:absolute; top:80px; right:20px; border-radius:48px; background-color:rgb(75,115,164); border:0px;height:51px;width:51px;"
        xid="sendMessageBtn" icon="icon-chatbox-working" onClick="sendMessageClick"> 
        <i xid="i6" class="icon-chatbox-working" style="font-size:18pt;"/>  
        <span xid="span3"/> 
      </a> 
    </div> 
  </div> 
</div>
