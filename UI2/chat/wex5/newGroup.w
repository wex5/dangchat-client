<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="../base/newGroup.w" 
  design="device:mobile;" 
  __id="id_1" 
  sysParam="false" 
  class="main13" >

    <span component="$UI/system/components/justep/windowDialog/windowDialog" forceRefreshOnOpen="false" onReceived="windowDialogReceived" showTitle="true" src="./contactList.w" xid="windowDialog" xui:before="panel" xui:parent="window" xui:update-mode="insert" />
    <resource xid="resource2_8" xui:parent="window" xui:update-mode="insert" >
<require url="css!$UI/work/common/css/pub" xid="require1_8" />
</resource>
   <div xid="titleBar1" class="x-titlebar"  xui:update-mode="merge"/>
   <input xid="groupName" style="box-shadow: none;border:0px;border-bottom:2px solid #8c9ca5;"  xui:update-mode="merge"/>
   <a xid="addBtn" onClick="addBtnClick"  xui:update-mode="merge"/>
    <div bind-visible="!val(&quot;fImg&quot;)" class="photoDiv" xid="div15" xui:parent="div3" xui:update-mode="insert" >
<span bind-text=" val(&quot;fName&quot;).slice(-2)" xid="span32" />
</div>
   <img xid="image2" bind-visible="val('fImg')" fImg="" onerror="this.src='../base/img/person.png'"  xui:update-mode="merge"/>

</div>