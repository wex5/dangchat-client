<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="../group.w" 
  __id="id_1" 
  design="device:pc;" 
  sysParam="false" 
  class="main13" >

  <div xid="personalOrgDialog" xui:update-mode="delete"/>
  <div xid="top1" xui:update-mode="delete"/>
  <div xid="sendMessageBtn" xui:update-mode="delete"/>
  <div xid="div111" xui:update-mode="delete"/>
    <span activity="mainActivity" component="$UI/system/components/justep/org/orgDialogPC" multiSelection="true" onReceive="personalOrgDialogReceive" process="/SA/OPM/system/systemProcess" selectFilter="$row.val('sOrgKindID')==='psm'" showCommonGroup="false" showTitle="true" status="normal" style="left:31px;top:35px;" xid="personalOrgDialogPC" xui:before="panel" xui:parent="window" xui:update-mode="insert" />
    <span component="$UI/system/components/justep/windowDialog/windowDialog" showTitle="true" status="normal" xid="windowDialog" xui:before="panel" xui:parent="window" xui:update-mode="insert" />
   <div xid="div7" bind-click="editNameClick"  xui:update-mode="merge"/>
   <div xid="groupAboutPanel" bind-click="groupAboutClick"  xui:update-mode="merge"/>
    <div class="list-group-item item-container" xid="div1_8" xui:parent="panel1" xui:update-mode="insert" >
<a class="btn btn-default  btn-block" component="$UI/system/components/justep/button/button" label="发送消息" onClick="groupSendMessageBtnClick" xid="groupSendMessageBtn" >
<i xid="i1_8" />
<span xid="span1_8" >



发送消息</span>
</a>
</div>
   <img xid="image1" onerror="this.src='../../base/img/person.png'"  xui:update-mode="merge"/>
   <div xid="div13" bind-click="addMembersBtnClick"  xui:update-mode="merge"/>
   <div xid="div11"  xui:update-mode="merge-and-replace">

添加成员</div>
</div>