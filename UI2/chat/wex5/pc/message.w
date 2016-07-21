<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" xmlns:xu="http://www.xmldb.org/xupdate" component="$UI/system/components/justep/window/window" xid="window" extends="../message.w"
  __id="id_1" design="device:mobile;" sysParam="false" class="main13">  
  <div xid="closeBtn" xui:update-mode="delete"/>  
  <div xid="emojiRightBtn" xui:update-mode="delete"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" showTitle="true"
    status="normal" xid="windowDialog" xui:before="messageDialog" xui:parent="window"
    xui:update-mode="insert"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" showTitle="true"
    status="normal" xid="showClipboardImageDlg" xui:before="messageDialog" xui:parent="window"
    xui:update-mode="insert"/>  
  <a xid="showPersonBtn" onClick="showPerson" xui:update-mode="merge"/>  
  <a xid="groupInfoBtn" onClick="groupInfoBtn" xui:update-mode="merge"/>  
  <div xid="titleBar1" class="x-titlebar" xui:update-mode="merge"/>  
  <div xid="name" style="color:black;" xui:update-mode="merge"/>  
  <div xid="typing" style="padding-top: 3px;text-align:-webkit-right;color:black;"
    xui:update-mode="merge"/>  
  <div align="center" xid="div1_1" xui:before="listTemplateUl1" xui:parent="msgList"
    xui:update-mode="insert"> 
    <a class="btn btn-link" component="$UI/system/components/justep/button/button"
      label="加载更多" onClick="addMoreMsgClick" xid="button1_1" xui:before="msgList"
      xui:parent="scrollHeight" xui:update-mode="insert"> 
      <i xid="i1_1"/>  
      <span xid="span1_1">加载更多</span> 
    </a> 
  </div>  
  <img xid="image6" onerror="this.src = '../../base/img/person.png'" xui:update-mode="merge"/>  
  <img xid="image1" onerror="this.src='../../base/img/person.png'" xui:update-mode="merge"/>  
  <div xid="superinput" class="x-superinput x-superinput-pc" xui:update-mode="merge"/>  
  <div xid="superinputArea" class="x-superinput-area"
    xui:update-mode="merge"/>  
  <div class="x-superinput-right" xid="emojiRightBtn" xui:before="prScrn" xui:parent="superinputArea"
    xui:update-mode="insert"> 
    <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon x-btn-emoji"
      label="" icon="iconfont icon-biaoqing"> 
      <i class="iconfont icon-biaoqing"/>  
      <span/> 
    </a>  
    <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon x-btn-voice"
      label="" icon="iconfont icon-voice" style="margin-top:-6px"> 
      <i class="iconfont icon-voice"/>  
      <span/> 
    </a>  
    <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon x-btn-send hide"
      label="" icon="iconfont icon-right"> 
      <i class="iconfont icon-right"/>  
      <span/> 
    </a> 
  </div> 
</div>
