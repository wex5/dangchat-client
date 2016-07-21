<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="../base/group.w" 
  design="device:mobile;" 
  __id="id_1" 
  sysParam="false" 
  class="main13" >

    <span activity="mainActivity" component="$UI/system/components/justep/org/orgDialog" includeOrgKind="psm" multiSelection="true" onReceive="personalOrgDialogReceive" process="/SA/OPM/system/systemProcess" xid="personalOrgDialog" xui:before="panel" xui:parent="window" xui:update-mode="insert" />
   <a xid="addMemberBtn" onClick="addMemberBtnClick"  xui:update-mode="merge"/>
   <img xid="image1" onerror="this.src='../base/img/person.png'"  xui:update-mode="merge"/>
   <div xid="div13" bind-click="addMemberBtnClick"  xui:update-mode="merge"/>

</div>