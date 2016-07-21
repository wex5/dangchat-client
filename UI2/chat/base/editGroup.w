<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:mobile;"
  xid="window" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:262px;top:135px;"
    onParamsReceive="modelParamsReceive"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full x-cards"
    xid="panel"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar top-background"
        xid="titleBar1"> 
        <div xid="left1" class="center-block"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            style="margin-top:6px;" label="button" xid="button1" icon="icon-arrow-left-c"
            onClick="{operation:'window.close'}"> 
            <i xid="i1" class="icon-arrow-left-c" style="font-size:larger;"/>  
            <span xid="span2"/> 
          </a> 
        </div>  
        <span xid="title" class="x-titlebar-left"/>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="保存" xid="button2" style="height:100%;padding-top:10px;" onClick="okBtnClick"> 
          <i xid="i2"/>  
          <span xid="span1">保存</span> 
        </a> 
      </div> 
    </div>  
    <div class="x-panel-content content-panel" xid="content2"> 
      <div class="edit-container"> 
        <input component="$UI/system/components/justep/input/input" class="edit-input"
          xid="editItem" autofocus="true" style="width:100%;"/>  
        <textarea component="$UI/system/components/justep/textarea/textarea" xid="groupAbout"
          class="edit-biginput" placeHolder="群介绍" style="width:100%;"/> 
      </div> 
    </div> 
  </div> 
</div>
