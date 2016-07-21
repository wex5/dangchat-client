<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:116px;left:105px;"
    onModelConstructDone="modelModelConstructDone"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="data" idColumn="fID"> 
      <column name="fID" type="String" xid="xid1"/>  
      <column name="fContent" type="String" xid="xid2"/>  
      <column name="fDate" type="String" xid="xid3"/>  
      <column name="fFileId" type="String" xid="xid4"/>  
      <column name="fFileName" type="String" xid="xid5"/>  
      <column name="fFileSize" type="String" xid="xid6"/>  
      <column name="fFileUrl" type="String" xid="xid7"/>  
      <column name="fReceiverUerId" type="String" xid="xid8"/>  
      <column name="fReceiverUserName" type="String" xid="xid9"/>  
      <column name="fSenderUserId" type="String" xid="xid10"/>  
      <column name="fSenderUserName" type="String" xid="xid11"/>  
      <column name="fType" type="String" xid="xid12"/>  
      <column name="fImg" type="String" xid="xid13"/>  
      <column name="fWidth" type="String" xid="xid14"/>  
      <column name="fHeight" type="String" xid="xid15"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/router/router" style="display:none;position:absolute;;left:103.0px;top:90.0px"
    xid="router" onRoute="routerRoute"/>
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
        <span xid="title" class="x-titlebar-left">返回</span> 
      </div> 
    </div>  
    <div class="x-panel-content  x-cards" xid="content1" style="padding:0px;"> 
      <div class="panel panel-body o-searchDoc" component="$UI/system/components/bootstrap/panel/panel"
        xid="searchDoc"> 
        <div component="$UI/system/components/justep/list/list" class="x-list x-list-template"
          xid="list" data="data"> 
          <ul class="x-list-template list-group" xid="listTemplateUl1"> 
            <li xid="li2"> 
              <div class="media" xid="media1"> 
                <div class="media-left" xid="mediaLeft1"> 
                  <img src="" alt="" xid="image2" class="media-object o-icon"
                    bind-attr-src="val(&quot;fImg&quot;)"/> 
                </div>  
                <div class="media-body" xid="mediaBody2"> 
                  <div class="media-heading" xid="div4"> 
                    <label xid="label13" bind-text="val(&quot;fSenderUserName&quot;)"/>  
                    <label xid="label1" class="pull-right" bind-text="val(&quot;fDate&quot;)"/> 
                  </div>  
                  <div xid="contentDiv" bind-html=" val(&quot;fContent&quot;)" style="white-space:pre-wrap;"/> 
                </div> 
              </div> 
            </li> 
          </ul> 
        </div> 
      </div> 
    </div> 
  </div>  
  <div xid="pswp" class="pswp" tabindex="-1" role="dialog" aria-hidden="true"> 
    <div class="pswp__bg"/>  
    <div class="pswp__scroll-wrap"> 
      <div class="pswp__container"> 
        <div class="pswp__item"/>  
        <div class="pswp__item"/>  
        <div class="pswp__item"/> 
      </div>  
      <div class="pswp__ui pswp__ui--hidden"> 
        <div class="pswp__top-bar"> 
          <div class="pswp__counter"/>  
          <button class="pswp__button pswp__button--close" title="关闭"/>  
          <button class="pswp__button pswp__button--zoom" title="放大/缩小"/>  
          <div class="pswp__preloader"> 
            <div class="pswp__preloader__icn"> 
              <div class="pswp__preloader__cut"> 
                <div class="pswp__preloader__donut"/> 
              </div> 
            </div> 
          </div> 
        </div>  
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> 
          <div class="pswp__share-tooltip"/> 
        </div>  
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"/>  
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"/>  
        <div class="pswp__caption"> 
          <div class="pswp__caption__center"/> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
