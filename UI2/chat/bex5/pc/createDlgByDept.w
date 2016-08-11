<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:210px;left:78px;" onModelConstructDone="modelModelConstructDone" onInactive="modelInactive"/>  
  <div class="x-panel x-full x-cards" component="$UI/system/components/justep/panel/panel"
    xid="panel"> 
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
        <div class="list-group-item item-container" xid="div11" xui:parent="panel1"
          xui:update-mode="insert"> 
          <a class="btn btn-default  btn-block" component="$UI/system/components/justep/button/button"
            label="发送消息" xid="sendMessageBtn" onClick="sendMessageBtnClick"> 
            <i xid="i11"/>  
            <span xid="span11">发送消息</span>
          </a> 
        </div> 
      </div> 
    </div> 
  </div>
</div>
