<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:21px;top:232px;"
    onModelConstruct="modelModelConstruct"> 
    <div autoLoad="true" component="$UI/system/components/justep/data/data"
      idColumn="fID" xid="dialogData" confirmRefresh="false"> 
      <column label="fID" name="fID" type="String" xid="xid1"/>  
      <column label="fNickName" name="fNickName" type="String" xid="xid2"/>  
      <column name="fCounter" type="Integer" xid="xid3"/>  
      <column name="fImg" type="String" xid="xid4"/>  
      <column name="fState" type="String" xid="xid7"/>  
      <column label="" name="fLatestChatDate" parent="dialogData" type="String"
        update-mode="insert" xid="xid1111111"/>  
      <column label="" name="fLatestChat" parent="dialogData" type="String" update-mode="insert"
        xid="xid2111111"/>  
      <column name="fState" type="String" xid="xid11"/>  
      <column name="fType" type="String" xid="xid5"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver"
    xid="menuPopOver" position="top" anchor="showMenuPopOverBtn" direction="right-top"> 
    <div class="x-popOver-overlay" xid="div8"/>  
    <div class="x-popOver-content" xid="div9"> 
      <div xid="div11" style="margin-top:10px;"> 
        <span xid="span20" style="font-weight:bolder;margin-right:10px;"><![CDATA[创建群组]]></span>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-lg btn-only-icon"
          label="button" xid="createGroupBtn" icon="icon-android-contacts" style="    width: 50px;border-radius: 48px;background-color: rgb(75,115,164);    border: 0px;"
          onClick="createGroupBtnClick"> 
          <i xid="i14" class="icon-android-contacts"/>  
          <span xid="span17"/> 
        </a> 
      </div> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
    xid="contactsMenu" direction="auto" dismissible="false" opacity="0"> 
    <div class="x-popMenu-overlay" xid="div6" bind-click="contactsMenuHideClick"/>  
    <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
      xid="menu1"> 
      <li class="x-menu-item" xid="item1"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-lg"
          label="查看好友信息" xid="contactInfoBtn" onClick="contactInfoBtnClick"> 
          <i xid="i1"/>  
          <span xid="span1">查看好友信息</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item3"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-lg"
          label="删除对话" xid="deleteChatBtn" onClick="deleteChatBtnClick"> 
          <i xid="i4"/>  
          <span xid="span4">删除对话</span> 
        </a> 
      </li> 
    </ul> 
  </div>  
  <div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
    xid="groupMenu" dismissible="false" direction="auto" opacity="0"> 
    <div class="x-popMenu-overlay" xid="div4" bind-click="groupMenuHideClick"/>  
    <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
      xid="menu2"> 
      <li class="x-menu-item" xid="item6"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-lg"
          label="查看群组信息" xid="groupInfoBtn" onClick="groupInfoBtnClick"> 
          <i xid="i10"/>  
          <span xid="span13">查看群组信息</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item4"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link  btn-lg"
          label="删除会话" xid="deleteGroupChatBtn" onClick="deleteGroupChatBtnClick"> 
          <i xid="i2"/>  
          <span xid="span2">删除会话</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item5"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-lg"
          label="删除并退出" xid="leaveGroupBtn" onClick="leaveGroupBtnClick"> 
          <i xid="i8"/>  
          <span xid="span7">删除并退出</span> 
        </a> 
      </li> 
    </ul> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel2"> 
    <div class="x-panel-top" xid="top2"> 
      <div class="x-titlebar o-top" component="$UI/system/components/justep/titleBar/titleBar"
        xid="titleBar1"> 
        <div class="x-titlebar-left" xid="left1"> 
          <div component="$UI/system/components/justep/button/buttonGroup"
            class="btn-group btn-group-justified" tabbed="true" xid="buttonGroup3"> 
            <a class="btn btn-link btn-only-label center-block " component="$UI/system/components/justep/button/button"
              label="消息" xid="messageBtn" target="messageContent" style="    border-bottom-width: medium;"> 
              <i xid="i5"/>  
              <span xid="span5">消息</span> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="通讯录" xid="contactsBtn" target="contactsContent" style="    border-bottom-width: medium;"> 
              <i xid="i6"/>  
              <span xid="span6">通讯录</span> 
            </a> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/bar/bar" xid="bar4" style="padding-top:3px;"> 
          <a class="btn btn-link btn-only-icon x-personal" component="$UI/system/components/justep/button/button" icon="icon-android-more" xid="personalBtn" onClick="personalBtnClick">
   <i class="icon-android-more" xid="i41"></i>
   <span xid="span41"></span></a></div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content2"> 
      <div bind-visible="offline" style="display: none;" class="x-offline alert alert-danger"> 
        <strong> 
          <i class="glyphicon glyphicon-alert"/> 
        </strong>网络连接不可用
      </div>  
      <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
        active="0" xid="pages" wrap="false" onActiveChanged="pagesActiveChanged"> 
        <div class="x-contents-content  x-scroll-view" xid="messageContent"> 
          <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
            xid="scrollView1" onPullUp="scrollViewPullUp" autoAppend="false"> 
            <div class="x-scroll-content" xid="div10"> 
              <div class="x-list" component="$UI/system/components/justep/list/list"
                xid="list1" data="dialogData"> 
                <ul class="x-list-template list-group" xid="listTemplateUl1"> 
                  <li class="list-group-item" xid="li1" bind-touchstart="touchStart"
                    bind-click="msgLIClick" bind-touchend="touchEnd" bind-touchcancel="touchCancel"
                    oncontextmenu="return false;" bind-touchmove="touchMove"> 
                    <div class="media-left" xid="div2"> 
                      <span class="counter" xid="span11" bind-visible=" $object.val(&quot;fCounter&quot;)&gt;0"
                        bind-html="ref('fCounter')"/>  
                      <img alt="" class="o-icon" xid="image6" bind-attr-src=" $model.getImageUrl(val(&quot;fImg&quot;))"/> 
                    </div>  
                    <div class="media-body" xid="div1"> 
                      <h5 class="dialogName" xid="h51" bind-text="ref('fNickName')"/>  
                      <span class="latestChatDate" xid="span9" bind-text="ref('fLatestChatDate')"/>  
                      <div style="clear:both;" xid="div3"/>  
                      <span class="latestChat" xid="span10" bind-html="ref('fLatestChat')"/> 
                    </div> 
                  </li> 
                </ul> 
              </div> 
            </div>  
            <div class="x-content-center x-pull-up" xid="div12"> 
              <span class="x-pull-up-label" xid="span12">加载更多...</span> 
            </div> 
          </div> 
        </div>  
        <div class="x-contents-content" xid="contactsContent"> 
          <div autoLoad="false" class="x-window-container" component="$UI/system/components/justep/windowContainer/windowContainer"
            xid="contactsContainer"/> 
        </div> 
      </div>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-lg btn-only-icon"
        xid="showMenuPopOverBtn" style="position: absolute;bottom:20px;right:10px;border-radius: 48px;background-color: rgb(75,115,164);border:0px;"
        icon="icon-android-add" onClick="showMenuPopOverBtnClick"> 
        <i xid="i3" class="icon-android-add"/>  
        <span xid="span3"/> 
      </a> 
    </div> 
  </div> 
</div>
