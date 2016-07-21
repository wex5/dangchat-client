<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:363px;left:89px;"
    onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="textData" idColumn="fID"> 
      <column label="fID" name="fID" type="String" xid="xid1"/>  
      <column label="fContent" name="fContent" type="String" xid="xid2"/>  
      <column label="fSenderName" name="fSenderName" type="String" xid="xid3"/>  
      <column label="fImg" name="fImg" type="String" xid="xid4"/>  
      <column label="fMessageTime" name="fMessageTime" type="String" xid="xid5"/>  
      <column label="fDestUserName" name="fDestUserName" type="String" xid="xid6"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar top-background"
        xid="titleBar1"> 
        <div class="return-div" xid="div2"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="button" xid="button1" icon="icon-arrow-left-c" onClick="{operation:'window.close'}"> 
            <i xid="i3" class="icon-arrow-left-c" style="font-size:larger;"/>  
            <span xid="span2"/> 
          </a> 
        </div>  
        <span xid="title" class="x-titlebar-left"><![CDATA[返回]]></span> 
      </div> 
    </div>  
    <div class="x-panel-content x-cards" xid="content1"> 
      <div class="x-query-input x-flex" xid="div1"> 
        <i class="icon-android-search x-icon-lg" xid="search" bind-click="searchClick"/>  
        <input type="text" class="x-flex1" xid="input" bind-keypress="inputKeypress"/> 
      </div>  
      <div class="panel panel-body  o-searchText" component="$UI/system/components/bootstrap/panel/panel"
        xid="searchText" style="margin:4px;"> 
        <div component="$UI/system/components/justep/list/list" class="x-list x-list-template"
          xid="list2" data="textData" autoLoad="true"> 
          <ul class="x-list-template list-group" xid="listTemplateUl1"> 
            <li xid="li2"> 
              <div class="media" xid="media1"> 
                <div class="media-left" xid="mediaLeft1"> 
                  <img src="" alt="" xid="image2" class="media-object o-icon"
                    bind-attr-src="val(&quot;fImg&quot;)"/> 
                </div>  
                <div class="media-body" xid="mediaBody2"> 
                  <div class="media-heading" xid="div4"> 
                    <label xid="label13" bind-text="val(&quot;fSenderName&quot;)"/>  
                    <label xid="label1" class="pull-right" bind-text="val(&quot;fMessageTime&quot;)"/> 
                  </div>  
                  <div xid="div5" bind-html=" val(&quot;fContent&quot;)" style="word-break: break-all;"/> 
                </div> 
              </div> 
            </li> 
          </ul> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
