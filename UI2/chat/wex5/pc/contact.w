<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" xmlns:xu="http://www.xmldb.org/xupdate" component="$UI/system/components/justep/window/window" xid="window" extends="../contact.w"
  __id="id_1" design="device:pc;" sysParam="false" class="main13">  
  <div xid="top1" xui:update-mode="delete"/>  
  <div xid="sendMessageBtn" xui:update-mode="delete"/>  
  <img xid="avatar" onerror="this.src='../../base/img/person.png'" xui:update-mode="merge"/>  
  <div class="list-group-item item-container" xid="div1_3" xui:parent="edit"
    xui:update-mode="insert"> 
    <a class="btn btn-default  btn-block" component="$UI/system/components/justep/button/button"
      label="发送消息" onClick="sendMessageClick" xid="button1_3"> 
      <i xid="i1_3"/>  
      <span xid="span1_3">发送消息</span> 
    </a> 
  </div> 
</div>
