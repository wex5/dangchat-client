<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="../base/message.w" 
  design="device:mobile;" 
  __id="id_1" 
  sysParam="false" 
  class="main13" >

    <resource xid="resource2_6" xui:parent="window" xui:update-mode="insert" >
<require url="css!$UI/work/common/css/pub" xid="require1_6" />
</resource>
   <li xid="item13" style="display:none;"  xui:update-mode="merge"/>
   <li xid="item19" style="display:none;"  xui:update-mode="merge"/>
   <li xid="item14" style="display:none;"  xui:update-mode="merge"/>
   <li xid="item20" style="display:none;"  xui:update-mode="merge"/>
   <div xid="titleBar1" class="x-titlebar"  xui:update-mode="merge"/>
   <i xid="i23" class="icon-close"  xui:update-mode="merge"/>
    <div bind-visible="!$model.getImageUrl(val('fImg'))" class="photoDiv" xid="div15" xui:parent="col2" xui:update-mode="insert" >
<span bind-text="val(&quot;fSender&quot;)?val(&quot;fSender&quot;).slice(-2):&quot;sys&quot;" xid="span32" />
</div>
   <img xid="image6" bind-visible="$model.getImageUrl(val('fImg'))" onerror="this.src='../base/img/person.png'"  xui:update-mode="merge"/>
    <div bind-visible="!$model.getImageUrl(val('fImg'))" class="photoDiv" xid="div21" xui:parent="col4" xui:update-mode="insert" >
<span bind-text="val(&quot;fSender&quot;)?val(&quot;fSender&quot;).slice(-2):&quot;sys&quot;" xid="span33" />
</div>
   <img xid="image1" bind-visible="$model.getImageUrl(val('fImg'))" fImg="" onerror="this.src='../base/img/person.png'"  xui:update-mode="merge"/>

</div>