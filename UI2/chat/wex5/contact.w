<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="../base/contact.w" 
  design="device:mobile;" 
  __id="id_1" 
  sysParam="false" 
  class="main13" >

   <div xid="titleBar1" class="x-titlebar"  xui:update-mode="merge"/>
    <div class="photoDiv" style="width:70px;height:70px" xid="div15" xui:parent="div6" xui:update-mode="insert" >
<span bind-text="$model.name.get()" style="line-height:70px;font-size:1.3em;" xid="span32" />
</div>
   <img xid="avatar" onerror="this.src='../base/img/person.png'"  xui:update-mode="merge"/>
   <a xid="sendMessageBtn" style="position:absolute; top:80px; right:20px; border-radius:48px; background-color:2fa4e7; border:0px;height:51px;width:51px;"  xui:update-mode="merge"/>

</div>