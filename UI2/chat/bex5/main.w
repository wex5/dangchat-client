<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  xid="window" 
  component="$UI/system/components/justep/window/window" 
  extends="../base/main.w" 
  design="device:m;" 
  __id="id_1" 
  sysParam="false" 
  class="window" >

    <a class="btn btn-link" component="$UI/system/components/justep/button/button" label="工作" style="    border-bottom-width: medium;" target="workContent" xid="workBtn" xui:parent="buttonGroup3" xui:update-mode="insert" >
<i xid="i11_3" />
<span xid="span11_3" >
工作</span>
</a>
    <div class="x-contents-content" xid="workContent" xui:parent="pages" xui:update-mode="insert" >
<div activity="mainActivity" autoLoad="false" class="x-window-container" component="$UI/system/components/justep/windowContainer/windowContainer" process="/OA/workHome/process/workHome/workHomeProcess" src="$UI/OA/workHome/process/workHome/mainActivity.m.w" xid="workContainer" />
</div>
   <img xid="image6" onerror="this.src='../base/img/person.png'"  xui:update-mode="merge"/>
   <div xid="contactsContainer" activity="mainActivity" process="/SA/OPM/system/systemProcess" src="contactList.w"  xui:update-mode="merge"/>

</div>