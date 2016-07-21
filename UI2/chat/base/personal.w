<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="main13" component="$UI/system/components/justep/window/window"
  design="device:mobile;" xid="window" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:201px;left:327px;"
    onParamsReceive="modelParamsReceive" onModelConstruct="modelModelConstruct"/>  
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
        <span xid="title" class="x-titlebar-left">个人信息</span>  
      </div> 
    </div>  
    <div class="x-panel-content" xid="content2"> 
      <div class="panel panel-body x-card" style="margin:0;" component="$UI/system/components/bootstrap/panel/panel"
        xid="panel5"> 
        <div class="media-left" xid="divAvatar"> 
          <img xid="avatar" alt="" class="o-img"/> 
        </div>  
        <div class="media-body" xid="div7"> 
          <span xid="userName" class="user-name"/> 
        </div> 
      </div>  
      <div class="panel list-group o-noStytle" style="border:none;" component="$UI/system/components/bootstrap/panel/panel"
        xid="panel6"> 
        <div component="$UI/system/components/justep/panel/panel" xid="aboutMePanel"
          class="list-group-item item-container item-container-temp" bind-click="aboutMePanelClick"> 
          <div class="item-image"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button1" icon="icon-android-chat"> 
              <i xid="i1" class="icon-android-chat" style="font-size:20pt;"/>  
              <span xid="span2"/> 
            </a> 
          </div>  
          <div class="item-row"> 
            <span xid="aboutMe" class="item-value"/>  
            <span xid="span11"> 
              <a class="btn btn-link btn-only-icon" component="$UI/system/components/justep/button/button"
                icon="icon-edit" label="button" style="padding:0px;font-size:12pt;"
                xid="button2"> 
                <i class="icon-edit" xid="i2"/>  
                <span xid="span7"/> 
              </a> 
            </span>  
            <br/>  
            <span class="item-desc">关于我</span> 
          </div>  
          <div style="clear:both; height:0px;"/> 
        </div>   
        <div class="list-group-item item-container" bind-click="showMsgLikeClick" xid="att"> 
          <div class="item-image"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button1" icon="icon-android-star"> 
              <i xid="i1" class="icon-android-star" style="font-size:20pt;"/>  
              <span xid="span2"/> 
            </a> 
          </div>  
          <div class="setup-item"> 
            <a component="$UI/system/components/justep/button/button" xid="quitBtn">关注</a> 
          </div>  
          <div style="clear:both;"/> 
        </div> 
      </div>  
      <div class="panel list-group o-noStytle" style="border:none;margin-bottom:0px;"
        component="$UI/system/components/bootstrap/panel/panel" xid="panel7"> 
        <div class="list-group-item item-container" xid="div1"> 
          <div class="setup-title">设置</div>  
          <div style="clear:both;"/> 
        </div>  
        <div class="list-group-item item-container" xid="div2"> 
          <div class="item-image"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button1" icon="icon-forward"> 
              <i xid="i1" class="icon-forward" style="font-size:20pt;"/>  
              <span xid="span2"/> 
            </a> 
          </div>  
          <div class="setup-item" style="width:130px;">按回车键发送消息</div>  
          <span component="$UI/system/components/justep/button/toggle" class="x-toggle"
            xid="isSendByEnterEnabled" style="width:78px; margin:1px 0px 0px 186px;"
            ON=" " OFF=" " onChange="isSendByEnterEnabledChange"/>  
          <div style="clear:both;"/> 
        </div>  
        <div class="list-group-item item-container" bind-click="quitBtnClick" xid="div3"> 
          <div class="item-image"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button1" icon="icon-ios7-locked"> 
              <i xid="i1" class="icon-ios7-locked" style="font-size:20pt;"/>  
              <span xid="span2"/> 
            </a> 
          </div>  
          <div class="setup-item"> 
            <a component="$UI/system/components/justep/button/button" xid="quitBtn">安全退出</a> 
          </div>  
          <div style="clear:both;"/> 
        </div> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="msglikeDlg"
    title="关注" showTitle="false" forceRefreshOnOpen="true" routable="true" resizable="false"/> 
</div>
