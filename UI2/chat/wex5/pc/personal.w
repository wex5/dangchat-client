<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="../personal.w" 
  design="device:mobile;" 
  __id="id_1" 
  sysParam="false" 
  class="main13" >

  <div xid="top1" xui:update-mode="delete"/>
    <span component="$UI/system/components/justep/windowDialog/windowDialog" showTitle="true" xid="windowDialog" xui:before="panel" xui:parent="window" xui:update-mode="insert" />
   <img xid="avatar" onerror="this.src = '../../base/img/person.png'"  xui:update-mode="merge"/>

</div>