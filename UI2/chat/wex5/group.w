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

    <span component="$UI/system/components/justep/windowDialog/windowDialog" forceRefreshOnOpen="true" onReceived="windowDialogReceived" showTitle="true" xid="windowDialog" xui:before="panel" xui:parent="window" xui:update-mode="insert" />
    <resource xid="resource2_2" xui:parent="window" xui:update-mode="insert" >
<require url="css!$UI/work/common/css/pub" xid="require1_2" />
</resource>
   <div xid="titleBar1" class="x-titlebar"  xui:update-mode="merge"/>
   <a xid="addMemberBtn" onClick="addMemberBtnClick"  xui:update-mode="merge"/>
   <a xid="sendMessageBtn" style="position:absolute; top:80px; right:20px; border-radius:48px; background-color:#2fa4e7; border:0px;height:51px;width:51px;"  xui:update-mode="merge"/>
    <div bind-visible="!$object.val(&quot;fImg&quot;)" class="photoDiv" style="width:50px;height:50px;" xid="div20" xui:parent="div5" xui:update-mode="insert" >
<span bind-text="val(&quot;fName&quot;)?val(&quot;fName&quot;).slice(-2):&quot;&quot;" style="line-height:50px;" xid="span32" />
</div>
   <img xid="image1" bind-visible=" $object.val('fImg')" onerror="this.src='../base/img/person.png'"  xui:update-mode="merge"/>
   <div xid="div13" bind-click="addMemberBtnClick"  xui:update-mode="merge"/>
   <a xid="leaveGroupBtn" style="width:100%;"  xui:update-mode="merge"/>
<xu:modifications>
  <xu:remove select="//*[@xid='div111']/@bind-if"/>
</xu:modifications>

</div>