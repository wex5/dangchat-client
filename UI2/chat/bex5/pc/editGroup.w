<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" xmlns:xu="http://www.xmldb.org/xupdate" component="$UI/system/components/justep/window/window" xid="window" extends="../editGroup.w"
  __id="id_1" design="device:pc;" sysParam="false">  
  <div xid="top1" xui:update-mode="delete"/>  
  <div class="x-panel-bottom" height="55" xid="bottom1" xui:parent="panel"
    xui:update-mode="insert"> 
    <div class="btn-group btn-group-justified x-card" component="$UI/system/components/justep/button/buttonGroup"
      style="height:55px;" tabbed="true" xid="buttonGroup1"> 
      <a class="btn btn-link btn-lg btn-only-label text-white btn-right-border"
        component="$UI/system/components/justep/button/button" label="取消" onClick="cancelBtnClick"
        xid="cancelBtn"> 
        <span xid="span2">取消</span> 
      </a>  
      <a class="btn btn-link btn-lg btn-only-label text-white" component="$UI/system/components/justep/button/button"
        label="确认" onClick="okBtnClick" xid="okBtn"> 
        <span xid="span2">确认</span> 
      </a> 
    </div> 
  </div> 
</div>
