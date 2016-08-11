<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="$UI/chat/wex5/contactList.w" 
  __id="id_1" 
  design="device:m;" 
  class="window" >

  <div xid="deptName" xui:update-mode="delete"/>
    <div bind-if="val(&quot;fIsGroup&quot;)" class="x-row" component="$UI/system/components/justep/row/row" xid="row1_8" xui:before="div7" xui:parent="div5" xui:update-mode="insert" >
<div class="x-col x-col-fixed" style="width:auto;" xid="col1_8" >
<span bind-ref="ref(&quot;fCheckRow&quot;)" checkedValue="1" class="x-checkbox" component="$UI/system/components/justep/button/checkbox" onChange="deptNameCheckBoxChange" uncheckedValue="0" xid="deptNameCheckBox" />
</div>
<div class="x-col" xid="col2_8" >
<div __id="id_26" bind-click="deptNameClick" bind-if="val(&quot;fIsGroup&quot;)" xid="deptName" >
<div __id="id_27" xid="div6" >
<div __id="id_28" bind-ref="ref(&quot;fsName&quot;)" class="x-output x-title" component="$UI/system/components/justep/output/output" xid="output1" />
</div>
</div>
</div>
</div>

</div>