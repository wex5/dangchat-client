<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" xmlns:xu="http://www.xmldb.org/xupdate" component="$UI/system/components/justep/window/window" xid="window" extends="../newGroup.w"
  __id="id_1" design="device:pc;" sysParam="false" class="main13">  
  <div xid="personalOrgDialog" xui:update-mode="delete"/>  
  <div xid="top1" xui:update-mode="delete"/>  
  <span activity="mainActivity" component="$UI/system/components/justep/org/orgDialogPC"
    multiSelection="true" onReceive="orgDialogPCReceive" process="/SA/OPM/system/systemProcess"
    selectFilter="$row.val('sOrgKindID')==='psm'" showTitle="true" xid="orgDialogPC"
    xui:before="panel" xui:parent="window" xui:update-mode="insert"/>  
  <img xid="image2" onerror="this.src='../../base/img/person.png'" xui:update-mode="merge"/>  
  <xu:modifications> 
    <xu:remove select="//*[@xid='div6']/@style"/> 
  </xu:modifications> 
</div>
