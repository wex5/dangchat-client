<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:144px;left:23px;height:auto;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="data" idColumn="fID" onCustomRefresh="dataCustomRefresh"> 
      <column label="ID" name="fID" type="String" xid="xid1"/>  
      <column label="消息ID" name="fmsgid" type="String" xid="xid2"/>  
      <column label="消息内容" name="fmsgcontent" type="String" xid="xid3"/>  
      <column label="消息类型" name="fmsgtype" type="String" xid="xid4"/>  
      <column label="消息文件URL" name="fmsgfileurl" type="String" xid="xid5"/>  
      <column label="会话ID" name="fdialogid" type="Integer" xid="xid6"/>  
      <column label="会话类型" name="fdialogtype" type="String" xid="xid7"/>  
      <column label="会话名称" name="fdialogname" type="String" xid="xid8"/>  
      <column label="消息发送人" name="fsendername" type="String" xid="xid9"/>  
      <column label="消息发送人ID" name="fsenderid" type="String"/>  
      <column label="消息发送人PID" name="fsenderpid" type="String"/>  
      <column label="关注时间" name="fcreatetime" type="DateTime" xid="xid10"/>  
      <column label="消息发送人头像" name="fsendericon" type="String" xid="xid11"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
    direction="auto" xid="popMenu" opacity="0" dismissible="false"> 
    <div class="x-popMenu-overlay" xid="div4" bind-click="popMenuHide"/>  
    <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
      xid="menu1"> 
      <li class="x-menu-item" xid="item1"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="取消关注" xid="removeLikeBtn" onClick="removeLikeBtnClick"> 
          <i xid="i3"/>  
          <span xid="span4">取消关注</span> 
        </a> 
      </li> 
    </ul> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-cards x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar o-top"
        xid="titleBar1" title="关注"> 
        <div class="x-titlebar-left" xid="left1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            xid="button1" onClick="{&quot;operation&quot;:&quot;window.close&quot;}"> 
            <i xid="i1"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="title1">关注</div>  
        <div class="x-titlebar-right reverse" xid="right1"/> 
      </div> 
    </div>  
    <div class="x-panel-content  x-scroll-view" xid="content" _xid="C713565B79C00001A2AC215912D09680"
      style="bottom: 0px;" bind-touchend="contentTouchend"> 
      <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
        xid="scrollView1" style="overflow-x: hidden;"> 
        <div class="x-content-center x-pull-down container" xid="div1"> 
          <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i2"/>  
          <span class="x-pull-down-label" xid="span2">下拉刷新...</span> 
        </div>  
        <div class="x-scroll-content" xid="div2"> 
          <div component="$UI/system/components/justep/list/list" class="x-list x-list-template"
            xid="list1" data="data"> 
            <div xid="li1" class="panel x-card msg" bind-touchstart="touchstart"
              oncontextmenu="return false;" bind-touchend="touchend" bind-touchmove="li1Touchmove"
              bind-css="{&quot;x-touch&quot;: $model.row_touch.get()===$object}" bind-mousedown="rightClick"> 
              <div class="media"> 
                <div class="media-left"> 
                  <img class="media-object o-icon" bind-attr-src="val('fsendericon')"
                    xid="sendericon"/> 
                </div>  
                <div class="media-body"> 
                  <div class="media-heading"> 
                    <label bind-text="$model.getSenderName($object)"/>  
                    <label xid="label1" bind-text="val(&quot;fcreatetime&quot;)" class="pull-right"/> 
                  </div>  
                  <div bind-html="val(&quot;fmsgcontent&quot;)"/> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div>  
        <div class="x-content-center x-pull-up" xid="div3"> 
          <span class="x-pull-up-label" xid="span3">加载更多...</span> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
