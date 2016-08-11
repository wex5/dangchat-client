<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="../base/personal.w" 
  design="device:mobile;" 
  __id="id_1" 
  sysParam="false" 
  class="main13" >

    <resource xid="resource2_9" xui:parent="window" xui:update-mode="insert" >
<require url="css!$UI/work/common/css/pub" xid="require1_9" />
</resource>
    <span component="$UI/system/components/justep/windowDialog/windowDialog" forceRefreshOnOpen="true" onReceive="clipDialogReceive" src="$UI/chat/wex5/picCut/mainActivity.w" xid="clipDialog" xui:parent="window" xui:update-mode="insert" />
   <div xid="titleBar1" class="x-titlebar"  xui:update-mode="merge"/>
    <div class="photoDiv" style="width:70px;height:70px;" xid="div5" xui:parent="divAvatar" xui:update-mode="insert" >
<span bind-text="$model.name.get();" style="line-height:70px;font-size:1.3em;" xid="span9" />
</div>
   <img xid="avatar" onerror="this.src='../base/img/person.png'"  xui:update-mode="merge"/>
   <div xid="att" style="display:none;"  xui:update-mode="merge"/>
   <div xid="panel7" style="border:none;margin-bottom:0px;background-color:white;"  xui:update-mode="merge"/>
    <div bind-click="changePawdBtnClick" class="list-group-item item-container" xid="changePawdBtn" xui:before="div3" xui:parent="panel7" xui:update-mode="insert" >
<div class="item-image" xid="div9" >
<a class="btn btn-link btn-only-icon" component="$UI/system/components/justep/button/button" icon="glyphicon glyphicon-edit" label="button" style="font-size:20px;" xid="button4" >
<i class="glyphicon glyphicon-edit" xid="i5" />
<span xid="span13" />
</a>
</div>
<div class="setup-item" xid="div10" >
<a component="$UI/system/components/justep/button/button" xid="changeBtn" >






















修改密码</a>
</div>
</div>
    <div style="clear:both;" xid="div2_5" xui:before="div3" xui:parent="panel7" xui:update-mode="insert" />
    <div bind-click="aboutBtnClick" class="list-group-item item-container" xid="div3_5" xui:before="div3" xui:parent="panel7" xui:update-mode="insert" >
<div class="item-image" xid="div2" >
<a class="btn btn-link btn-only-icon" component="$UI/system/components/justep/button/button" icon="icon-ios7-heart" label="button" xid="button3" >
<i class="icon-ios7-heart" style="font-size:20pt;" xid="i3" />
<span xid="span1" />
</a>
</div>
<div class="setup-item" xid="div3" >
<a component="$UI/system/components/justep/button/button" xid="aboutBtn" >
















关于我们</a>
</div>
</div>
    <div style="clear:both;" xid="div4_5" xui:before="div3" xui:parent="panel7" xui:update-mode="insert" />
   <span xid="msglikeDlg" src="$UI/chat/bex5/msgLike.w"  xui:update-mode="merge"/>

</div>