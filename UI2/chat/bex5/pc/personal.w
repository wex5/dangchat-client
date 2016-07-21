<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" xmlns:xu="http://www.xmldb.org/xupdate" component="$UI/system/components/justep/window/window" xid="window" extends="../personal.w"
  __id="id_1" design="device:pc;" sysParam="false" class="main13">  
  <div xid="top1" xui:update-mode="delete"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" showTitle="true"
    status="normal" xid="windowDialog" xui:before="panel" xui:parent="window" xui:update-mode="insert"/>  
  <img xid="avatar" onerror="this.src='../../base/img/person.png'" xui:update-mode="merge"/>  
  <div xid="aboutMePanel" bind-click="aboutMeClick" xui:update-mode="merge"/>  
  <span xid="msglikeDlg" status="normal" showTitle="true" src="$UI/chat/bex5/pc/msgLike.w"
    xui:update-mode="merge"/> 
</div>
